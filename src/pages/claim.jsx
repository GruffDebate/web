import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore, useActions } from "../configureStore";
import { IconButton } from 'evergreen-ui';
import { navigate } from "gatsby";
import Layout from '../components/layout'
import SEO from '../components/seo'

import SideSheetClaim from '../components/Claim/SideSheetClaim'

export default function Claim(props) {
  const getClaim = useActions(actions => actions.claim.getClaim);
  const claim = useStore(store => store.claim.claim);
  const isShow = useStore(state => state.argument.isShow);
  const setShow = useActions(action => action.argument.setShow);

  const [type, setType] = useState('')

  useEffect(() => {
    if (claim.id !== props.location.pathname.split('/c/')[1]) {
      getClaim({id: props.location.pathname.split('/c/')[1], show: false});
    }
  }, []);

  useEffect(() => {
    if (!isShow && claim.id === props.location.pathname.split('/c/')[1]) {
      getClaim({id: claim.id, show: false})
    }
  }, [isShow])

  return (
    <Layout>
      <SEO title={claim.title} description={claim.description} />
      <SideSheetClaim type={type} />
      <Container>
        <ClaimContainer>
          <ClaimBody>
            <ClaimHeader>
              Truth: {claim.truth}
            </ClaimHeader>
            <ClaimContent>
              <h2>{claim.title}</h2>
              <p>{claim.desc}</p>
            </ClaimContent>
          </ClaimBody>
        </ClaimContainer>
        {
          claim.premises && (
            <>
              <h3>Premises</h3>
              <ClaimPremise size={claim.premises ? claim.premises.length : 0}>
                <Premise data={claim.premises ? claim.premises : []}></Premise>
              </ClaimPremise>
            </>
          )
        }
        <ClaimArgument>
          <ArgumentBox type={"pro"}>
            <span>Pros</span>
            <IconButton
              icon="plus"
              appearance="primary" 
              intent="success"
              onClick={() => {
                setType('pro')
                setShow(true)
              }}
            />
          </ArgumentBox>
          <ArgumentBox type={"cons"}>
            <span>Cons</span>
            <IconButton
              icon="plus"
              appearance="primary" 
              intent="danger"
              onClick={() => {
                setType('cons')
                setShow(true)
              }}
            />
          </ArgumentBox>
        </ClaimArgument>
        <ClaimArgumentContainer>
          <ClaimArgumentList>
            <Arguments type={"pro"} data={claim.proargs ? claim.proargs : []}></Arguments>
          </ClaimArgumentList>
          <ClaimArgumentList>
            <Arguments type={"cons"} data={claim.conargs ? claim.conargs: []}></Arguments>
          </ClaimArgumentList>
        </ClaimArgumentContainer>
      </Container>
    </Layout>
  );
};

const Premise = ({ data }) => (
  data.map((item, idx) => (
    <PremiseContainer key={idx} onClick={() => navigate(`/c/${item.id}`)}>
      <PremiseBody>
        <h4>{item.title}</h4>
        <h5>{item.desc}</h5>
      </PremiseBody>
    </PremiseContainer>
  ))
)

const Arguments = ({ data, type }) => (
  data.length > 0 ? data.map((item, idx) => (
    <ArgumentContainer key={idx} type={type} onClick={() => navigate(`/c/${item.claimId}`)}>
      <ArgumentHeader>
        relevance: {item.relevance}
      </ArgumentHeader>
      <ArgumentHeader>
        strength: {item.strength}
      </ArgumentHeader>
      <ArgumentBody>
        <h3>{item.title}</h3>
      </ArgumentBody>
    </ArgumentContainer>
  )) :
    <ArgumentEmpty type={type}>
      <EmptyTitle>
        Be the first to make a {type} argument
      </EmptyTitle>
    </ArgumentEmpty>
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

  > h4 {
    margin-bottom: 1px;
    margin-top: 5px;
    color: #333;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  > h5 {
    margin-top: 3px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  p {
    margin-top: 3px;
    margin-bottom: 3px;
    font-size: 14px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`

const ArgumentContainer = styled.div`
  min-height: 108px;
  box-shadow: 0 0 1rem 0 rgba(136,152,170,0.15);
  background-color: #fff;
  margin-bottom: 0.5em;

  &:hover {
    box-shadow: ${props => props.type === 'pro' ? '0 0 0.3rem 0 #41cc90' : '0 0 0.3rem 0 #ff725c'};
  }
`

const ArgumentEmpty = styled.div`
  min-height: 108px;
  border: ${props => props.type === 'pro' ? '2px dotted #41cc90' : '2px dotted #ff725c'};
`

const ArgumentHeader = styled.p`
  padding-top: 5px;
  padding-left: 20px;
  height: 15px;
  margin: 0;
  font-size: 0.8em;
  color: #bdc3c7;
`

const ArgumentBody = styled.div`
  padding: 5px 12px 6px 20px;
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

const EmptyTitle = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
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
  width: 95%;
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

const ClaimArgumentContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
`

const ClaimArgumentList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`

const ClaimPremise = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: ${props => props.size <= 5 ? `repeat(${props.size}, 1fr);` : 'repeat(5, 1fr);'};
  margin-top: 8px;
  margin-bottom: 8px;
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