/* eslint-disable complexity */
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
  items, label, onChange, initialData, textLinkBase, onTextChange, loading, bottomActionText, bottomAction, inputText,
  showThumbnailImage, selectedLabel, notSelectedLabel, disableAutocomplete, placeholderOnBlur, placeholderOnFocus,
  error, helperText,
}) => {
  const [ inputValue, setInputValue ] = useState('')
  const [ selectedItems, setSelectedItems ] = useState(initialData || [])
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
        const updatedState = _.unionBy(selectedItems, [ value ], 'id')
        setSelectedItems(updatedState)
        onChange(updatedState)
      } else {
        const updatedState = selectedItems.filter((stateItem) => stateItem.id !== value.id)
        setSelectedItems(updatedState)
        onChange(updatedState)
      }
    }
    setInputValue(inputText)
  }, [ setSelectedItems, onChange, inputText, selectedItems ])

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
          noOptionsText='No match found'
          onInputChange={ (event, value) => setInputValue(value) }
          onChange={ setSelectedItemsCB }
          clearOnEscape
          // eslint-disable-next-line no-nested-ternary
          options={ bottomActionText
            ? [ ...items, { id: -1, title: '', status: 'bottom' } ] : (
              items && selectedItems && items.length === selectedItems.length
                ? [ ...items, { id: -2, title: '', status: 'no-options' } ]
                : items) }
          getOptionLabel={ (option) => option.title }
          disableCloseOnSelect
          loading={ loading }
          filterOptions={ disableAutocomplete ? (option) => option : filterOptions }
          groupBy={ (option) => option.status }
          renderGroup={ (option) => (
            <div key={ option.group }>
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
                {(option.group === false || (option.group === 'no-options' && items && items.length > 0))
                  && <div className='para light'>{notSelectedLabel}</div>}
              </div>
              {(option.group === true || option.group === false) && option.children}
              {option.group === 'no-options' && <p className='para mt-5 ml-15'>No match found</p>}
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
              error={ error }
              helperText={ helperText }
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
                <Checkbox checked={ option.status } />
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
  error: false,
  helperText: '',
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
  helperText: PropTypes.string,
  error: PropTypes.bool,
}

export default MultiSelectLinkItems
