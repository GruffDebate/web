import React, { Component } from 'react';
import Select, { components } from 'react-select';
import Async, { makeAsyncSelect } from 'react-select/async';
import { useStore, useActions } from '../../lib/store';

let startOptions = {};

//const filter = useActions((actions) => actions.context.filter);
const filter = useActions((actions) => actions.context.list);
const createContext = useActions((actions) => actions.context.create);

const ContextValue = ({ children, ...props }) => (
  <components.ContextValue {...props}>{children}</components.ContextValue>
);

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filter(inputValue));
    }, 5000);
  });

const ContextSelect = (props) => {
  state = { inputValue: '' };
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <AsyncSelect
        styles={{
          singleValue: base => ({
            ...base,
            padding: 5,
            borderRadius: 5,
	    background: 'gray',
            color: 'white',
            display: 'flex',
          }),
        }}
        components={{ ContextValue }}
	isMulti
        isSearchable
	defaultOptions={startOptions}
	loadOptions={promiseOptions}
      />
    );
  }
}