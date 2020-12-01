import React, { useState, useCallback } from 'react'
import { FormControl, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'

export default function SingleSelect({
  items, onChange, label, value,
}) {
  const [ inputValue, setInputValue ] = useState('')
  const [ selectedItem, setSelectedItem ] = useState(value || null)

  const setSelectedItemsCB = useCallback((event, changedValue) => {
    if (changedValue) {
      onChange(changedValue)
      setSelectedItem(() => changedValue)
    }
  }, [ ])

  return (
    <FormControl variant='outlined' className='drop-down-bar'>
      <Autocomplete
        value={ selectedItem }
        getOptionSelected={ (option) => option.title }
        inputValue={ inputValue }
        clearOnBlur
        noOptionsText='no matches found'
        onInputChange={ (event, changedInput) => {
          if (changedInput === '') {
            onChange(null)
            setSelectedItem(() => null)
          }
          setInputValue(changedInput)
        } }
        onChange={ setSelectedItemsCB }
        clearOnEscape
        options={ items }
        getOptionLabel={ (option) => option.title }
        renderInput={ (params) => (
          <TextField
            { ...params }
            margin='dense'
            label={ label || null }
            variant='outlined'
          />
        ) }
        renderOption={ (option) => <span className='para light'>{option.title}</span> }
        disableListWrap
      />
    </FormControl>
  )
}

SingleSelect.defaultProps = {
  value: null,
  items: [],
  label: '',
}

const valueValidator = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
})

SingleSelect.propTypes = {
  items: PropTypes.arrayOf(valueValidator),
  value: valueValidator,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}
