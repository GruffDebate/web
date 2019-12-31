import React from 'react'
import get from 'lodash/get'
import Link from 'next/link'
import Router from 'next/router'
import styled, { css } from 'styled-components'
import { switchProp } from 'styled-tools'
import { useStore, useActions } from '../lib/store'
import { auth as useAuth } from '../hooks/auth'
import { isCurator } from '../utils/helper'

const Navbar = (props) => {
  const user = useStore((store) => store.auth.user)
  const logout = useActions((actions) => actions.auth.clearAuth)

  return (
    <Content>
      <ContentBox>
        <Header>
          <HeaderBoxImg>
            <h1>Gruff</h1>
          </HeaderBoxImg>
        </Header>
        <ContentLink>
          {user ? (
            props.routes.map((route, key) => (
              <ContextBoxItem
                permission={
                  user && !isCurator() ? 'user' : user && isCurator() ? 'curator' : 'guest'
                }
                curator={route.curator}
                private={route.private}
                key={key}
                onClick={() => Router.push(route.path)}
              >
                <ContextBoxItemLabel>
                  <span>{route.name}</span>
                </ContextBoxItemLabel>
              </ContextBoxItem>
            ))
          ) : (
            <ContextBoxItem
              isAuth={false}
              private={false}
              curator={false}
              onClick={() => Router.push('/')}
            >
              <ContextBoxItemLabel>
                <span>Home</span>
              </ContextBoxItemLabel>
            </ContextBoxItem>
          )}
        </ContentLink>
        <BoxAuth>
          {!user ? (
            <Link href="/login">
              <Login>Login</Login>
            </Link>
          ) : (
            <>
              <MenuItem>
                <span>Hi, {user && user.username}</span>
              </MenuItem>
              <Logout onClick={logout}>
                <span>Logout</span>
              </Logout>
            </>
          )}
        </BoxAuth>
      </ContentBox>
    </Content>
  )
}

export default Navbar

const Content = styled.div`
  background-color: #1070ca;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
`

const ContentBox = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  padding: 0 3.5em;
  justify-content: center;

  > :last-child {
    margin-left: auto;
    padding-right: 20px;
  }
`

const ContextBoxItem = styled.a`
  align-items: center;
  margin-left: 0.8em;
  &:first-child {
    margin-left: 1.8em;
  }

  ${switchProp('permission', {
    guest: css`
      display: 'none';
    `,
    user: css`
      display: ${(props) => (props.curator ? 'none' : 'flex')};
    `,
    curator: css`
      display: 'flex';
    `,
  })}
`

const ContextBoxItemLabel = styled.div`
  cursor: pointer;
  color: #ffffff;
  font-size: 1em;
  padding-right: 22px;

  > span:hover {
    border-bottom: 1px solid #fff;
    padding-bottom: 4px;
    transition: border-bottom-color 0.3s ease-in-out;
  }
`

const BoxAuth = styled.div``

const Login = styled.a`
  cursor: pointer;
  color: #ffffff;
  font-size: 1em;
  text-decoration: none;

  &:hover {
    border-bottom: 1px solid #fff;
    padding-bottom: 4px;
    transition: border-bottom-color 0.3s ease-in-out;
  }
`

const MenuItem = styled.label`
  cursor: pointer;
  color: #ffffff;
  font-size: 1em;

  > span {
    margin-right: 50px;
  }

  > span:hover {
    border-bottom: 1px solid #fff;
    padding-bottom: 4px;
    transition: border-bottom-color 0.3s ease-in-out;
  }
`

const Logout = styled.label`
  cursor: pointer;
  color: #ffffff;
  font-size: 1em;
  border: 1px solid #ffffff;
  padding: 10px;
  border-radius: 4px;
  vertical-align: middle;
  white-space: nowrap;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s, opacity 0.2s;

  &:hover {
    color: #333;
    background: #f6faff;
    border-color: #f6faff;
    padding: 10px;
    transition: background-color 0.3s ease-in-out;
  }
`

const Header = styled.div``

const HeaderBoxImg = styled.div`
  padding-right: 20px;
  > h1 {
    color: white;
  }
  > img {
    height: 45px;
    width: auto;
    border-radius: 5px;
  }
`

const ContentLink = styled.div`
  display: flex;
  justify-content: space-between;
`
