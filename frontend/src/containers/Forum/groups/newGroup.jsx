import React, { useState, useCallback } from 'react'
import {
  Box, FormControlLabel, Grid, Radio, RadioGroup, TextareaAutosize, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'

const initialFormData = {
  title: '',
  permission: 'public',
  description: '',
}

const NewGroup = ({ handleSubmit, onCancelClick }) => {
  const [ groupData, setGroupData ] = useState(initialFormData)

  const updateData = (event) => {
    setGroupData({
      ...groupData,
      [ event.target && event.target.name ]: event.target && event.target.value,
    })
  }

  const onSubmitClick = () => {
    handleSubmit(groupData)
    setGroupData(initialFormData)
  }

  return (
    <Box className='custom-box'>
      <form>
        <Grid container spacing={ 3 }>
          <Grid item md={ 12 } sm={ 12 } xs={ 12 } className='mb-10'>
            <h2 className='h2'>
              Create new group
            </h2>
          </Grid>
          <Grid item md={ 6 } xs={ 12 }>
            <h3 className='h3'>Title</h3>
            <input
              className='custom-text-input-field mt-10 is-fullwidth'
              placeholder='Name of your group'
              value={ groupData.title }
              name='title'
              onChange={ updateData }
            />
          </Grid>
          <Grid item md={ 6 } xs={ 12 }>
            <h3 className='h3'>Permission</h3>
            <RadioGroup
              name='permission'
              label='Permission'
              className='is-block mt-10'
              value={ groupData.permission }
              onChange={ updateData }
            >
              <FormControlLabel
                value='public'
                control={ <Radio size='small' /> }
                label='Public'
                className='para'
              />
              <FormControlLabel
                value='private'
                control={ <Radio size='small' /> }
                label='Private'
                className='para'
              />
            </RadioGroup>
          </Grid>
          <Grid item md={ 12 } sm={ 12 } xs={ 12 }>
            <h3 className='h3'>
              Description
            </h3>
            <TextareaAutosize
              className='custom-text-input-field is-fullwidth mt-10 mb-10'
              rowsMin={ 6 }
              value={ groupData.description }
              name='description'
              onChange={ updateData }

            />
          </Grid>
        </Grid>
        <div className='mt-10'>
          <Button
            color='secondary'
            className='cancel-button'
            onClick={ onCancelClick }
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            className='button-primary-small is-float-right'
            classes={ { label: 'primary-label' } }
            onClick={ onSubmitClick }
          >
            Create
          </Button>
        </div>
      </form>
    </Box>
  )
}

NewGroup.defaultProps = {
  handleSubmit: () => {},
  onCancelClick: () => {},
}

NewGroup.propTypes = {
  handleSubmit: PropTypes.func,
  onCancelClick: PropTypes.func,
}

export default NewGroup
