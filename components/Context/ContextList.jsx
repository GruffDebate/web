import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { cleanUrl } from '../../utils/helper'

const ContextList = (props) => {
  return (
    <>
      {props.contexts && (
        <Contexts>
          <Context data={props.contexts ? props.contexts : []}></Context>
        </Contexts>
      )}
    </>
  )
}

export default ContextList

const Contexts = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`

const ContextLink = styled.a`
  background-color: #1070ca;
  color: white;
  padding: 5px 10px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
`

const Context = ({ data }) =>
  data.map((item, idx) => (
    <ContextLink href={item.url} target="_blank">
      {item.name}
    </ContextLink>
  ))
