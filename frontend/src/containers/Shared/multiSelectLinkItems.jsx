import React, { useState, useCallback, useEffect } from 'react'
import {
  FormControl, TextField, Avatar, CircularProgress, Checkbox, Button,
} from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const filterOptions = createFilterOptions()

const MultiSelectLinkItems = ({
  items, label, onChange, initialData, textLinkBase, onTextChange, loading,
  bottomActionText, bottomAction, inputText, showThumbnailImage, selectedLabel, notSelectedLabel, disableAutocomplete,
  placeholderOnBlur, placeholderOnFocus,
}) => {
  const [ inputValue, setInputValue ] = useState('')
  const [ , setSelectedItems ] = useState(initialData || [])
  const [ initialDataSet, setInitialDataSet ] = useState(false)
  const [ textfieldFocus, setTextfieldFocus ] = useState(false)

  useEffect(() => {
    if (!initialDataSet && !_.isEmpty(initialData)) {
      setSelectedItems(initialData)
      setInitialDataSet(true)
    }
  }, [ initialData, initialDataSet ])

  const setSelectedItemsCB = useCallback((event, value) => {
    if (value) {
      if (!value.status) {
        setSelectedItems((state) => {
          const updatedState = _.unionBy(state, [ value ], 'id')
          onChange(updatedState)
          return updatedState
        })
      } else {
        setSelectedItems((state) => {
          const updatedState = state.filter((stateItem) => stateItem.id !== value.id)
          onChange(updatedState)
          return updatedState
        })
      }
    }
    setInputValue(inputText)
  }, [ setSelectedItems, onChange, inputText ])

  const clearAll = useCallback(() => {
    setSelectedItems([])
    onChange([])
  }, [ onChange ])

  return (
    <div>
      <FormControl variant='outlined' className='drop-down-bar'>
        <Autocomplete
          value={ null }
          getOptionSelected={ (option) => option.title }
          inputValue={ inputValue }
          clearOnBlur={ false }
          noOptionsText='no match found'
          onInputChange={ (event, value) => setInputValue(value) }
          onChange={ setSelectedItemsCB }
          clearOnEscape
          options={ bottomActionText ? [ ...items, { id: -1, title: '', status: 'bottom' } ] : items }
          getOptionLabel={ (option) => option.title }
          disableCloseOnSelect
          loading={ loading }
          filterOptions={ disableAutocomplete ? (option) => option : filterOptions }
          groupBy={ (option) => option.status }
          renderGroup={ (option) => (
            <div>
              <div className='group-heading'>
                {option.group === true && (
                  <div className='display-inline-flex is-fullwidth justify-between align-items-center'>
                    <div className='para light'>{selectedLabel}</div>
                    <Button
                      onClick={ clearAll }
                      classes={ {
                        root: 'button-primary-text light',
                        label: 'button-primary-text-label primary-text-link',
                      } }
                    >
                      Clear
                    </Button>
                  </div>
                )}
                {option.group === false && <div className='para light'>{notSelectedLabel}</div>}
              </div>
              {(option.group === true || option.group === false) && option.children}
              {bottomActionText && option.group === 'bottom' && (
                <div className='view-more'>
                  <Button
                    onClick={ bottomAction }
                    disabled={ loading }
                    classes={ {
                      root: 'button-primary-text light',
                      label: 'button-primary-text-label primary-text-link',
                    } }
                  >
                    {bottomActionText}
                  </Button>
                </div>
              )}
            </div>
          ) }
          renderInput={ (params) => (
            <TextField
              { ...params }
              margin='dense'
              label={ label || null }
              placeholder={ textfieldFocus ? placeholderOnFocus : placeholderOnBlur }
              variant='outlined'
              className={ `textfield ${ !textfieldFocus ? 'blur' : '' }` }
              onChange={ onTextChange }
              onBlur={ () => setTextfieldFocus(false) }
              onFocus={ () => setTextfieldFocus(true) }
              InputProps={ {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={ 20 } /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              } }
            />
          ) }
          renderOption={ (option) => (
            <>
              <div className='checkboxes'>
                <Checkbox
                  checked={ option.status }
                />
              </div>
              <div
                key={ option.id }
                className='display-inline-flex justify-between mt-5 mb-5 align-items-center is-fullwidth'
              >
                {showThumbnailImage && (
                <Avatar
                  variant='square'
                  className='mr-10 ml-5 item-image'
                  alt={ option.title }
                  src={ option.image }
                />
                )}
                <div className='is-fullwidth'>
                  {textLinkBase && (
                    <Link
                      to={ `${ textLinkBase }/${ option.id }` }
                      target='_blank'
                      onClick={ (event) => event.stopPropagation() }
                    >
                      <span className='primary-text-link item-title'>{option.title}</span>
                    </Link>
                  )}
                  {!textLinkBase && <span className='para item-title'>{option.title}</span>}
                  <p className='para light'>{option.subtitle}</p>
                </div>
              </div>
            </>
          ) }
          classes={ {
            option: 'item-option-padding',
            popper: 'popper',
          } }
        />
      </FormControl>
    </div>
  )
}

MultiSelectLinkItems.defaultProps = {
  items: [],
  label: '',
  smallTag: false,
  initialData: [],
  textLinkBase: '',
  onTextChange: () => {},
  loading: false,
  bottomAction: () => {},
  bottomActionText: '',
  inputText: '',
  showThumbnailImage: false,
  selectedLabel: 'Selected',
  notSelectedLabel: 'Available',
  disableAutocomplete: false,
  placeholderOnBlur: '',
  placeholderOnFocus: '',
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
  onTextChange: PropTypes.func,
  loading: PropTypes.bool,
  bottomAction: PropTypes.func,
  bottomActionText: PropTypes.string,
  inputText: PropTypes.string,
  showThumbnailImage: PropTypes.bool,
  selectedLabel: PropTypes.string,
  notSelectedLabel: PropTypes.string,
  disableAutocomplete: PropTypes.bool,
  placeholderOnBlur: PropTypes.string,
  placeholderOnFocus: PropTypes.string,
}

export default MultiSelectLinkItems
