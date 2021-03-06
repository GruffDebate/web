import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import { useStore, useActions } from '../../lib/store'
import Router from 'next/router'
import {
  Pane,
  TextInput,
  Label,
  Textarea,
  SideSheet,
  SelectMenu,
  Heading,
  Button,
  Paragraph,
} from 'evergreen-ui'
import Dropzone from 'react-dropzone'
import { isBrowser } from '../../utils/helper'
import { theme } from '../../lib/theme'
import ContextSelect from '../Context/ContextSelect'

const SideSheetClaim = (props) => {
  const isShow = useStore((state) => state.claim.isShow)
  const setShow = useActions((action) => action.claim.setShow)
  const isLoadingForm = useStore((state) => state.claim.isLoadingForm)

  const createClaim = useActions((action) => action.claim.createClaim)
  const updateClaim = useActions((actions) => actions.claim.updateClaim)
  const claim = useStore((store) => store.claim.claim)

  const [contextNames, setContextNames] = useState('')

  const [selectData, setSelectData] = useState([])

  return (
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
            model.contexts = selectData
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
                <ContextSelect
                  selectData={selectData}
                  setSelectData={setSelectData}
                  initialData={claim.contexts}
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
  )
}

export default SideSheetClaim

const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  color: ${(props) => props.theme.color.red};
  font-size: 1em;
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
