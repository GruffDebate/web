import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore, useActions } from "../configureStore";
import { IconButton } from 'evergreen-ui';
import Layout from '../components/layout'

export default function Claim(props) {
  const getClaim = useActions(actions => actions.claim.getClaim);
  const claim = useStore(store => store.claim.claim);

  useEffect(() => {
    getClaim(props.location.pathname.split('/c/')[1]);
  }, []);

  return (
    <Layout>
      <Container>
        <ClaimContainer>
          <ClaimBody>
            <ClaimHeader>
              Truth: 10
            </ClaimHeader>
            <ClaimContent>
              <h2>{claim.title}</h2>
              <p>{claim.desc}</p>
            </ClaimContent>
          </ClaimBody>
        </ClaimContainer>
        {
          claim.premise && (
            <ClaimPremise>
              <Premise data={claim.premise ? claim.premise : []}></Premise>
            </ClaimPremise>
          )
        }
        <ClaimArgument>
          <ArgumentBox type={"pro"}>
            <span>Pros</span>
            <IconButton
              icon="plus"
              appearance="primary" 
              intent="success"
              onClick={() => {}}
            />
          </ArgumentBox>
          <ArgumentBox type={"cons"}>
            <span>Cons</span>
            <IconButton
              icon="plus"
              appearance="primary" 
              intent="danger"
              onClick={() => {}}
            />
          </ArgumentBox>
        </ClaimArgument>
        <ClaimArgumentList>
          <Arguments type={"pro"} data={claim.proargs ? claim.proargs : []}></Arguments>
          <Arguments type={"cons"} data={claim.conargs ? claim.conargs: []}></Arguments>
        </ClaimArgumentList>
      </Container>
    </Layout>
  );
};

const Premise = ({ data }) => (
  data.map((item, idx) => (
    <PremiseContainer key={idx}>
      <PremiseBody>
        <h5>{item.title}</h5>
      </PremiseBody>
    </PremiseContainer>
  ))
)

const Arguments = ({ data, type }) => (
  data.map((item, idx) => (
    <ArgumentContainer key={idx} type={type}>
      <ArgumentHeader>
        truth: 4
      </ArgumentHeader>
      <ArgumentBody>
        <h3>{item.title}</h3>
      </ArgumentBody>
    </ArgumentContainer>
  ))
)

const PremiseContainer = styled.div`
  min-height: 48px;
  box-shadow: 0 0 1rem 0 rgba(136,152,170,0.15);
  background-color: #fff;

  &:hover {
    box-shadow: 0 0 1rem 0 rgba(136,152,170,0.45);
  }
`

const PremiseBody = styled.div`
  padding: 12px 12px 12px 20px;
  cursor: pointer;
  width: 90%;
  text-decoration: none;

  > h5 {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`

const ArgumentContainer = styled.div`
  min-height: 108px;
  box-shadow: 0 0 1rem 0 rgba(136,152,170,0.15);
  background-color: #fff;

  &:hover {
    box-shadow: ${props => props.type === 'pro' ? '0 0 0.3rem 0 #41cc90' : '0 0 0.3rem 0 #ff725c'};
  }
`

const ArgumentHeader = styled.div`
  padding-top: 5px;
  padding-left: 20px;
  height: 15px;
`

const ArgumentBody = styled.div`
  padding: 12px 12px 12px 20px;
  cursor: pointer;
  width: 90%;
  text-decoration: none;

  > h3 {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`


const Container = styled.div`
  padding: 2em 1em;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  min-width: 280px;
`;

//cards
const ClaimContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 0 1rem 0 rgba(136,152,170,0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ClaimBody = styled.div`
  padding: 16px 16px 16px 24px;
  cursor: pointer;
  width: 100%;
  text-decoration: none;
`

const ClaimHeader = styled.div`
  padding-top: 8px;
  height: 20px;
`

const ClaimContent = styled.div`
  font-size: 22px;
  line-height: 1.4;
  padding-bottom: 25px;

  > h2 {
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 0;
  }

  > p {
    margin-top: 5px;
    font-size: 15px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`

const ClaimArgument = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #fff;
  box-shadow: 0 0 1rem 0 rgba(136,152,170,0.15);
`

const ClaimArgumentList = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin-top: 8px;
`

const ClaimPremise = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 8px;
  margin-bottom: 8px;
  /* background-color: #fff; */
`

const ArgumentBox = styled.div`
  padding: 16px 16px 16px 24px;
  color: ${props => props.type === 'pro' ? '#41cc90' : '#ff725c'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #e6e9eb;
  background-color: #fff;
  font-weight: bold;
  font-size: 19px;

  &:first-child {
    border-right: 1px solid #eee;
  }
`