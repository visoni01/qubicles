import React from 'react'
import { Button, Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addJob } from '../../../../../redux-saga/redux/actions'
import '../../styles.scss'

export default function NewJobActions({
  newJobData,
}) {
  const dispatch = useDispatch()
  const saveDraft = () => {
    dispatch(addJob({
      ...newJobData,
      status: 'draft',
    }))
  }

  const publishJob = () => {
    dispatch(addJob(newJobData))
  }

  return (
    <>
      <Box className='custom-box actions-box'>
        <h3 className='h3 mb-20'> Actions </h3>

        <Button
          className='wide-button mb-15'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ publishJob }
        >
          >
          Publish
        </Button>
        <Button
          className='wide-button mb-15'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
          onClick={ saveDraft }
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
