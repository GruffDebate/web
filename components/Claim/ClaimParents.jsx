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
    <Link
      key={idx}
      as={`/c/${cleanUrl(item.targetClaim ? item.targetClaim.title : item.targetArg.title)}__${
        item.targetClaimId ? item.targetClaimId : item.targetArgId
      }`}
      href={`/c?id=${item.targetClaimId ? item.targetClaimId : item.targetArgId}`}
    >
      <h3>{item.targetClaim.title ? item.targetClaim.title : item.targetArg.title}</h3>
    </Link>
  ))
