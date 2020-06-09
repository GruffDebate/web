import React, { Component, useState } from 'react'
import Select from 'react-select'
import AsyncSelect, { makeAsyncSelect } from 'react-select/async'
import { useStore, useActions } from '../../lib/store'

let startOptions = {}

const ContextSelect = (props) => {
  //const filter = useActions((actions) => actions.context.filter);
  const filter = useActions((actions) => actions.context.list)
  const createContext = useActions((actions) => actions.context.create)
  const contexts = useStore((state) => state.context.contexts)
  const [data, setData] = useState()

  const promiseOptions = (inputValue) => {
    console.log('---------input value: ' + inputValue)
    filter(inputValue).then((resp) => {
      let options = contextOptions()
      console.log('------------ContextOptions:')
      console.dir(options)
      setData(options)
    })
    //console.log(`----------State: ${actions.context.contexts}`);
  }

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '')
    filter(newValue)
  }

  const contextOptions = () => {
    var optionsDirty = contexts
    console.log('------------optionsDirty:')
    console.dir(optionsDirty)
    let options = []
    optionsDirty.map(function(option) {
      options.push({ value: option._key, label: option.title + ' - ' + option.desc })
    })
    return options
  }

  const filterOptions = (options, filter, currentValues) => {
    // Do no filtering, just return all options
    console.log('options =', options)
    return options
  }

  //const ContextValue = ({ children, ...props }) => (
  //  <components.SingleValue {...props}>{children}</components.SingleValue>
  //);

  const ContextValue = ({ children, ...props }) => {
    console.log('children: ' + children)
    return <components.SingleValue {...props}>{children}</components.SingleValue>
  }

  return (
    <Select
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
      //components={{ ContextValue }}
      isMulti
      //isSearchable
      //defaultOptions={startOptions}
      //loadOptions={promiseOptions}
      filterOptions={filterOptions}
      options={data}
      onInputChange={promiseOptions}
    />
  )
}

export default ContextSelect
