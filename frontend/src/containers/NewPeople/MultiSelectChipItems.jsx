import React, { useState, useCallback } from 'react'
import {
  FormControl, TextField, Chip,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import _ from 'lodash'
import PropTypes from 'prop-types'

export default function MultiSelectChipItems({
  items, label, smallTag, selectedItems, setSelectedItems,
}) {
  const [ inputValue, setInputValue ] = useState('')
  const setSelectedItemsCB = useCallback((event, value) => {
    if (value) {
      setSelectedItems((state) => _.unionBy(state, [ value ], 'id'))
    }
  }, [ setSelectedItems ])

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
            />
          ) }
          renderOption={ (option) => <span className='para light'>{option.title}</span> }
          disableListWrap
        />
      </FormControl>
      <div className={ `tags-set ${ smallTag ? 'small' : '' }` }>
        {selectedItems.map((tag) => (
          <Chip
            size={ smallTag ? 'small' : 'medium' }
            key={ tag.id }
            onDelete={ () => setSelectedItems((state) => state.filter((skill) => skill.id !== tag.id)) }
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
  selectedItems: [],
  setSelectedItems: null,
}

MultiSelectChipItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),

  label: PropTypes.string,
  smallTag: PropTypes.bool,
  selectedItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),
  setSelectedItems: PropTypes.func,
}
