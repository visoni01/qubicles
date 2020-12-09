import React, { useState, useCallback } from 'react'
import {
  FormControl, TextField, IconButton,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function MultiSelectLinkItems({
  items, label, onChange, initialData, textLinkBase,
}) {
  const [ inputValue, setInputValue ] = useState('')
  const [ selectedItems, setSelectedItems ] = useState(initialData || [])
  const setSelectedItemsCB = useCallback((event, value) => {
    if (value) {
      setSelectedItems((state) => {
        const updatedState = _.unionBy(state, [ value ], 'id')
        if (onChange) {
          onChange(updatedState)
        }
        return (updatedState)
      })
    }
  }, [ setSelectedItems, onChange ])

  return (
    <div>
      <FormControl variant='outlined' className='drop-down-bar'>
        <Autocomplete
          getOptionSelected={ (option) => option.title }
          inputValue={ inputValue }
          noOptionsText='no match found'
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
        />
      </FormControl>
      {selectedItems && selectedItems.map((item) => (
        <div key={ item.id } className='display-inline-flex justify-between mr-10 mt-10'>
          <IconButton
            onClick={ () => setSelectedItems((state) => state.filter((filteredskill) => filteredskill.id !== item.id)) }
            className='align-self-center mr-5'
          >
            <FontAwesomeIcon className='custom-fa-icon pointer light sz-md' icon={ faTimes } />
          </IconButton>
          <div className='align-self-center'>
            {textLinkBase ? (
              <Link to={ `${ textLinkBase }/${ item.id }` } target='_blank'>
                <span className='primary-text-link'>{item.title}</span>
              </Link>
            )
              : (
                <span className='primary-text-link'>{item.title}</span>
              )}
            {item.subtitle && <p className='para light'>{item.subtitle}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

MultiSelectLinkItems.defaultProps = {
  items: [],
  label: '',
  smallTag: false,
  initialData: [],
  textLinkBase: '',
}

MultiSelectLinkItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),

  label: PropTypes.string,
  textLinkBase: PropTypes.string,
  smallTag: PropTypes.bool,
  initialData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),
  onChange: PropTypes.func.isRequired,
}
