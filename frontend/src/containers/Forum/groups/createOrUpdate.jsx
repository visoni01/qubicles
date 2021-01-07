import React, { useEffect, useState } from 'react'
import {
  Box, FormControlLabel, Grid, Radio, RadioGroup, TextareaAutosize, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'

let initialFormData = {
  title: '',
  permission: 'public',
  description: '',
}

const CreateOrUpdate = ({
  handleSubmit, onCancelClick, handleCloseModal, updateGroup, groupUpdateData, isUpdate,
}) => {
  initialFormData = isUpdate ? groupUpdateData : initialFormData

  const [ groupData, setGroupData ] = useState(initialFormData)

  useEffect(() => {
    setGroupData(groupUpdateData)
  }, [ groupUpdateData ])

  const updateData = (event) => {
    setGroupData({
      ...groupData,
      [ event.target && event.target.name ]: event.target && event.target.value,
    })
  }

  const onSubmitClick = () => {
    if (isUpdate) {
      updateGroup(groupData)
    } else {
      handleSubmit(groupData)
      setGroupData(initialFormData)
    }
  }

  return (
    <Box className='custom-box'>
      <form>
        <Grid container spacing={ 3 }>
          <Grid item md={ 12 } sm={ 12 } xs={ 12 } className='mb-10'>
            <h2 className='h2'>
              {isUpdate ? 'Update' : 'Create'}
              {' '}
              new group
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
            onClick={ () => (isUpdate ? handleCloseModal() : onCancelClick()) }
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            className='button-primary-small is-float-right'
            classes={ { label: 'primary-label' } }
            onClick={ onSubmitClick }
          >
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Box>
  )
}

CreateOrUpdate.defaultProps = {
  handleSubmit: () => {},
  onCancelClick: () => {},
  updateGroup: () => {},
  handleCloseModal: () => {},
  groupUpdateData: {},
  isUpdate: false,
}

CreateOrUpdate.propTypes = {
  handleSubmit: PropTypes.func,
  onCancelClick: PropTypes.func,
  handleCloseModal: PropTypes.func,
  updateGroup: PropTypes.func,
  isUpdate: PropTypes.bool,
  groupUpdateData: PropTypes.shape,
}

export default CreateOrUpdate
