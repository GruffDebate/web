import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import {
  Dialog,
  IconButton,
  Button,
  Pane,
  Heading,
  TextInput,
  Textarea,
  toaster,
} from 'evergreen-ui'
import { useStore, useActions } from '../lib/store'
import { theme } from '../lib/theme'
import Layout from '../components/layout'
import { isBrowser } from '../utils/helper'
import { Upload } from '../utils/upload'
import Card from '../components/Home/Card'
import { BoxCards } from '../components/UI'
import SideSheetClaim from '../components/Claim/SideSheetClaim'

export default function Claims() {
  const isLoadingForm = useStore((state) => state.claim.isLoadingForm)
  const isLoadingDelete = useStore((state) => state.claim.isLoadingDelete)
  const isShow = useStore((state) => state.claim.isShow)
  const setShow = useActions((state) => state.claim.setShow)
  const getClaim = useActions((actions) => actions.claim.getClaim)
  const createClaim = useActions((actions) => actions.claim.createClaim)
  const claims = useStore((state) => state.claim.claims)
  const listClaims = useActions((actions) => actions.claim.listClaims)
  const claim = useStore((state) => state.claim.claim)
  const deleteClaim = useActions((actions) => actions.claim.deleteClaim)
  const clearClaim = useActions((state) => state.claim.clearClaim)

  const [showDelete, setShowDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})

  useEffect(() => {
    listClaims()
  }, [])

  useEffect(() => {
    if (!isShow) {
      listClaims()
    }
  }, [isShow])

  useEffect(() => {
    if (!isLoadingDelete && showDelete) {
      setShowDelete(false)
      listClaims()
    }
  }, [isLoadingDelete])

  return (
    <Layout>
      <Container>
        <Dialog
          isShown={showDelete}
          title="Delete Claim"
          onCloseComplete={() => setShowDelete(false)}
          isConfirmLoading={isLoadingDelete}
          onConfirm={() => {
            deleteClaim(deleteItem.id)
          }}
          cancelLabel="CANCEL"
          intent="danger"
          confirmLabel={isLoadingDelete ? 'DELETING' : 'DELETE'}
        >
          Do you really want to delete the Claim <b>{deleteItem.name}</b> ?
        </Dialog>
        <BoxTable>
          <Button
            height={40}
            marginBottom={30}
            marginTop={15}
            appearance="primary"
            intent="success"
            iconBefore="add"
            onClick={() => {
              clearClaim()
              setShow(true)
            }}
          >
            New claim
          </Button>

          {claims && claims.length > 0 ? (
            <BoxCards>
              {claims.map((item, idx) => (
                <Pane key={idx} display="flex" flexDirection="column">
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
                      onClick={() => getClaim({ id: item.id, show: true })}
                    />
                    <IconButton
                      icon="trash"
                      intent="danger"
                      onClick={() => {
                        setDeleteItem(item)
                        setShowDelete(true)
                      }}
                    />
                  </Pane>
                  <Card
                    id={item.id}
                    title={item.title}
                    desc={item.desc}
                    img={item.img}
                    creator={item.creator}
                    date={item.start}
                  />
                </Pane>
              ))}
            </BoxCards>
          ) : (
            <EmptyState>
              <p>You have no claims.</p>
            </EmptyState>
          )}
        </BoxTable>
        <SideSheetClaim />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  padding: 2em 1em;
`

const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  color: ${(props) => props.theme.color.red};
  font-size: 1em;
`

const BoxTable = styled.div`
  @media (max-width: 1200px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1.5em;
  }
`

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  > p {
    font-size: 1.8em;
    color: #333;
  }
`

const BoxInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
`

const ButtonCenter = styled(Button)`
  display: block;
  margin: 25px auto;
  background: ${theme.color.primary};
  :hover {
    background: ${theme.color.primary} !important;
    opacity: 0.7;
  }
`
