import React, { useState, useCallback, useEffect } from 'react'
import {
  FormControl, TextField, Avatar, CircularProgress, Checkbox, Button,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MultiSelectLinkItems = ({
  items, label, onChange, initialData, textLinkBase, onTextChange, loading,
  bottomActionText, bottomAction, inputText, showThumbnailImage, selectedLabel, notSelectedLabel,
}) => {
  const [ inputValue, setInputValue ] = useState('')
  const [ , setSelectedItems ] = useState(initialData || [])
  const [ initialDataSet, setInitialDataSet ] = useState(false)

  useEffect(() => {
    if (!initialDataSet && !_.isEmpty(initialData)) {
      setSelectedItems(initialData)
      setInitialDataSet(true)
    }
  }, [ initialData, initialDataSet ])

  const setSelectedItemsCB = useCallback((event, value) => {
    if (value && !_.isEqual(value.id, -1)) {
      if (!value.status) {
        setSelectedItems((state) => {
          const updatedState = _.unionBy(state, [ value ], 'id')
          onChange(updatedState)
          return (updatedState)
        })
      } else {
        setSelectedItems((state) => {
          const updatedState = state.filter((stateItem) => stateItem.id !== value.id)
          onChange(updatedState)
          setSelectedItems(updatedState)
        })
      }
    } else if (value && _.isEqual(value.id, -1) && !loading) {
      bottomAction()
    }
    setInputValue(inputText)
  }, [ setSelectedItems, onChange, bottomAction, inputText, loading ])

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
          options={ bottomActionText ? [ ...items, { id: -1, title: bottomActionText, status: false } ] : items }
          getOptionLabel={ (option) => option.title }
          disableCloseOnSelect
          loading={ loading }
          groupBy={ (option) => option.status }
          renderGroup={ (option) => (
            <div>
              <div className='group-heading'>
                {option.group === true
                  ? (
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
                  )
                  : <div className='para light'>{notSelectedLabel}</div>}
              </div>
              {option.children}
            </div>
          ) }
          renderInput={ (params) => (
            <TextField
              { ...params }
              margin='dense'
              label={ label || null }
              variant='outlined'
              onChange={ onTextChange }
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
              {option.id !== -1 && (
                <div className='checkboxes'>
                  <Checkbox
                    checked={ option.status }
                  />
                </div>
              )}
              <div
                key={ option.id }
                className='display-inline-flex justify-between mt-5 mb-5 align-items-center is-fullwidth'
              >
                {showThumbnailImage && option.id !== -1
                && (
                <Avatar
                  variant='square'
                  className='mr-10 ml-5 item-image'
                  alt={ option.title }
                  src={ option.image }
                />
                )}
                <div className='is-fullwidth'>
                  {option.id !== -1 && textLinkBase && (
                    <Link
                      to={ `${ textLinkBase }/${ option.id }` }
                      target='_blank'
                      onClick={ (event) => event.stopPropagation() }
                    >
                      <span className='primary-text-link item-title'>{option.title}</span>
                    </Link>
                  )}
                  {option.id === -1
                  && (
                  <span className={ `view-more ${ loading ? 'para light' : 'primary-text-link item-title' }` }>
                    {option.title}
                  </span>
                  )}
                  {option.id !== -1 && !textLinkBase && <span className='para item-title'>{option.title}</span>}
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
}

export default MultiSelectLinkItems
