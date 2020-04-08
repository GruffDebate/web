import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useStore, useActions } from '../../lib/store'
import { IconButton } from 'evergreen-ui'
import Router, { useRouter } from 'next/router'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { cleanUrl } from '../../utils/helper'

import SideSheetClaim from '../../components/Claim/SideSheetClaim'

export default function Claim(props) {
  const getClaim = useActions((actions) => actions.claim.getClaim)
  const getClaimParents = useActions((actions) => actions.claim.getClaimParents)
  const claim = useStore((store) => store.claim.claim)
  const claimParents = useStore((store) => store.claim.parents)
  const isShow = useStore((state) => state.argument.isShow)
  const setShow = useActions((action) => action.argument.setShow)
  const router = useRouter()

  const [type, setType] = useState('')

  const getUUID = () => {
    return router.query.id.split('__')[1]
  }

  useEffect(() => {
    getClaim({ id: getUUID(), show: false })
    getClaimParents({ id: getUUID() })
  }, [router.query])

  useEffect(() => {
    if (!isShow) {
      getClaim({ id: getUUID(), show: false })
    }
  }, [isShow])

  return (
    <Layout>
      <SEO title={claim.title} description={claim.description} />
      <SideSheetClaim type={type} />
      <Container>
        <CardShape>
          <CardPosition>
            <CardImage>
              {claim.img ? (
                <img src={`${process.env.ASSETS_BUCKET}/claims/${claim.img}`} alt={claim.title} />
              ) : (
                <div></div>
              )}
            </CardImage>
          </CardPosition>
        </CardShape>
        {claimParents && (
          <>
            <ClaimArgumentList>
              <Parent data={claimParents ? claimParents : []}></Parent>
            </ClaimArgumentList>
          </>
        )}
        <ClaimContainer>
          <ClaimBody>
            <ClaimHeader>Truth: {claim.truth}</ClaimHeader>
            <ClaimContent>
              <h2>{claim.title}</h2>
              <p>{claim.desc}</p>
            </ClaimContent>
          </ClaimBody>
        </ClaimContainer>
        {claim.premises && (
          <>
            <h3>Premises</h3>
            <ClaimPremise size={claim.premises ? claim.premises.length : 0}>
              <Premise data={claim.premises ? claim.premises : []}></Premise>
            </ClaimPremise>
          </>
        )}
        <ClaimArgument>
          <ArgumentBox type={'pro'}>
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
          <ArgumentBox type={'cons'}>
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
            <Arguments type={'pro'} data={claim.proargs ? claim.proargs : []}></Arguments>
          </ClaimArgumentList>
          <ClaimArgumentList>
            <Arguments type={'cons'} data={claim.conargs ? claim.conargs : []}></Arguments>
          </ClaimArgumentList>
        </ClaimArgumentContainer>
      </Container>
    </Layout>
  )
}

const Parent = ({ data }) =>
  data.map((item, idx) => (
    <Link
      key={idx}
      as={`/c/${cleanUrl(item.targetClaim ? item.targetClaim.title : item.targetArg.title)}__${item.targetClaimId ? item.targetClaimId : item.targetArgId}`}
      href={`/c?id=${item.targetClaimId ? item.targetClaimId : item.targetArgId}`}
    >
      <h3>{item.title ? item.title : (item.targetClaim ? item.targetClaim.title : item.targetArg.title)}</h3>
    </Link>
  ))

const Premise = ({ data }) =>
  data.map((item, idx) => (
    <Link key={idx} as={`/c/${cleanUrl(item.title)}__${item.id}`} href={`/c?id=${item.id}`}>
      <PremiseContainer>
        <PremiseBody>
          <h4>{item.title}</h4>
          <h5>{item.desc}</h5>
        </PremiseBody>
      </PremiseContainer>
    </Link>
  ))

const Arguments = ({ data, type }) =>
  data.length > 0 ? (
    data.map((item, idx) => (
      <Link
        key={idx}
        as={`/c/${cleanUrl(item.title)}__${item.claimId}`}
        href={`/c?id=${item.claimId}`}
      >
        <ArgumentContainer type={type}>
          <ArgumentHeader>relevance: {item.relevance}</ArgumentHeader>
          <ArgumentHeader>strength: {item.strength}</ArgumentHeader>
          <ArgumentBody>
            <h3>{!item.title ? item.claim.title : item.title}</h3>
          </ArgumentBody>
        </ArgumentContainer>
      </Link>
    ))
  ) : (
    <ArgumentEmpty type={type}>
      {type === 'pro' ? (
        <EmptyTitle>Be the first to make a supporting argument</EmptyTitle>
      ) : (
        <EmptyTitle>Be the first to make an argument against this claim</EmptyTitle>
      )}
    </ArgumentEmpty>
  )

const PremiseContainer = styled.div`
  min-height: 48px;
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
  background-color: #fff;

  &:hover {
    box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.45);
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
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
  background-color: #fff;
  margin-bottom: 0.5em;

  &:hover {
    box-shadow: ${(props) =>
      props.type === 'pro' ? '0 0 0.3rem 0 #41cc90' : '0 0 0.3rem 0 #ff725c'};
  }
`

const ArgumentEmpty = styled.div`
  min-height: 108px;
  border: ${(props) => (props.type === 'pro' ? '2px dotted #41cc90' : '2px dotted #ff725c')};
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
`

//cards
const ClaimContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

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
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
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
  grid-template-columns: ${(props) =>
    props.size <= 5 ? `repeat(${props.size}, 1fr);` : 'repeat(5, 1fr);'};
  margin-top: 8px;
  margin-bottom: 8px;
`

const ArgumentBox = styled.div`
  padding: 16px 16px 16px 24px;
  color: ${(props) => (props.type === 'pro' ? '#41cc90' : '#ff725c')};
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

const CardShape = styled.div`
  position: relative;
`

const CardPosition = styled.div`
  transition: color 0.2s;
  color: #2c343d;
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  text-decoration: none;
  cursor: pointer;

  &:after {
    background: linear-gradient(0deg, transparent, rgba(0, 0, 0, 0.5));
    content: '';
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    height: 1.5em;
  }
`

const CardImage = styled.div`
  flex: none;
  position: relative;
  background-color: #a9b0b8;
  cursor: pointer;

  > img {
    height: 204px;
    width: 100%;
    display: block;
    font-family: 'object-fit:cover';
    object-fit: cover;
  }

  > div {
    height: 20px;
    width: 100%;
    display: block;
  }
`
