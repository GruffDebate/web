import React, { useState } from 'react'
import AsyncSelect, { makeAsyncSelect } from 'react-select/async'
import { FilterContext } from '../../services/context'

const ContextSelect = (props) => {
  const getContextsForSelect = async (input) => {
    const result = await FilterContext(input)
    const data = result.data.map((item) => {
      return { label: item.name, value: item._key }
    })
    return data
  }

  return (
    <AsyncSelect
      styles={{
        singleValue: (base) => ({
          ...base,
          padding: 5,
          borderRadius: 5,
          background: 'gray',
          color: 'white',
          display: 'flex',
        }),
      }}
      isMulti
      onChange={(e) => {
        // eslint-disable-next-line react/prop-types
        props.setSelectData([...props.selectData, ...e])
      }}
      loadOptions={(e) => getContextsForSelect(e)}
      cacheOptions
      defaultOptions
    />
  )
}

export default ContextSelect
