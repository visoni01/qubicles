import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  faAngleRight, faHome, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { addTopicComment } from '../../../redux-saga/redux/actions'
import { GROUP, GROUP_CHANNEL, GROUP_TOPIC } from '../../../routes/routesPath'

const TopicHeader = ({
  topicTitle, topicId, channelId, channelTitle,
}) => {
  const dispatch = useDispatch()
  const [ open, setOpen ] = useState(false)
  const [ comment, setComment ] = useState('')

  const handleSubmit = useCallback(() => {
    const payload = {
      data: {
        comment,
        topicId,
      },
    }
    dispatch(addTopicComment({ payload }))
    setOpen(false)
    setComment('')
  }, [ comment, dispatch, topicId ])

  const handleClickOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div className='forum-title-wrapper is-mobile'>
      <img className='forum-image' src='https://via.placeholder.com/150x150' alt='' />
      <div className='inner-wrap channel-header'>
        <h3 className='forum-title is-topic-title'>{ topicTitle }</h3>
        <div className='title-meta'>
          <div className='meta'>
            <Link to={ `${ GROUP }` }>Home</Link>
            <i className='material-icons is-breadcrumb angle-right'><FontAwesomeIcon icon={ faAngleRight } /></i>
          </div>
          <div className='meta'>
            <Link to={ `${ GROUP_CHANNEL }${ channelId }` }>{channelTitle}</Link>
            <i className='material-icons is-breadcrumb angle-right'><FontAwesomeIcon icon={ faAngleRight } /></i>
          </div>
          <div className='meta'>
            <Link to={ `${ GROUP_TOPIC }${ topicId }` }>{topicTitle}</Link>
          </div>
        </div>
      </div>
      {/* Filter input */}
      <div className='actions channel-actions'>
        <Link to={ `${ GROUP }` } className='forum-back home-button'>
          <i><FontAwesomeIcon icon={ faHome } /></i>
          <i><FontAwesomeIcon icon={ faArrowLeft } /></i>
        </Link>
        {/* Forum main dropdown */}
        <Button
          className='button secondary-btn btn-dash raised ripple'
          onClick={ handleClickOpen }
        >
          Reply
        </Button>
        <Dialog open={ open } onClose={ handleClose } aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>{topicTitle}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='comment'
              label='Comment'
              fullWidth
              value={ comment }
              onChange={ (e) => setComment(e.target.value) }
            />
          </DialogContent>
          <DialogActions>
            <Button className='button secondary-btn btn-dash raised ripple' onClick={ handleClose } color='primary'>
              Cancel
            </Button>
            <Button className='button secondary-btn btn-dash raised ripple' onClick={ handleSubmit } color='primary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

TopicHeader.propTypes = {
  topicTitle: PropTypes.string.isRequired,
  topicId: PropTypes.number.isRequired,
  channelId: PropTypes.number.isRequired,
  channelTitle: PropTypes.string.isRequired,
}

export default TopicHeader
