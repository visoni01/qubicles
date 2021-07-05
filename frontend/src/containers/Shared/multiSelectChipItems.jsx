import React, { useState, useCallback, useEffect } from 'react'
import {
  FormControl, TextField, Chip,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import _ from 'lodash'
import PropTypes from 'prop-types'

const MultiSelectChipItems = ({
  items, label, smallTag, onChange, initialData, error, helperText,
}) => {
  const [ inputValue, setInputValue ] = useState('')
  const [ selectedItems, setSelectedItems ] = useState(initialData || [])

  const setSelectedItemsCB = useCallback((event, value) => {
    if (value) {
      const updatedState = _.unionBy(selectedItems, [ value ], 'id')
      setSelectedItems(updatedState)
      onChange(updatedState)
      setInputValue('')
    }
  }, [ setSelectedItems, onChange, selectedItems ])

  const onDelete = useCallback((tag) => {
    const updatedState = selectedItems.filter((skill) => skill.id !== tag.id)
    setSelectedItems(updatedState)
    onChange(updatedState)
  }, [ onChange, selectedItems ])

  useEffect(() => {
    setSelectedItems(initialData)
  }, [ initialData ])

  return (
    <div>
      <FormControl variant='outlined' className='drop-down-bar'>
        <Autocomplete
          value={ null }
          getOptionSelected={ (option) => option.title }
          inputValue={ inputValue }
          clearOnBlur
          noOptionsText='no matches found'
          onInputChange={ (event, value) => setInputValue(value) }
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
      <div className={ `tags-set ${ smallTag ? 'small' : '' }` }>
        {selectedItems && selectedItems.map((tag) => (
          <Chip
            size={ smallTag ? 'small' : 'medium' }
            key={ tag.id }
            onDelete={ () => onDelete(tag) }
            label={ tag.title }
            className='tag-chip'
          />
        ))}
      </div>
    </div>
  )
}

MultiSelectChipItems.defaultProps = {
  items: [],
  label: '',
  smallTag: false,
  initialData: [],
  onChange: () => {},
  helperText: '',
  error: false,
}

MultiSelectChipItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),

  label: PropTypes.string,
  smallTag: PropTypes.bool,
  initialData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  error: PropTypes.bool,
}

export default MultiSelectChipItems
