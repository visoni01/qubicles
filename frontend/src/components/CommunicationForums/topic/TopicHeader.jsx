import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  faAngleRight, faHome, faArrowLeft, faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { addTopicComment } from '../../../redux-saga/redux/actions'
import { GROUP, GROUP_CHANNEL, GROUP_TOPIC } from '../../../routes/routesPath'
import NewComment from './NewComment'

const TopicHeader = ({
  topicTitle, topicId, channelId, channelTitle,
}) => {
  const dispatch = useDispatch()
  const [ openCommentModal, setOpenCommentModal ] = useState(false)

  const handleSubmit = useCallback((comment) => {
    const payload = {
      data: {
        comment,
        topicId,
      },
    }
    dispatch(addTopicComment({ payload }))
    setOpenCommentModal(false)
  }, [ dispatch ])

  const toggleModalState = useCallback(() => {
    // eslint-disable-next-line
    setOpenCommentModal((openCommentModal) => !openCommentModal)
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
      <div className='actions'>
        <Link to={ `${ GROUP }` } className='forum-back home-button'>
          <i><FontAwesomeIcon icon={ faHome } /></i>
          <i><FontAwesomeIcon icon={ faArrowLeft } /></i>
        </Link>
        {/* Forum main dropdown */}
        <Button
          variant='contained'
          className='new-reply-button'
          startIcon={ <FontAwesomeIcon icon={ faPlus } className='people-header-icons' /> }
          onClick={ toggleModalState }
          classes={ { label: 'new-reply-button-label' } }
        >
          Reply
        </Button>
      </div>
      <NewComment open={ openCommentModal } handleClose={ toggleModalState } handleSubmit={ handleSubmit } />
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
