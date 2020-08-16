import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { cleanUrl } from '../../utils/helper'

const ClaimParents = (props) => {
  return (
    <>
      {props.parents && (
        <ClaimParentList>
          <Parent data={props.parents ? props.parents : []}></Parent>
        </ClaimParentList>
      )}
    </>
  )
}

export default ClaimParents

const ClaimParentList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`

const Parent = ({ data }) =>
  data.map((item, idx) => (
    <ParentContainer parent={item}>
      <Link
        key={idx}
        as={`/c/${cleanUrl(item.targetClaim ? item.targetClaim.title : item.targetArg.title)}__${
          item.targetClaimId ? item.targetClaimId : item.targetArgId
        }`}
        href={`/c?id=${item.targetClaimId ? item.targetClaimId : item.targetArgId}`}
      >
        <h3>
          {item.pro ? 'Supports' : 'Opposes'}:{' '}
          {item.targetClaim.title ? item.targetClaim.title : item.targetArg.title}
        </h3>
      </Link>
    </ParentContainer>
  ))

const ParentContainer = styled.div`
  min-height: 108px;
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
  background-color: #fff;
  margin-bottom: 0.5em;

  &:hover {
    box-shadow: ${(props) => (props.parent.pro ? '0 0 0.3rem 0 #41cc90' : '0 0 0.3rem 0 #ff725c')};
  }
`
