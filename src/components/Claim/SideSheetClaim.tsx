import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { useStore, useActions } from "../../configureStore";
import { Pane, SideSheet, Heading, Button, Paragraph, } from 'evergreen-ui';
import { isBrowser } from '../../utils/helper'

const SideSheetClaim = () => {
  const isShow = useStore(state => state.argument.isShow);
  const setShow = useActions(action => action.argument.setShow);

  return (
    <SideSheet
      isShown={isShow}
      onCloseComplete={() => setShow(false)}
      containerProps={{
        display: "flex",
        flex: "1",
        flexDirection: "column"
      }}
      width={isBrowser && window.innerWidth > 1000 ? 650 : "100%"}
    >
    <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
      <Pane padding={16}>
        <Heading size={600} textAlign={"center"}>
          Create new claim
        </Heading>
        <Paragraph size={400} textAlign={"center"} marginTop={5}>
          Fill in the fields to create your claim.
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
        initialValues={claim}
        validate={values => {
          let errors = {};
          if (!values.title) {
            errors.title = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(claim)
          if (claim._key) {
            updateClaim({ _key: claim._key, model: values });
          } else {
            createClaim(values);
          }
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

const Container = styled.div`
  padding: 2em 1em;
`;

//cards
const BoxCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderTab = styled.div`
  font-size: 20px;
  width: 100%;
  border: none;
  p {
    margin: 0;
    padding: 0.7em;
    font-size: 1.1rem;
    font-weight: 600;
    color: #32325d;
  }
`;