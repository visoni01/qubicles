import React from 'react'
import { Button, Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addJob } from '../../../../../redux-saga/redux/actions'

export default function NewJobActions({
  newJobData,
}) {
  const dispatch = useDispatch()
  const addNewJob = () => {
    // console.log('newJobData in action', newJobData)
    dispatch(addJob({
      ...newJobData,
      status: 'draft',
    }))
  }

  return (
    <>
      <Box className='custom-box actions-box'>
        <h3 className='h3 heading'> Actions </h3>

        <Button
          className='wide-button mb-15'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          Publish
        </Button>
        <Button
          className='wide-button mb-15'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
          onClick={ addNewJob }
        >
          Save Draft
        </Button>
        <Button
          className='wide-button mb-15'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
        >
          Preview
        </Button>
      </Box>

    </>
  )
}

NewJobActions.propTypes = {
  newJobData: PropTypes.bool.isRequired,
}
