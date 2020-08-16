import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useStore, useActions } from '../../lib/store'
import {
  IconButton,
  Dialog,
  Pane,
} from 'evergreen-ui'
import Router, { useRouter } from 'next/router'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { cleanUrl } from '../../utils/helper'
import { isCurator } from '../../utils/helper'

import ArgumentTarget from '../../components/Argument/ArgumentTarget'
import SideSheetClaim from '../../components/Claim/SideSheetClaim'
import SideSheetArgument from '../../components/Argument/SideSheetArgument'
import ContextList from '../../components/Context/ContextList'

export default function Claim(props) {
  const user = useStore((store) => store.auth.user)
  const getArgument = useActions((actions) => actions.argument.getArgument)
  const getArgumentTarget = useActions((actions) => actions.argument.getArgumentTarget)
  const argument = useStore((store) => store.argument.argument)
  //const claimParents = useStore((store) => store.claim.parents)
  const isShow = useStore((state) => state.argument.isShow)
  const setShow = useActions((action) => action.argument.setShow)
  //const isShowArg = useStore((state) => state.argument.isShow)
  //const setShowArg = useActions((action) => action.argument.setShow)
  const router = useRouter()
  const isLoadingDelete = useStore((state) => state.argument.isLoadingDelete)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})
  const deleteArg = useActions((actions) => actions.argument.deleteArgument)
  //const listArguments = useActions((actions) => actions.argument.listArguments)

  const [type, setType] = useState('')

  const getUUID = () => {
    return router.query.id.split('__')[1]
  }

  useEffect(() => {
    getArgument({ id: getUUID(), show: false })
  }, [router.query])

  useEffect(() => {
    console.log(argument)
    if (argument.targetClaimId) {
      getArgumentTarget({ claimId: argument.targetClaimId })
    } else if (argument.targetArgumentId) {
      getArgumentTarget({ argumentId: argument.targetArgumentId })
    }
  }, [argument])

  useEffect(() => {
    if (!isShow) {
      // TODO: This is redundant with the previous useEffect
      getArgument({ id: getUUID(), show: false })
    }
  }, [isShow])

  useEffect(() => {
    if (!isLoadingDelete && showDelete) {
      setShowDelete(false)
      getArgument({ id: getUUID(), show: false })
    }
  }, [isLoadingDelete])

  return (
    <Layout>
      <SEO title={argument.title} description={argument.description} />
      <SideSheetArgument />
      <SideSheetArgument type={type} />
      <Container>
        <Dialog
          isShown={showDelete}
          title="Delete Argument"
          onCloseComplete={() => setShowDelete(false)}
          isConfirmLoading={isLoadingDelete}
          onConfirm={() => {
            deleteArgument(deleteItem.id)
          }}
          cancelLabel="CANCEL"
          intent="danger"
          confirmLabel={isLoadingDelete ? 'DELETING' : 'DELETE'}
        >
          Do you really want to delete the Argument <b>{deleteItem.name}</b> ?
        </Dialog>
        <CardShape>
          <CardPosition>
            <CardImage>
              {argument.claim && argument.claim.img ? (
                <img src={`${process.env.ASSETS_BUCKET}/claims/${argument.claim.img}`} alt={argument.title} />
              ) : (
                <div></div>
              )}
            </CardImage>
          </CardPosition>
        </CardShape>
	<ArgumentTarget argument={argument} />
        <ArgumentContainer>
 	  {user && isCurator() && !argument.end && (
          <Pane key={argument.id} display="flex" flexDirection="column">
          <Pane
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            backgroundColor="#fff"
            padding="10px"
          >
            <IconButton
              icon="edit"
              marginRight={10}
	      onClick={() => getArgument({ id: argument.id, show: true })}
	      //onClick={() => alert("argument "+argument.id)}
            />
            <IconButton
              icon="trash"
              intent="danger"
              onClick={() => {
                setDeleteItem(argument)
                setShowDelete(true)
              }}
            />
          </Pane>
          </Pane>
  	  )}
          <ArgumentBody>
            <ArgumentHeader>Truth: {argument.truth}</ArgumentHeader>
            <ArgumentContent>
              <h2>{argument.title}</h2>
              <p>{argument.desc}</p>
            </ArgumentContent>
            Context: <ContextList contexts={argument.contexts} />
          </ArgumentBody>
        </ArgumentContainer>
        {argument.premises && (
          <>
            <h3>Premises</h3>
            <ArgumentPremise size={argument.premises ? argument.premises.length : 0}>
              <Premise data={argument.premises ? argument.premises : []}></Premise>
            </ArgumentPremise>
          </>
        )}
        <ArgumentArgument>
          <ArgumentBox type={'pro'}>
            <span>Pros</span>
            <IconButton
              icon="plus"
              appearance="primary"
              intent="success"
              onClick={() => {
                setType('pro')
                setShowArg(true)
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
                setShowArg(true)
              }}
            />
          </ArgumentBox>
        </ArgumentArgument>
        <ArgumentArgumentContainer>
          <ArgumentArgumentList>
            <Arguments type={'pro'} data={argument.proargs ? argument.proargs : []}></Arguments>
          </ArgumentArgumentList>
          <ArgumentArgumentList>
            <Arguments type={'cons'} data={argument.conargs ? argument.conargs : []}></Arguments>
          </ArgumentArgumentList>
        </ArgumentArgumentContainer>
      </Container>
      <Link key="ClaimLink" as={`/c/${cleanUrl(argument.title)}__${argument.claimId}`} href={`/c?id=${argument.claimId}`}>See Base Claim</Link>
    </Layout>
  )
}

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
        <ArgumentsArgumentContainer type={type}>
          <ArgumentsArgumentHeader>relevance: {item.relevance}</ArgumentsArgumentHeader>
          <ArgumentsArgumentHeader>strength: {item.strength}</ArgumentsArgumentHeader>
          <ArgumentsArgumentBody>
            <h3>{!item.title ? item.claim.title : item.title}</h3>
          </ArgumentsArgumentBody>
        </ArgumentsArgumentContainer>
      </Link>
    ))
  ) : (
    <ArgumentEmpty type={type}>
      {type === 'pro' ? (
        <EmptyTitle>Be the first to make a supporting argument</EmptyTitle>
      ) : (
        <EmptyTitle>Be the first to make an argument against this argument</EmptyTitle>
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

const ArgumentsArgumentContainer = styled.div`
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

const ArgumentsArgumentHeader = styled.p`
  padding-top: 5px;
  padding-left: 20px;
  height: 15px;
  margin: 0;
  font-size: 0.8em;
  color: #bdc3c7;
`

const ArgumentsArgumentBody = styled.div`
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
const ArgumentContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ArgumentBody = styled.div`
  padding: 16px 16px 16px 24px;
  cursor: pointer;
  width: 95%;
  text-decoration: none;
`

const ArgumentHeader = styled.div`
  padding-top: 8px;
  height: 20px;
`

const ArgumentContent = styled.div`
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

const ArgumentArgument = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #fff;
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
`

const ArgumentArgumentContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
`

const ArgumentArgumentList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`

const ArgumentPremise = styled.div`
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
