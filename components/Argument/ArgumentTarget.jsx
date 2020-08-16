import React, { useEffect, useState } from 'react'
import { Icon } from 'evergreen-ui'
import styled from 'styled-components'
import Link from 'next/link'
import { cleanUrl } from '../../utils/helper'

const ArgumentTarget = (props) => {
  return (
    <>
      {props.argument && props.argument.targetClaim && (
        <TargetClaim claim={props.argument.targetClaim}></TargetClaim>
      )}
      {props.argument && props.argument.targetArgument && (
        <TargetArgument argument={props.argument.targetArgument}></TargetArgument>
      )}
      <InferenceArrow isPro={props.argument.pro} />
    </>
  )
}

export default ArgumentTarget

const TargetClaim = ({ claim }) => (
  <TargetContainer parent={claim}>
    <Link
      key="TargetClaim"
      as={`/c/${cleanUrl(claim.title)}__${claim.id}`}
      href={`/c?id=${claim.id}`}
    >
      <h3>{claim.title}</h3>
    </Link>
  </TargetContainer>
)

const TargetArgument = ({ argument }) => (
  <TargetContainer parent={argument}>
    <Link
      key="TargetArgument"
      as={`/a/${cleanUrl(argument.title)}__${argument.id}`}
      href={`/a?id=${argument.id}`}
    >
      <h3>{argument.title}</h3>
    </Link>
  </TargetContainer>
)

const TargetContainer = styled.div`
  min-height: 108px;
  box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
  background-color: #fff;
  margin-bottom: 0.5em;
`

const InferenceArrow = ({ isPro }) => (
  <ArrowBox>
    <Icon icon="arrow-up" color={isPro ? 'success' : 'danger'} size={40} />
    <br />
    {isPro ? 'Supports' : 'Opposes'}
  </ArrowBox>
)

const ArrowBox = styled.div`
  text-align: center;
  width: 50%;
  margin: 0 auto;
`
