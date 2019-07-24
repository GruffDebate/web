import React, { useState } from 'react'
import styled from "styled-components"
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import { Formik } from "formik";
import { TabNavigation, Tab, Pane, Label } from 'evergreen-ui';
import { useStore, useActions } from "../configureStore";
import { theme } from "../theme";

export default function Login() {
  const isLoading = useStore(state => state.auth.isAuthLoading);
  const authError = useStore(state => state.auth.authError);
  const updateError = useActions(state => state.auth.updateAuthError);
  const login = useActions(actions => actions.auth.authenticateUser);
  const signup = useActions(actions => actions.auth.createUser);

  const [tabs] = useState(["Sign Up", "Log In"]);
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <ModalRoutingContext>
      {({ modal, closeTo }) => (
        <Container>
          <Box>
            <Content>
              <Header>
                <HeaderWelcome>
                  <h1>Log In</h1>
                </HeaderWelcome>
              </Header>
              <TabNavigation marginTop={20} display={"flex"} justifyContent={"center"} style={{ margin: '0 auto', width: '50%', borderBottom: '1px solid #e6e9eb' }}>
                {tabs.map((tab, index) => (
                  <TabContent
                    key={tab}
                    id={tab}
                    is="a"
                    onSelect={() => setSelectedIndex(index)}
                    isSelected={index === selectedIndex}
                    aria-controls={`panel-${tab}`}
                  >
                    <HeaderTab active={index === selectedIndex}>
                      <span>{tab}</span>
                    </HeaderTab>
                  </TabContent>
                ))}
              </TabNavigation>
              <Formik
                enableReinitialize
                initialValues={{ email: "", password: "" }}
                validate={values => {
                  let errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  }
                  if (!values.password) {
                    errors.password = "Required";
                  }

                  if (selectedIndex === 0) {
                    if (!values.username) {
                      errors.username = "Required";
                    }
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  if (selectedIndex === 0) {
                    signup(values);
                  } else {
                    login(values);
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
                  <>
                    <form onSubmit={handleSubmit}>
                      <ContentForm>
                        {authError && <MessageError>{authError}</MessageError>}
                        {selectedIndex === 0 && 
                          <>
                            <Label
                              htmlFor={45}
                              size={500}
                              display="block"
                              marginBottom={3}
                              marginTop={15}
                            >
                              Username
                            </Label>
                            <Input
                              height={45}
                              name="username"
                              type="text"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.username}
                              placeholder="Username"
                              autoComplete={"off"}
                            />
                            <MessageError>
                              {errors.username && touched.username && errors.username}
                            </MessageError>
                          </>
                        }
                        <Label
                          htmlFor={45}
                          size={500}
                          display="block"
                          marginBottom={3}
                          marginTop={15}
                        >
                          Email
                        </Label>
                        <Input
                          height={45}
                          name="email"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="Email"
                          autoComplete={"off"}
                          autoFocus={true}
                        />
                        <MessageError>
                          {errors.email && touched.email && errors.email}
                        </MessageError>
                        <Label
                          htmlFor={45}
                          size={500}
                          display="block"
                          marginBottom={3}
                          marginTop={15}
                        >
                          Password
                        </Label>
                        <Input
                          height={45}
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="Password"
                          type="password"
                          autoComplete={"off"}
                        />
                        <MessageError>
                          {errors.password && touched.password && errors.password}
                        </MessageError>
                      </ContentForm>
                      <Button type="submit" disabled={isSubmitting} loading={isLoading}>
                        <LabelButton>{isLoading ? "SIGNING" : "SIGN IN"}</LabelButton>
                      </Button>
                    </form>
                    <Link to={"/"}>
                      <svg fill="#fff" preserveAspectRatio="xMidYMid meet" height="2em" width="2em" viewBox="0 0 40 40"><g><path d="m31.6 10.7l-9.3 9.3 9.3 9.3-2.3 2.3-9.3-9.3-9.3 9.3-2.3-2.3 9.3-9.3-9.3-9.3 2.3-2.3 9.3 9.3 9.3-9.3z"></path></g></svg>
                    </Link>
                  </>
                )}
              </Formik>
            </Content>
          </Box>
        </Container>
      )}
    </ModalRoutingContext>
  );
}


const Container = styled.div`
  display: flex;
  position: relative;
  height: 100vh;
`

const Box = styled.div`
  display: flex;
  justify-items: center;
  max-width: 40rem;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  margin: auto;
`

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  -webkit-box-align: stretch;
  align-items: stretch;
  background: rgb(246, 250, 255);

  > form {
    width: 100%;
  }

  svg {
    cursor: pointer;
    flex: none;
    margin-right: -35px;
    margin-top: -40px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 50px;
  color: ${props => props.theme.color.gray};
  position: relative;
  background: rgb(246, 250, 255);
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-sizing: border-box;
`;

const HeaderWelcome = styled.div`
  position: relative;

  h1 {
    color: #333;
  }
`;

const HeaderLogo = styled.img`
  width: auto;
  height: 50px;
  display: inline-block;
  margin: 0 0 0px;
  vertical-align: middle;
  -webkit-transition: margin-top 0.4s;
  transition: margin-top 0.4s;
  margin: 0px 0px 0px 0px;
`;

const ContentForm = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 10px 40px 0px 40px;
  @media (max-width: 600px) {
    padding: 1em;
  }
`;

const MessageError = styled.span`
  display: flex;
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  color: ${props => props.theme.color.red};
  font-size: 0.9em;
`;

const Input = styled.input`
  margin-top: 5px;
  font-size: 1em;
  outline: 0;
  right: 0;
  height: 45px;
  width: 100%;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 3px;
  border: none;
  background: #fff;
  margin-bottom: 4px;
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  :focus {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08) !important;
  }
`;

const Button = styled.button`
  background-color: #1070ca;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 20px;
  border: 0;
  padding: 0;
  display: block;
  box-sizing: border-box;
  width: 50.5%;
  height: 60px;
  overflow: hidden;
  border-radius: 5px;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  color: #fff;
  letter-spacing: 1px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  outline: 0;
  opacity: ${props => (props.loading ? 0.8 : 1)};
`;

const LabelButton = styled.span`
  height: 42px;
  line-height: 42px;
  font-size: 1.5em;
  font-weight: bold;
`;

const LinkCustom = styled(Link)`
  height: 30px;
  line-height: 30px;
  font-size: 10px;
  font-weight: 400;
  text-decoration: none;
  color: ${theme.color.primary};
  font-family: ${theme.font};
  :hover {
    text-decoration: underline;
  }
`;

const LinkRegister = styled(Link)`
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
`;

const BoxLink = styled.div`
  height: 50px;
  padding-left: 40px;
  padding: 0em 0em 1em 40px;
  a {
    font-size: 17px;
  }
`;

const BoxCenterLink = styled(BoxLink)`
  text-align: center;
  padding-left: 0px;
`;

const TabContent = styled(Tab)`
  height: 45px; 
  margin-top: 5px; 
  background: none; 
  border-bottom: ${props => props.isSelected ? '4px solid #1070ca;' : 'none'};
  border-radius: 0;
  width: 50%;
  text-align: center;
  outline: 0;
  cursor: pointer;
`

const HeaderTab = styled.div`
  font-size: 20px;
  width: 100%;
  border: none;
  span {
    margin: 0;
    padding: 0.7em;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.active ? '#1070ca' : '#a9b0b8'};
  }
`;