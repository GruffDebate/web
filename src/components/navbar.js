import React from "react";
import get from "lodash/get";
import { Link, navigate } from 'gatsby'
import styled, { css } from "styled-components";
import { ifProp, switchProp } from "styled-tools";
import { useStore, useActions } from "../configureStore";
import LogoIcon from "../assets/images/icon.png";
import { auth as useAuth } from "../hooks/auth";
import { isCurator } from '../utils/helper'

const Navbar = props => {
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
          {
            user ? props.routes.map((route, key) => (
              <ContextBoxItem permission={user && !isCurator() ? 'user' : user && isCurator() ? 'curator' : 'guest'} curator={route.curator}  private={route.private} key={key} onClick={() => navigate(route.path) }>
                <ContextBoxItemLabel>
                  <span>{route.name}</span>
                </ContextBoxItemLabel>
              </ContextBoxItem>
            )) : 
            <ContextBoxItem isAuth={false} private={false} curator={false} onClick={() => navigate('/') }>
              <ContextBoxItemLabel>
                <span>Home</span>
              </ContextBoxItemLabel>
            </ContextBoxItem>
          }
        </ContentLink>
        <BoxAuth>
          {!user ? (
              <Login 
                to="/login"
                state={{
                  modal: true,
                  noScroll: true
                }}>
                <span>Login</span>
              </Login>
            ) : (
              <>
                <MenuItem><span>Hi, {user && user.username}</span></MenuItem>
                <Logout onClick={logout}><span>Logout</span></Logout>
              </>
            )
          }
        </BoxAuth>
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

  ${switchProp("permission", {
    guest: css`
      display: 'none';
    `,
    user: css`
      display: ${props => props.curator ? 'none' : 'flex' };
    `,
    curator: css`
      display: 'flex';
    `
  })}
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

const MenuItem = styled.label`
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

const Logout = styled.label`
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