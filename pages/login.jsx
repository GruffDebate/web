import React, { useState } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import { TabNavigation, Tab, Label } from 'evergreen-ui'
import Layout from '../components/layout'
import { useStore, useActions } from '../lib/store'

export default function Login() {
  const isLoading = useStore((state) => state.auth.isAuthLoading)
  const authError = useStore((state) => state.auth.authError)
  const login = useActions((actions) => actions.auth.authenticateUser)
  const signup = useActions((actions) => actions.auth.createUser)

  const [tabs] = useState(['Sign Up', 'Log In'])
  const [selectedIndex, setSelectedIndex] = useState(1)

  return (
    <Layout>
      <Container>
        <Box>
          <Content>
            <Header>
              <HeaderWelcome>
                <h1>Explorer all in Gruff</h1>
              </HeaderWelcome>
            </Header>
            <TabNavigation
              marginTop={20}
              display={'flex'}
              justifyContent={'center'}
              style={{ margin: '0 auto', width: '50%', borderBottom: '1px solid #e6e9eb' }}
            >
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
              initialValues={{ email: '', password: '' }}
              validate={(values) => {
                let errors = {}
                if (!values.email) {
                  errors.email = 'Required'
                }
                if (!values.password) {
                  errors.password = 'Required'
                }

                if (selectedIndex === 0) {
                  if (!values.username) {
                    errors.username = 'Required'
                  }
                }
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                if (selectedIndex === 0) {
                  signup(values)
                } else {
                  login(values)
                }
                setSubmitting(false)
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <ContentForm>
                      {authError && <MessageError>{authError}</MessageError>}
                      {selectedIndex === 0 && (
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
                            value={values.username}
                            placeholder="Username"
                            autoComplete={'off'}
                          />
                          <MessageError>
                            {errors.username && touched.username && errors.username}
                          </MessageError>
                        </>
                      )}
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
                        value={values.email}
                        placeholder="Email"
                        autoComplete={'off'}
                        autoFocus={true}
                      />
                      <MessageError>{errors.email && touched.email && errors.email}</MessageError>
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
                        value={values.password}
                        placeholder="Password"
                        type="password"
                        autoComplete={'off'}
                      />
                      <MessageError>
                        {errors.password && touched.password && errors.password}
                      </MessageError>
                    </ContentForm>
                    <Button type="submit" disabled={isSubmitting} loading={isLoading}>
                      <LabelButton>{isLoading ? 'SIGNING' : 'SIGN IN'}</LabelButton>
                    </Button>
                  </form>
                </>
              )}
            </Formik>
          </Content>
        </Box>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  height: 80vh;
  width: 715px;
`

const Box = styled.div`
  height: auto;
  width: 715px;
  border-radius: 2px;
  background: #ffffff;
  position: relative;
  transition-delay: 0.5s;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 4px, rgba(0, 0, 0, 0.08) 0px 8px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  form {
    width: 100%;
  }

  @media (max-width: 600px) {
    width: auto;
    form {
      width: auto;
    }
  }
`

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  -webkit-box-align: stretch;
  align-items: stretch;

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
  color: ${(props) => props.theme.color.black};
  position: relative;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-sizing: border-box;
`

const HeaderWelcome = styled.div`
  position: relative;

  h1 {
    font-size: 28px;
    font-weight: 800;
    font-style: normal;
    font-stretch: normal;
    line-height: 30px;
    text-align: left;
    padding: 20px 0px;
    margin: 0px 20px;
    border-bottom: 1px solid rgb(218, 225, 233);
  }
`

const ContentForm = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 10px 40px 0px 40px;
  @media (max-width: 600px) {
    padding: 1em;
  }
`

const MessageError = styled.span`
  display: flex;
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  color: ${(props) => props.theme.color.red};
  font-size: 0.9em;
`

const Input = styled.input`
  width: 97%;
  height: 38px;
  opacity: 1;
  box-shadow: none;
  /* margin: 0px 0px 5px; */
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  padding: 10px 0 10px 10px;
  transition: all 0.2s ease-in-out 0s;
  background-color: #eff1f4 !important;
  border-radius: 2px;
  :focus {
    background: rgb(255, 255, 255);
    box-shadow: rgb(22, 82, 240) 0px 0px 0px 1px inset;
    outline: none;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`

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
  opacity: ${(props) => (props.loading ? 0.8 : 1)};
`

const LabelButton = styled.span`
  height: 42px;
  line-height: 42px;
  font-size: 1.5em;
  font-weight: bold;
`

const TabContent = styled(Tab)`
  height: 45px;
  margin-top: 5px;
  background: none;
  border-bottom: ${(props) => (props.isSelected ? '4px solid #1070ca;' : 'none')};
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
    color: ${(props) => (props.active ? '#1070ca' : '#a9b0b8')};
  }
`
