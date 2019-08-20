import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { useStore, useActions } from "../../configureStore";
import { Pane, TextInput, Label, Textarea, SideSheet, Heading, Button, Paragraph, } from 'evergreen-ui';
import { isBrowser } from '../../utils/helper'
import { theme } from "../../theme";

const SideSheetClaim = (props) => {
  const isShow = useStore(state => state.argument.isShow);
  const setShow = useActions(action => action.argument.setShow);
  const isLoadingForm = useStore(state => state.argument.isLoadingForm);

  const createArgument = useActions(action => action.argument.createArgument);
  const claim = useStore(store => store.claim.claim);

  return (
    <SideSheet
      isShown={isShow}
      onCloseComplete={() => setShow(false)}
      containerProps={{
        display: "flex",
        flex: "1",
        flexDirection: "column"
      }}
      width={isBrowser && window.innerWidth > 1000 ? 900 : "100%"}
    >
    <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
      <Pane padding={16}>
        <Heading size={600} textAlign={"center"}>
          Create new argument
        </Heading>
        <Paragraph size={400} textAlign={"center"} marginTop={5}>
          Fill in the fields to create your argument.
        </Paragraph>
      </Pane>
    </Pane>
    <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
      {isBrowser && window.innerWidth <= 1000 && (
        <Button
          height={44}
          marginBottom={10}
          onClick={() => setShow(false)}
        >
          Close
        </Button>
      )}
      <Formik
        enableReinitialize
        initialValues={{ title: '', desc: '' }}
        validate={values => {
          let errors = {};
          if (!values.title) {
            errors.title = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const model = {
             ...values,
             targetClaimId: claim.id,
             pro: props.type === 'pro' ? true : false,
          }
          createArgument(model);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <BoxInput>
              <Label
                htmlFor={45}
                size={500}
                display="block"
                marginBottom={3}
                marginTop={15}
              >
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
                autoComplete={"off"}
              />
              <MessageError>
                {errors.title && touched.title && errors.title}
              </MessageError>
              <Label
                htmlFor={45}
                size={500}
                display="block"
                marginBottom={3}
                marginTop={15}
              >
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
                autoComplete={"off"}
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
                {isLoadingForm ? "SAVING" : "SAVE"}
              </ButtonCenter>
            </BoxInput>
          </form>
        )}
      </Formik>
    </Pane>
  </SideSheet>
  );
};

export default SideSheetClaim;

const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  color: ${props => props.theme.color.red};
  font-size: 1em;
`;

const BoxInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
`;

const ButtonCenter = styled(Button)`
  display: block;
  margin: 25px auto;
  background: ${theme.color.primary};
  :hover {
    background: ${theme.color.primary} !important;
    opacity: 0.7;
  }
`;