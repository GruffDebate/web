import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import {
  Dialog,
  Table,
  IconButton,
  Button,
  SideSheet,
  Pane,
  Heading,
  Paragraph,
  Label,
  TextInput,
  Textarea,
} from 'evergreen-ui'
import { format } from 'date-fns'
import { useStore, useActions } from '../lib/store'
import { theme } from '../lib/theme'
import Layout from '../components/layout'
import { isBrowser, isCurator } from '../utils/helper'
import Router from 'next/router'

export default function Contexts() {
  const isLoadingForm = useStore((state) => state.context.isLoadingForm)
  const isLoadingDelete = useStore((state) => state.context.isLoadingDelete)
  const isShow = useStore((state) => state.context.isShow)
  const setShow = useActions((state) => state.context.setShow)
  const get = useActions((actions) => actions.context.get)
  const create = useActions((actions) => actions.context.create)
  const contexts = useStore((state) => state.context.contexts)
  const list = useActions((actions) => actions.context.list)
  const context = useStore((state) => state.context.context)
  const update = useActions((actions) => actions.context.update)
  const deleteContext = useActions((actions) => actions.context.delete)
  const clear = useActions((state) => state.context.clear)

  const [showDelete, setShowDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})

  useEffect(() => {
    if (isCurator()) {
      list()
    } else {
      Router.push('/')
    }
  }, [])

  useEffect(() => {
    if (!isShow) {
      list()
    }
  }, [isShow])

  useEffect(() => {
    if (!isLoadingDelete && showDelete) {
      setShowDelete(false)
      list()
    }
  }, [isLoadingDelete])

  return (
    <Layout>
      <Container>
        <Dialog
          isShown={showDelete}
          title="Delete Context"
          onCloseComplete={() => setShowDelete(false)}
          isConfirmLoading={isLoadingDelete}
          onConfirm={() => {
            deleteContext(deleteItem._key)
          }}
          cancelLabel="CANCEL"
          intent="danger"
          confirmLabel={isLoadingDelete ? 'DELETING' : 'DELETE'}
        >
          Do you really want to delete the Context <b>{deleteItem.name}</b> ?
        </Dialog>
        <BoxTable>
          <Button
            height={40}
            marginLeft={15}
            marginBottom={15}
            marginTop={15}
            appearance="primary"
            intent="success"
            iconBefore="add"
            onClick={() => {
              clear()
              setShow(true)
            }}
          >
            New Context
          </Button>
          <NewTable>
            <Table.Head>
              <Table.TextHeaderCell>CreatedAt</Table.TextHeaderCell>
              <Table.TextHeaderCell>ID</Table.TextHeaderCell>
              <Table.TextHeaderCell>Title</Table.TextHeaderCell>
              <Table.TextHeaderCell>Short Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Description</Table.TextHeaderCell>
              <Table.TextHeaderCell>URL</Table.TextHeaderCell>
              <Table.TextHeaderCell>Google KG</Table.TextHeaderCell>
              <Table.TextHeaderCell>Wikidata</Table.TextHeaderCell>
              <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
            </Table.Head>
            <Table.VirtualBody height={450}>
              {contexts && contexts.length > 0 ? (
                contexts.map((item, idx) => (
                  <Table.Row key={idx}>
                    <Table.TextCell>{format(new Date(item.start), 'YYYY-MM-DD')}</Table.TextCell>
                    <Table.TextCell>{item._key}</Table.TextCell>
                    <Table.TextCell>{item.name}</Table.TextCell>
                    <Table.TextCell>{item.title}</Table.TextCell>
                    <Table.TextCell>{item.desc}</Table.TextCell>
                    <Table.TextCell>{item.url}</Table.TextCell>
                    <Table.TextCell>{item.gid}</Table.TextCell>
                    <Table.TextCell>{item.qid}</Table.TextCell>
                    <Table.Cell>
                      <Pane display="flex" flexDirection="row">
                        <IconButton
                          icon="edit"
                          marginRight={10}
                          onClick={() => get({ id: item._key, show: true })}
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
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <EmptyState>
                  <p>You have no contexts.</p>
                </EmptyState>
              )}
            </Table.VirtualBody>
          </NewTable>
        </BoxTable>
        <SideSheet
          isShown={isShow}
          onCloseComplete={() => setShow(false)}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
          }}
          width={isBrowser && window.innerWidth > 1000 ? 650 : '100%'}
        >
          <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane padding={16}>
              <Heading size={600} textAlign={'center'}>
                Create new context
              </Heading>
              <Paragraph size={400} textAlign={'center'} marginTop={5}>
                Fill in the fields to create your context.
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
              initialValues={context}
              validate={(values) => {
                let errors = {}
                if (!values.name) {
                  errors.name = 'Required'
                }
                if (!values.title) {
                  errors.title = 'Required'
                }
                if (!values.desc) {
                  errors.desc = 'Required'
                }
                if (!values.url) {
                  errors.url = 'Required'
                }

                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                if (context._key) {
                  update({ id: context.id, model: values })
                } else {
                  create(values)
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
              }) => (
                <form onSubmit={handleSubmit}>
                  <BoxInput>
                    <Label htmlFor={45} size={500} display="block" marginBottom={3} marginTop={15}>
                      Short Name
                    </Label>
                    <TextInput
                      width="100%"
                      height={45}
                      name="name"
                      placeholder="Short Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      type="text"
                      autoFocus
                      autoComplete={'off'}
                    />
                    <MessageError>{errors.name && touched.name && errors.name}</MessageError>
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
                    <MessageError>{errors.desc && touched.desc && errors.desc}</MessageError>
                    <Label htmlFor={45} size={500} display="block" marginBottom={3} marginTop={15}>
                      URL
                    </Label>
                    <TextInput
                      width="100%"
                      height={45}
                      name="url"
                      placeholder="URL"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.url}
                      type="text"
                      autoComplete={'off'}
                    />
                    <MessageError>{errors.url && touched.url && errors.url}</MessageError>
                    <Label htmlFor={45} size={500} display="block" marginBottom={3} marginTop={15}>
                      Google KG
                    </Label>
                    <TextInput
                      width="100%"
                      height={45}
                      name="mid"
                      placeholder="Google KG"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mid}
                      type="text"
                      autoComplete={'off'}
                    />
                    <Label htmlFor={45} size={500} display="block" marginBottom={3} marginTop={15}>
                      Wikidata
                    </Label>
                    <TextInput
                      width="100%"
                      height={45}
                      name="qid"
                      placeholder="Wikidata"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.qid}
                      type="text"
                      autoComplete={'off'}
                    />

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
  margin-right: 1.5em;
  background: #fff;
  border-radius: 0.6em;
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
  height: 580px;
  @media (max-width: 1200px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1.5em;
  }
`

const NewTable = styled(Table)`
  width: 100%;
  @media (max-width: 600px) {
    width: 450px;
  }
`

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  > p {
    font-size: 1.2em;
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
