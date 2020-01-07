import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import Router from 'next/router'
import {
  Dialog,
  IconButton,
  Button,
  SideSheet,
  Pane,
  Heading,
  Paragraph,
  Label,
  TextInput,
  Textarea,
  SelectMenu,
  toaster,
} from 'evergreen-ui'
import Dropzone from 'react-dropzone'
import { useStore, useActions } from '../lib/store'
import { theme } from '../lib/theme'
import Layout from '../components/layout'
import { isBrowser } from '../utils/helper'
import { Upload } from '../utils/upload'
import Card from '../components/Home/Card'
import { BoxCards } from '../components/UI'

export default function Claims() {
  const isLoadingForm = useStore((state) => state.claim.isLoadingForm)
  const isLoadingDelete = useStore((state) => state.claim.isLoadingDelete)
  const isShow = useStore((state) => state.claim.isShow)
  const setShow = useActions((state) => state.claim.setShow)
  const getClaim = useActions((actions) => actions.claim.getClaim)
  const createClaim = useActions((actions) => actions.claim.createClaim)
  const claims = useStore((state) => state.claim.claims)
  const listClaims = useActions((actions) => actions.claim.listClaims)
  const claim = useStore((state) => state.claim.claim)
  const updateClaim = useActions((actions) => actions.claim.updateClaim)
  const deleteClaim = useActions((actions) => actions.claim.deleteClaim)
  const clearClaim = useActions((state) => state.claim.clearClaim)
  const contexts = useStore((state) => state.context.contexts)
  const listContext = useActions((actions) => actions.context.list)

  const [contextNames, setContextNames] = useState('')

  const [showDelete, setShowDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})

  useEffect(() => {
    listClaims()
    listContext()
  }, [])

  useEffect(() => {
    if (!isShow) {
      listClaims()
    }
  }, [isShow])

  useEffect(() => {
    if (!isLoadingDelete && showDelete) {
      setShowDelete(false)
      listClaims()
    }
  }, [isLoadingDelete])

  useEffect(() => {
    if (claim.contexts) {
      setContextNames(`${claim.contexts.length} selected`)
    }
  }, [claim])

  return (
    <Layout>
      <Container>
        <Dialog
          isShown={showDelete}
          title="Delete Claim"
          onCloseComplete={() => setShowDelete(false)}
          isConfirmLoading={isLoadingDelete}
          onConfirm={() => {
            deleteClaim(deleteItem.id)
          }}
          cancelLabel="CANCEL"
          intent="danger"
          confirmLabel={isLoadingDelete ? 'DELETING' : 'DELETE'}
        >
          Do you really want to delete the Claim <b>{deleteItem.name}</b> ?
        </Dialog>
        <BoxTable>
          <Button
            height={40}
            marginBottom={30}
            marginTop={15}
            appearance="primary"
            intent="success"
            iconBefore="add"
            onClick={() => {
              clearClaim()
              setShow(true)
            }}
          >
            New claim
          </Button>

          {claims && claims.length > 0 ? (
            <BoxCards>
              {claims.map((item, idx) => (
                <Pane key={idx} display="flex" flexDirection="column">
                  <Pane
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    backgroundColor="#fff"
                    padding="10px"
                  >
                    <IconButton
                      icon="edit"
                      marginRight={10}
                      onClick={() => getClaim({ id: item.id, show: true })}
                    />
                    <IconButton
                      icon="trash"
                      intent="danger"
                      onClick={() => {
                        setDeleteItem(item)
                        setShowDelete(true)
                      }}
                    />
                  </Pane>
                  <Card
                    id={item.id}
                    title={item.title}
                    desc={item.desc}
                    img={item.img}
                    creator={item.creator}
                    date={item.start}
                  />
                </Pane>
              ))}
            </BoxCards>
          ) : (
            <EmptyState>
              <p>You have no claims.</p>
            </EmptyState>
          )}
        </BoxTable>
        <SideSheet
          isShown={isShow}
          onCloseComplete={() => setShow(false)}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
          }}
          width={isBrowser && window.innerWidth > 1000 ? 900 : '100%'}
        >
          <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane padding={16}>
              <Heading size={600} textAlign={'center'}>
                Create new claim
              </Heading>
              <Paragraph size={400} textAlign={'center'} marginTop={5}>
                Fill in the fields to create your claim.
              </Paragraph>
            </Pane>
          </Pane>
          <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
            {isBrowser && window.innerWidth <= 1000 && (
              <Button height={44} marginBottom={10} onClick={() => setShow(false)}>
                Close
              </Button>
            )}
            <Formik
              enableReinitialize
              initialValues={claim}
              validate={(values) => {
                let errors = {}
                if (!values.title) {
                  errors.title = 'Required'
                }

                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                let model = { ...values }
                model.contexts = []
                if (values.contexts) {
                  for (const item of values.contexts) {
                    const context = contexts.find((obj) => obj._key === item)
                    model.contexts.push(context)
                  }
                }
                if (claim._key) {
                  updateClaim({ id: claim.id, model })
                } else {
                  createClaim(model)
                }
                setSubmitting(false)
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Dropzone
                    onDrop={async (acceptedFiles) => {
                      if (acceptedFiles.length > 1) {
                        toaster.warning('Limit 1 image')
                        return
                      }

                      for (const file of acceptedFiles) {
                        const fileName = await Upload('claims', file)
                        setFieldValue('img', fileName)
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <SectionGallery>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {!values.img ? (
                            <p>Select Image</p>
                          ) : (
                            <img
                              src={`${process.env.ASSETS_BUCKET}/claims/${values.img}`}
                              width="auto"
                              height="100px"
                            />
                          )}
                        </div>
                      </SectionGallery>
                    )}
                  </Dropzone>
                  <BoxInput>
                    <Label htmlFor={45} size={500} display="block" marginBottom={3} marginTop={15}>
                      Title
                    </Label>
                    <TextInput
                      width="100%"
                      height={45}
                      name="title"
                      placeholder="Title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      type="text"
                      autoComplete={'off'}
                    />
                    <MessageError>{errors.title && touched.title && errors.title}</MessageError>
                    <Label htmlFor={45} size={500} display="block" marginBottom={3} marginTop={15}>
                      Description
                    </Label>
                    <Textarea
                      rows="6"
                      width="100%"
                      name="desc"
                      placeholder="Description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.desc}
                      type="number"
                      autoComplete={'off'}
                    />
                    <Label htmlFor={45} size={500} display="block" marginBottom={3} marginTop={15}>
                      Contexts
                    </Label>
                    <SelectMenu
                      width={240}
                      isMultiSelect
                      title="Select contexts"
                      filterPlaceholder="Searching..."
                      options={contexts.map((item) => ({
                        label: item.name,
                        value: item._key,
                      }))}
                      selected={values.contexts}
                      onSelect={(item) => {
                        if (!values.contexts) {
                          values.contexts = []
                        }
                        values.contexts = [...values.contexts, item.value]
                        if (values.contexts.length > 0) {
                          setContextNames(`${values.contexts.length} selected`)
                        } else {
                          setContextNames('Select contexts')
                        }
                      }}
                      onDeselect={(item) => {
                        values.contexts = values.contexts.filter(
                          (val) => val._key !== item.value._key,
                        )
                        if (values.contexts.length > 0) {
                          setContextNames(`${values.contexts.length} selected`)
                        } else {
                          setContextNames('Select contexts')
                        }
                      }}
                    >
                      <Button type="button" iconAfter="caret-down" height={45} width={'auto'}>
                        {contextNames || `Select contexts...`}
                      </Button>
                    </SelectMenu>
                    <NewContext onClick={() => Router.push('/contexts')}>
                      Create new context?
                    </NewContext>
                    <ButtonCenter
                      height={44}
                      marginTop={20}
                      width="100%"
                      appearance="primary"
                      type="submit"
                      disabled={isSubmitting}
                      loading={isLoadingForm}
                    >
                      {isLoadingForm ? 'SAVING' : 'SAVE'}
                    </ButtonCenter>
                  </BoxInput>
                </form>
              )}
            </Formik>
          </Pane>
        </SideSheet>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  padding: 2em 1em;
`

const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  color: ${(props) => props.theme.color.red};
  font-size: 1em;
`

const BoxTable = styled.div`
  @media (max-width: 1200px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1.5em;
  }
`

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  > p {
    font-size: 1.8em;
    color: #333;
  }
`

const BoxInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
`

const ButtonCenter = styled(Button)`
  display: block;
  margin: 25px auto;
  background: ${theme.color.primary};
  :hover {
    background: ${theme.color.primary} !important;
    opacity: 0.7;
  }
`

const SectionGallery = styled.div`
  height: 140px;
  border: 2px solid #eee;
  border-style: dashed;
  text-align: center;
  cursor: pointer;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: 100%;
  }

  p {
    margin: 0;
    outline: 0;
    font-size: 1.2em;
    height: 130px;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  img {
    margin: 20px 10px;
  }
`

const NewContext = styled.a`
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;
`
