import React, { useState } from 'react'
import AsyncSelect, { makeAsyncSelect } from 'react-select/async'
import { FilterContext } from '../../services/context'

const ContextSelect = (props) => {
  const [all, setAll] = useState(props.initialData)
  const getContextsForSelect = async (input) => {
    if (input === '') {
      return []
    }
    const result = await FilterContext(input)
    const data = result.data.map((item) => {
      return { label: item.name, value: item._key }
    })
    // eliminate dupes
    var m = {}
    for (const context of all) {
      m[context._key] = context
    }
    for (const context of result.data) {
      m[context._key] = context
    }
    setAll(Object.keys(m).map((k) => m[k]))
    return data
  }

  // Setup initial contexts
  var initialContexts = []
  if (props.initialData) {
    initialContexts = props.initialData.map((item) => {
      return { label: item.name, value: item._key }
    })
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
        if (e !== null) {
          var newContexts = []
          for (const option of e) {
            const newContext = all.find((item) => item._key === option.value)
            newContexts = newContexts.concat(newContext)
            props.setSelectData(newContexts)
            //[] -> [{ context }]
          }
        }
      }}
      loadOptions={(e) => getContextsForSelect(e)}
      //cacheOptions
      defaultValue={initialContexts}
    />
  )
}
export default ContextSelect
