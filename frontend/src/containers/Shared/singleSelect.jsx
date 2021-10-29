import React, { useState, useCallback, useEffect } from 'react'
import { FormControl, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'

const SingleSelect = ({
  items, onChange, label, value, error, helperText,
}) => {
  const [ inputValue, setInputValue ] = useState('')
  const [ selectedItem, setSelectedItem ] = useState(value || null)

  useEffect(() => setSelectedItem(() => value), [ value ])

  const setSelectedItemsCB = useCallback((event, changedValue) => {
    if (changedValue) {
      onChange(changedValue)
      setSelectedItem(() => changedValue)
    }
  }, [ onChange ])

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
            error={ error }
            helperText={ helperText }
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
  error: false,
  helperText: '',
}

const valueValidator = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
})

SingleSelect.propTypes = {
  items: PropTypes.arrayOf(valueValidator),
  value: valueValidator,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  error: PropTypes.bool,
}

export default SingleSelect
