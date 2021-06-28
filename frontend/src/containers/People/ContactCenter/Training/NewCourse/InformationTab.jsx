/* eslint-disable complexity */
import React, { useState, useCallback, useEffect } from 'react'
import {
  Grid, FormControl,
  RadioGroup, FormControlLabel, Radio, TextField, Select, debounce,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import SingleSelect from '../../../../Shared/singleSelect'
import {
  jobCategoriesOnlyFetchStart, requiredCoursesFetchStart, resetRequiredCoursesReducer,
} from '../../../../../redux-saga/redux/actions'
import { errorsPropTypes, informationSectionPropType } from './propTypes'
import MultiSelectLinkItems from '../../../../Shared/multiSelectLinkItems'
import { VIEW_COURSE_ROUTE } from '../../../../../routes/routesPath'
import { formatDate } from '../../../../../utils/common'
import { noOfRequiredCoursesPerFetch } from '../../constants'

export default function InformationTab({
  informationSection, setInformationSection, errors,
}) {
  const [ priceType, setPriceType ] = useState('price')
  const { jobCategoriesOnly, isLoading, error } = useSelector((state) => state.jobCategoriesOnly)
  const [ selectedCategory, setSelectedCategory ] = useState(null)
  const {
    allCourses, searchKeyword, count, offset, isLoading: coursesLoading,
  } = useSelector((state) => state.requiredCourses)

  const dispatch = useDispatch()
  const availableLanguages = [
    'English', 'French', 'Spanish',
  ]

  useEffect(() => () => dispatch(resetRequiredCoursesReducer()), [ dispatch ])

  useEffect(() => {
    if (_.isNull(coursesLoading) && _.isEmpty(allCourses)) {
      dispatch(requiredCoursesFetchStart({ searchKeyword: '', offset: 0 }))
    }
  }, [ isLoading, dispatch, coursesLoading, allCourses ])

  useEffect(() => {
    if (!isLoading && _.isEmpty(jobCategoriesOnly) && !error) {
      dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: '' }))
    }
  }, [ isLoading, dispatch, error, jobCategoriesOnly ])

  useEffect(() => {
    if (jobCategoriesOnly.length > 0 && informationSection.category) {
      const filteredCategory = jobCategoriesOnly.filter((categ) => categ.categoryId === informationSection.category)
      setSelectedCategory(filteredCategory.length === 1 ? filteredCategory[ 0 ] : null)
      setInformationSection((current) => ({
        ...current,
        categoryTitle: filteredCategory.length === 1 ? filteredCategory[ 0 ].categoryTitle : '',
      }))
    }
  }, [ jobCategoriesOnly, informationSection.category, setInformationSection ])

  const setInformationSectionField = useCallback((e) => {
    // to persist event used in many places
    // https://reactjs.org/docs/legacy-event-pooling.html
    e.persist()

    setInformationSection((current) => {
      let updatedFields = {}
      if (e.target.name === 'price') {
        updatedFields = {
          [ e.target.name ]: e.target.value === '' ? '' : Number(e.target.value),
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
  }, [ setInformationSection ])

  // Set Price Type
  const setPriceTypeCB = useCallback((e) => {
    if (e.target.value === 'free') {
      setInformationSection((current) => ({
        ...current,
        price: 0,
      }))
    }
    if (e.target.value === 'price') {
      setInformationSection((current) => ({
        ...current,
        price: 1,
      }))
    }
    setPriceType(e.target.value)
  }, [ setInformationSection ])

  // Set course category
  const setCourseCategory = useCallback((val) => {
    setInformationSection((current) => ({
      ...current,
      category: val && val.id,
    }))
    const categ = val ? {
      categoryId: val.id,
      categoryTitle: val.title,
    } : null
    setSelectedCategory(categ)
  }, [ setInformationSection ])

  // Search courses
  const searchCourses = useCallback(debounce((nextValue) => {
    dispatch(requiredCoursesFetchStart({
      searchKeyword: nextValue,
      offset: 0,
    }))
  }, 500), [ dispatch ])

  // Set required courses
  const setRequiredCourses = useCallback((requiredCourses) => {
    setInformationSection((current) => ({
      ...current,
      requiredCourses: requiredCourses.map((course) => ({
        courseId: course.id,
        courseTitle: course.title,
        courseImage: course.image,
        creatorName: course.creatorName,
        createdAt: course.createdAt,
        subtitle: course.subtitle,
      })),
    }))
  }, [ setInformationSection ])

  // Fetch more courses
  const viewMoreCourses = useCallback(() => {
    dispatch(requiredCoursesFetchStart({
      searchKeyword,
      offset: offset + noOfRequiredCoursesPerFetch,
    }))
  }, [ dispatch, searchKeyword, offset ])

  return (
    <div className='mt-30'>
      <div className='info-tab-section'>
        <h3 className='h3 mb-10'> Course Title </h3>
        <TextField
          className='is-fullwidth'
          value={ informationSection.title }
          onChange={ setInformationSectionField }
          margin='dense'
          autoComplete='off'
          placeholder='Title'
          name='title'
          variant='outlined'
          error={ errors && errors.title }
          helperText={ errors && errors.title ? errors.title.message : '' }
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
                  value={ (selectedCategory) ? {
                    id: selectedCategory.categoryId,
                    title: selectedCategory.categoryTitle,
                  } : null }
                  label='Choose Category'
                  error={ errors && errors.categoryTitle }
                  helperText={ errors && errors.categoryTitle ? errors.categoryTitle.message : '' }
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
                  value={ informationSection.price }
                  name='price'
                  onChange={ setInformationSectionField }
                  disabled={ !(priceType === 'price') }
                  error={ errors && errors.price }
                  helperText={ errors && errors.price ? errors.price.message : '' }
                />
                <span className='para sz-lg light input-label'>
                  {`QBE (${ informationSection.price } USD)`}
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
              value={ informationSection.visibility }
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

      <Grid container spacing={ 4 }>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 6 }>
          <div className='info-tab-section'>
            <h3 className='h3 mb-10'> Language </h3>
            <Select
              className='is-fullwidth'
              name='language'
              native
              margin='dense'
              variant='outlined'
              value={ informationSection.language }
              onChange={ setInformationSectionField }
              error={ errors && errors.language }
            >
              {availableLanguages.map((language) => (
                <option key={ language } value={ language } className='para sz-xl'>
                  {language}
                </option>
              ))}
            </Select>
          </div>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 6 }>
          <div className='info-tab-section'>
            <h3 className='h3'> Required Courses </h3>
            <MultiSelectLinkItems
              items={
                _.isEmpty(_.unionBy(informationSection && informationSection.requiredCourses, allCourses, 'courseId'))
                  ? []
                  : _.unionBy(informationSection && informationSection.requiredCourses, allCourses, 'courseId')
                    .map((course) => ({
                      id: course.courseId,
                      title: course.courseTitle,
                      subtitle: `${ course.creatorName }, ${ formatDate(course.createdAt, 'YYYY') }`,
                      image: course.courseImage,
                      status: !(informationSection.requiredCourses
                        && _.findIndex(informationSection.requiredCourses, { courseId: course.courseId }) === -1),
                      creatorName: course.creatorName,
                      createdAt: course.createdAt,
                    }))
              }
              initialData={ _.isEmpty(informationSection.requiredCourses)
                ? []
                : informationSection.requiredCourses.map((course) => ({
                  id: course.courseId,
                  title: course.courseTitle,
                  subtitle: `${ course.creatorName }, ${ formatDate(course.createdAt, 'YYYY') }`,
                  image: course.courseImage,
                  status: true,
                  creatorName: course.creatorName,
                  createdAt: course.createdAt,
                })) }
              placeholderOnBlur={ informationSection.requiredCourses
                && `${ informationSection.requiredCourses.length } ${ informationSection.requiredCourses.length === 1
                  ? 'Course' : 'Courses' } Selected` }
              placeholderOnFocus='Search Courses'
              onChange={ setRequiredCourses }
              onTextChange={ (e) => searchCourses(e.target.value) }
              loading={ coursesLoading }
              textLinkBase={ `${ VIEW_COURSE_ROUTE }` }
              bottomActionText={ allCourses.length < count ? 'View More...' : '' }
              bottomAction={ viewMoreCourses }
              inputText={ searchKeyword }
              showThumbnailImage
              selectedLabel='Selected Courses'
              notSelectedLabel='Search'
              disableAutocomplete
            />
          </div>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 6 }>
          <div className='info-tab-section pt-30'>
            <span className='para light'>
              Users must have passed these courses before they can enroll in your course
            </span>
          </div>
        </Grid>
      </Grid>

      <div className='info-tab-section'>
        <h3 className='h3 mb-10'> Description </h3>
        <h4 className='h4 mb-10 mt-30'> Summary </h4>
        <TextField
          className='is-fullwidth'
          name='description'
          value={ informationSection.description }
          onChange={ setInformationSectionField }
          placeholder='Add a short description outlining the scope of the course'
          multiline
          rows={ 8 }
          margin='dense'
          autoComplete='off'
          variant='outlined'
          error={ errors && errors.summary }
          helperText={ errors && errors.summary ? errors.summary.message : '' }
        />
        <h4 className='h4 mb-10 mt-30'> Goals </h4>
        <TextField
          className='is-fullwidth'
          name='goals'
          value={ informationSection.goals }
          onChange={ setInformationSectionField }
          placeholder='Describe the goals of the course'
          multiline
          rows={ 8 }
          margin='dense'
          autoComplete='off'
          variant='outlined'
          error={ errors && errors.goals }
          helperText={ errors && errors.goals ? errors.goals.message : '' }
        />
        <h4 className='h4 mb-10 mt-30'> Outcomes </h4>
        <TextField
          className='is-fullwidth'
          name='outcomes'
          value={ informationSection.outcomes }
          onChange={ setInformationSectionField }
          placeholder='Describe the outcomes of this course in detail'
          multiline
          rows={ 8 }
          margin='dense'
          autoComplete='off'
          variant='outlined'
          error={ errors && errors.outcomes }
          helperText={ errors && errors.outcomes ? errors.outcomes.message : '' }
        />
        <h4 className='h4 mb-10 mt-30'> Requirements </h4>
        <TextField
          className='is-fullwidth'
          name='requirements'
          value={ informationSection.requirements }
          onChange={ setInformationSectionField }
          placeholder='Let the students know it there are any requirements for this course'
          multiline
          rows={ 8 }
          margin='dense'
          autoComplete='off'
          variant='outlined'
          error={ errors && errors.requirements }
          helperText={ errors && errors.requirements ? errors.requirements.message : '' }
        />
      </div>
    </div>
  )
}

InformationTab.propTypes = {
  informationSection: informationSectionPropType.isRequired,
  setInformationSection: PropTypes.func.isRequired,
  errors: errorsPropTypes.isRequired,
}
