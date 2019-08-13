import React from "react";
import get from "lodash/get";
import { Link, navigate } from 'gatsby'
import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";
import { useStore, useActions } from "../configureStore";
import LogoIcon from "../assets/images/icon.png";
import { auth as useAuth } from "../hooks/auth";

const Navbar = props => {
  const { auth, cachedAuth } = useAuth(true);
  const isAuth = !!get(auth, "token", false) || !!get(cachedAuth, "token", false);
  const user = useStore(store => store.auth.user);
  const logout = useActions(actions => actions.auth.clearAuth);

  return (
    <Content>
      <ContentBox>
        <Header>
        <HeaderBoxImg>
          <img src={LogoIcon} alt="Gruff" />
        </HeaderBoxImg>
        </Header>
        <ContentLink>
          {props.routes.map((route, key) => (
            <ContextBoxItem isAuth={isAuth && route.private} private={route.private} key={key} onClick={() => {
              if (typeof window !== `undefined`) navigate(route.path)}
            }>
              <ContextBoxItemLabel>
                <span>{route.name}</span>
              </ContextBoxItemLabel>
            </ContextBoxItem>
            )
          )}
        </ContentLink>
        {isAuth && <BoxAuth>
          <MenuItem><span>Hi, {user && user.username}</span></MenuItem>
          <Logout onClick={logout}><span>Logout</span></Logout>
        </BoxAuth>}
        {!isAuth && 
          <BoxAuth>
            <Login 
              to="/login"
              state={{
                modal: true,
                noScroll: true
              }}>
              <span>Login</span>
            </Login>
          </BoxAuth>
        }
      </ContentBox>
    </Content>
  )
};

export default Navbar;

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
  margin-left: .8em;
  &:first-child {
    margin-left: 1.8em;
  }

  ${ifProp(
     { isAuth: true },
    css`
      display: flex;
    `,
    css`
      display: ${props => props.private ? 'none' : 'flex' };
    `
  )}
`

const ContextBoxItemLabel = styled.div`
  cursor: pointer;
  color: #FFFFFF;
  font-size: 1em;
  padding-right: 22px;

  > span:hover {
    border-bottom: 1px solid #fff;
    padding-bottom: 4px;
    transition: border-bottom-color .3s ease-in-out;
  }
`

const BoxAuth = styled.div``

const Login = styled(Link)`
  cursor: pointer; 
  color: #FFFFFF;
  font-size: 1em;
  text-decoration: none;

  > span:hover {
    border-bottom: 1px solid #fff;
    padding-bottom: 4px;
    transition: border-bottom-color .3s ease-in-out;
  }
`;

const MenuItem = styled.a`
  cursor: pointer; 
  color: #FFFFFF;
  font-size: 1em;
  
  > span {
    margin-right: 50px;
  }

  > span:hover {
    border-bottom: 1px solid #fff;
    padding-bottom: 4px;
    transition: border-bottom-color .3s ease-in-out;
  }
`;

const Logout = styled.a`
  cursor: pointer; 
  color: #FFFFFF;
  font-size: 1em;
  border: 1px solid #FFFFFF;
  padding: 10px;
  border-radius: 4px;
  vertical-align: middle;
  white-space: nowrap;
  transition: color .2s,background-color .2s,border-color .2s,opacity .2s;

  &:hover {
    color: #333;
    background: #f6faff;
    border-color: #f6faff;
    padding: 10px;
    transition: background-color .3s ease-in-out;
  }
`;

const Header = styled.div``

const HeaderBoxImg = styled.div`
  padding-right: 20px;
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