import React, { useCallback, useEffect } from 'react'
import {
  faChevronLeft, faComment, faEye, faHeart, faImage,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar, Box, Button,
} from '@material-ui/core'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { carolin } from '../../assets/images/avatar/index'
import { topicCommentsFetchingStart } from '../../redux-saga/redux/actions'
import PostComment from './postComment'
import Comments from './comments'

const SelectedTopic = ({ backToGroup, topicDetails, groupTitle }) => {
  const dispatch = useDispatch()
  const backButton = useCallback(() => backToGroup(''), [ backToGroup ])

  return (
    <>
      <Box className='primary-box padding-20 mb-20 topic-details-box'>
        <div className='mb-20'>
          <Button
            classes={ {
              root: 'MuiButtonBase-root button-primary-small',
              label: 'MuiButton-label button-primary-small-label',
            } }
            onClick={ backButton }
          >
            <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
            {groupTitle}
          </Button>
        </div>
        <div className='display-inline-flex width-100-per topic-owner'>
          <Avatar className='mr-10' src={ carolin } />
          <p className='owner-name'>
            {topicDetails.ownerName}
          </p>
          <p className='topic-create-date'>
            {moment(topicDetails.createdAt).format('MMMM DD YY hh:mm a')}
          </p>
        </div>
        <h3 className='topic-title'>
          {topicDetails.title}
        </h3>
        <p className='topic-description' dangerouslySetInnerHTML={ { __html: topicDetails.description } } />
        <div className='action-buttons'>
          <ul className='display-inline-flex action-buttons width-100-per'>
            <li>
              <FontAwesomeIcon icon={ faHeart } />
              274 Likes
            </li>
            <li>
              <FontAwesomeIcon icon={ faComment } />
              {topicDetails.commentsCount}
              {' '}
              Comments
            </li>
            <li>
              <FontAwesomeIcon icon={ faEye } />
              {topicDetails.views}
              {' '}
              Views
            </li>
          </ul>
        </div>
      </Box>

      <PostComment topicId={ topicDetails.id } />

      <Comments topicId={ topicDetails.id } commentsCount={ topicDetails.commentsCount } />
    </>
  )
}

SelectedTopic.defaultProps = {
  groupTitle: '',
  topicDetails: {
    id: '',
    comment: '',
    createdAt: '',
    ownerName: '',
    title: '',
    description: '',
  },
}

SelectedTopic.propTypes = {
  backToGroup: PropTypes.func.isRequired,
  topicDetails: PropTypes.instanceOf({}),
  groupTitle: PropTypes.string,
}

export default SelectedTopic
