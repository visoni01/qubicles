import React, { useState, useCallback, useEffect } from 'react'
import {
  Grid, FormControl,
  RadioGroup, FormControlLabel, Radio, InputBase, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import SingleSelect from '../../../../Shared/singleSelect'
import { jobCategoriesOnlyFetchStart } from '../../../../../redux-saga/redux/actions'

export default function InformationTab({
  informationDetails, setInformationDetails,
}) {
  const [ priceType, setPriceType ] = useState('price')
  const { jobCategoriesOnly, isLoading, error } = useSelector((state) => state.jobCategoriesOnly)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading && _.isEmpty(jobCategoriesOnly) && !error) {
      dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: '' }))
    }
  })

  const setInformationSectionField = useCallback((e) => {
    // to persist event used in many places
    // https://reactjs.org/docs/legacy-event-pooling.html
    e.persist()

    setInformationDetails((current) => {
      let updatedFields = {}
      if (e.target.name === 'price') {
        updatedFields = {
          [ e.target.name ]: Number(e.target.value),
        }
      } else {
        updatedFields = {
          [ e.target.name ]: e.target.value,
        }
      }
      return ({
        ...current,
        ...updatedFields,
      })
    })
  }, [ setInformationDetails ])

  // Set Price Type
  const setPriceTypeCB = useCallback((e) => {
    if (e.target.value === 'free') {
      setInformationDetails((current) => ({
        ...current,
        price: 0,
      }))
    }
    setPriceType(e.target.value)
  }, [ setInformationDetails ])

  // Set course category
  const setCourseCategory = useCallback((val) => {
    setInformationDetails((current) => ({
      ...current,
      category: val,
    }))
  }, [ setInformationDetails ])

  return (
    <div className='mt-30'>
      <div className='info-tab-section'>
        <h3 className='h3 mb-10'> Course Title </h3>
        <TextField
          className='is-fullwidth'
          value={ informationDetails.title }
          onChange={ setInformationSectionField }
          margin='dense'
          autoComplete='off'
          placeholder='Title'
          name='title'
          variant='outlined'
        />
      </div>

      <Grid container spacing={ 4 }>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 6 }>
          <div className='info-tab-section'>
            <h3 className='h3 mb-10'> Category </h3>
            <div>
              <FormControl variant='outlined' className='drop-down-bar'>
                <SingleSelect
                  items={ jobCategoriesOnly.map((item) => ({ id: item.categoryId, title: item.categoryTitle })) }
                  onChange={ (selectedValue) => setCourseCategory(selectedValue) }
                  value={ (informationDetails.category) ? {
                    id: informationDetails.category.id,
                    title: informationDetails.category.title,
                  } : null }
                  label='Choose Category'
                />
              </FormControl>
            </div>
          </div>
        </Grid>
        <Grid item xl={ 5 } lg={ 5 } md={ 6 } sm={ 6 }>
          <div className='info-tab-section'>
            <h3 className='h3 mb-10'> Price </h3>
            <RadioGroup
              className='radio-buttons'
              value={ priceType }
              onChange={ setPriceTypeCB }
            >
              <div className='display-inline-flex'>
                <FormControlLabel
                  value='price'
                  control={ <Radio /> }
                  label='Price'
                  aria-required
                />
                <TextField
                  variant='outlined'
                  margin='dense'
                  type='number'
                  InputProps={ { inputProps: { min: 0, step: 1 } } }
                  placeholder='Eg 15'
                  className='para filter-input'
                  value={ informationDetails.price }
                  name='price'
                  onChange={ setInformationSectionField }
                  disabled={ !(priceType === 'price') }
                />
                <span className='para sz-lg light input-label'>
                  {`QBE (${ informationDetails.price } USD)`}
                </span>
                <FormControlLabel value='free' control={ <Radio /> } label='Free' />
              </div>
            </RadioGroup>

          </div>
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 6 }>
          <div className='info-tab-section'>
            <h3 className='h3 mb-10'> Visibility </h3>
            <RadioGroup
              className='radio-buttons'
              value={ informationDetails.visibility }
              name='visibility'
              onChange={ setInformationSectionField }
            >
              <div className='buttons-inline'>
                <FormControlLabel value='public' control={ <Radio /> } label='Public' />
                <FormControlLabel value='private' control={ <Radio /> } label='Private' />
              </div>
            </RadioGroup>
          </div>
        </Grid>
      </Grid>

      <div className='info-tab-section'>
        <h3 className='h3 mb-10'> Description </h3>
        <h4 className='h4 mb-10 mt-30'> Summary </h4>
        <TextField
          className='is-fullwidth'
          name='summary'
          value={ informationDetails.summary }
          onChange={ setInformationSectionField }
          placeholder='Add a short description outlining the scope of the course'
          multiline
          rows={ 8 }
          margin='dense'
          autoComplete='off'
          variant='outlined'
        />
        <h4 className='h4 mb-10 mt-30'> Goals </h4>
        <TextField
          className='is-fullwidth'
          name='goals'
          value={ informationDetails.goals }
          onChange={ setInformationSectionField }
          placeholder='Describe the goals of the course'
          multiline
          rows={ 8 }
          margin='dense'
          autoComplete='off'
          variant='outlined'
        />
        <h4 className='h4 mb-10 mt-30'> Outcomes </h4>
        <TextField
          className='is-fullwidth'
          name='outcomes'
          value={ informationDetails.outcomes }
          onChange={ setInformationSectionField }
          placeholder='Describe the outcomes of this course in detail'
          multiline
          rows={ 8 }
          margin='dense'
          autoComplete='off'
          variant='outlined'
        />
        <h4 className='h4 mb-10 mt-30'> Prerequisites </h4>
        <TextField
          className='is-fullwidth'
          name='preRequisites'
          value={ informationDetails.preRequisites }
          onChange={ setInformationSectionField }
          placeholder='Let the students know it there are any prerequisites for this course'
          multiline
          rows={ 8 }
          margin='dense'
          autoComplete='off'
          variant='outlined'
        />
        <h4 className='h4 mb-10 mt-30'> Required Courses </h4>
        <Grid container spacing={ 2 }>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 6 }>
            <div className='search-input'>
              <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
              <InputBase
                placeholder='Search Courses'
                className='input-field'
              />
            </div>
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 6 }>
            <span className='para light'>
              {`Users must have passed these
            courses before they can enroll in your course`}
            </span>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

InformationTab.propTypes = {
  informationDetails: PropTypes.shape({
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.number,
    visibility: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    goals: PropTypes.string.isRequired,
    outcomes: PropTypes.string.isRequired,
    preRequisites: PropTypes.string.isRequired,
    requiredCourses: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  setInformationDetails: PropTypes.func.isRequired,
}
