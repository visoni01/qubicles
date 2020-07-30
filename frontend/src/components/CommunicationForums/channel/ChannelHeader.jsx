import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome, faArrowLeft, faPlus, faUsers, faCommentDots,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { GROUP } from '../../../routes/routesPath'
import { addNewTopic } from '../../../redux-saga/redux/forum/actions'
import AddNewTopic from './NewTopic'

const AddTopicButton = ({ channelId }) => {
  const [ openNewTopicModal, setOpenNewTopicModal ] = useState(false)
  const dispatch = useDispatch()

  // eslint-disable-next-line no-shadow
  const handleNewTopicModal = useCallback(() => setOpenNewTopicModal((openNewTopicModal) => !openNewTopicModal), [])
  const addNewGroup = (data) => {
    dispatch(addNewTopic({ ...data, channelId }))
    setOpenNewTopicModal(false)
  }

  return (
    <>
      <AddNewTopic open={ openNewTopicModal } handleClose={ handleNewTopicModal } onSubmit={ addNewGroup } />
      <Button
        variant='contained'
        className='new-job-button'
        startIcon={ <FontAwesomeIcon icon={ faPlus } className='people-header-icons' /> }
        onClick={ handleNewTopicModal }
      >
        New Group
      </Button>
    </>
  )
}

const ChannelHeader = ({
  channelTitle, channelDescription, totalMembers, totalReplies, channelId,
}) => (
  <div>
    <div className='forum-title-wrapper is-mobile'>
      <img className='forum-image' src='https://via.placeholder.com/150x150' alt='' />
      <div className='inner-wrap channel-head'>
        <h3 className='channel-title'>{channelTitle}</h3>
        <div className='title-meta'>
          {/* {Total Members} */}
          <div className='meta'>
            <FontAwesomeIcon icon={ faUsers } className='total-members' />
            <span>{totalMembers}</span>
          </div>
          {/* {Total Replies} */}
          <div className='meta'>
            <FontAwesomeIcon icon={ faCommentDots } className='total-comments' />
            <span>{totalReplies}</span>
          </div>
        </div>
      </div>
      {/* {Channel Search Bar} */}
      <div className='control channel-search'>
        <input type='text' className='input is-rounded' placeholder='Search Channel...' />
        <div className='search-icon'>
          <i className='sl sl-icon-magnifier' />
        </div>
      </div>
      <div className='actions channel-actions'>
        <Link to={ `${ GROUP }` } className='forum-back home-button'>
          <i><FontAwesomeIcon icon={ faHome } /></i>
          <i><FontAwesomeIcon icon={ faArrowLeft } /></i>
        </Link>
        {/* Forum main dropdown */}
        <AddTopicButton channelId={ channelId } />
      </div>
    </div>
    <span className='channel-description'>{channelDescription}</span>
  </div>
)

ChannelHeader.propTypes = {
  channelTitle: PropTypes.string.isRequired,
  channelDescription: PropTypes.string.isRequired,
  totalMembers: PropTypes.number.isRequired,
  totalReplies: PropTypes.number.isRequired,
  channelId: PropTypes.number.isRequired,
}

AddTopicButton.propTypes = {
  channelId: PropTypes.number.isRequired,
}

export default ChannelHeader
