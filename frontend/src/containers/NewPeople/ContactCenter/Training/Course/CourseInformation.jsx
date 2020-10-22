import React, { useState, useCallback } from 'react'
import {
  Box, Tabs, Tab, InputBase, FormControl, InputLabel, Select, Grid, RadioGroup, FormControlLabel, Radio, TextareaAutosize,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const CourseInformation = () => {
  const [ activeTab, setActiveTab ] = useState(0)
  const [ selectedCategory, setCategory ] = useState('')
  const [ price, setPrice ] = useState('')
  const [ priceType, setPriceType ] = useState('price')

  // Course Price
  const setPriceCB = useCallback((e) => {
    setPrice(e.target.value)
  })

  // Set Price Type
  const setPriceTypeCB = useCallback((e) => {
    if (e.target.value === 'free') {
      setPrice(0)
    }
    setPriceType(e.target.value)
  }, [])

  // Course Categories
  const availableCategories = [ 'Customer Service', 'Phone Calling', 'Email Support', 'Active Sales', 'Agent Support' ]
  const setCategoryCB = useCallback((e) => {
    setCategory(e.target.value)
  }, [])

  return (

    <Box className='box new-course-wrapper'>
      <h2> New Course </h2>
      <div className='people-active-tabs'>
        <Tabs
          value={ activeTab }
          onChange={ (_, tab) => setActiveTab(tab) }
        >
          <Tab label='Information' className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' } />
          <Tab label='Content' className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' } />
        </Tabs>
      </div>
      <div className='information-section'>
        <h3> Course Title </h3>
        <div className='input-box'>
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 1 }
            placeholder='Title'
          />
        </div>
      </div>

      <Grid container spacing={ 4 }>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 6 }>
          <div className='information-section'>
            <h3> Category </h3>
            <div>
              <FormControl variant='outlined' className='drop-down-bar'>
                <InputLabel>Choose category</InputLabel>
                <Select
                  native
                  label='Choose category'
                  onChange={ setCategoryCB }
                >
                  <option aria-label='None' value='' />
                  {availableCategories.map((skill) => (
                    <option key={ skill } value={ skill }>
                      {skill}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </Grid>
        <Grid item xl={ 5 } lg={ 5 } md={ 6 } sm={ 6 }>
          <div className='information-section'>
            <h3> Price </h3>
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
                <InputBase
                  placeholder='Eg 15'
                  className='filter-input'
                  value={ price }
                  onChange={ setPriceCB }
                  disabled={ !(priceType === 'price') }
                />
                <span className='input-label'>
                  {`QBE (${ price } USD)`}
                </span>
                <FormControlLabel value='free' control={ <Radio /> } label='Free' />
              </div>
            </RadioGroup>

          </div>
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 6 }>
          <div className='information-section'>
            <h3> Visibility </h3>
            <RadioGroup
              className='radio-buttons'
            >
              <div className='buttons-inline'>
                <FormControlLabel value='public' control={ <Radio /> } label='Public' />
                <FormControlLabel value='private' control={ <Radio /> } label='Private' />
              </div>
            </RadioGroup>
          </div>
        </Grid>
      </Grid>

      <div className='information-section'>
        <h3> Description </h3>
        <h4> Summary </h4>
        <div className='input-box'>
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 8 }
            placeholder='Add a short description outlining the scope of the course'
          />
        </div>
        <h4> Goals </h4>
        <div className='input-box'>
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 8 }
            placeholder='Describe the goals of the course'
          />
        </div>
        <h4> Outcomes </h4>
        <div className='input-box'>
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 8 }
            placeholder='Describe the outcomes of this course in detail'
          />
        </div>
        <h4> Prerequisites </h4>
        <div className='input-box'>
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 8 }
            placeholder='Let the students know it there are any prerequisites for this course'
          />
        </div>
        <h4> Required Courses </h4>
        <Grid container>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 6 }>
            <div className='new-input-search'>
              <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
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
    </Box>

  )
}

export default CourseInformation
