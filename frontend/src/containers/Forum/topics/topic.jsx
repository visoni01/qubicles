/* eslint-disable react/no-danger */
import React, { useCallback } from 'react'
import {
  faChevronLeft, faComment, faEye, faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar, Box, Button,
} from '@material-ui/core'
import moment from 'moment'
import PropTypes from 'prop-types'
import { carolin } from '../../../assets/images/avatar/index'
import PostComment from '../comments/postComment'
import Comments from '../comments/list'

const SelectedTopic = ({ backToGroup, topicDetails, groupTitle }) => {
  const backButton = useCallback(() => backToGroup(''), [ backToGroup ])

  return (
    <>
      <Box className='custom-box mb-20'>
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
        <div className='display-inline-flex is-fullwidth topic-owner'>
          <Avatar className='mr-10' src={ carolin } />
          <p className='para bold margin-auto-5'>
            {topicDetails.ownerName}
          </p>
          <p className='para light margin-auto-5'>
            {moment(topicDetails.createdAt).format('MMMM DD YY hh:mm a')}
          </p>
        </div>
        <h3 className='h2 mb-20 mt-10'>
          {topicDetails.title}
        </h3>
        <p className='para' dangerouslySetInnerHTML={ { __html: topicDetails.description } } />
        <div className='section-stats mt-20'>
          <ul className='display-inline-flex is-fullwidth'>
            <li className='para'>
              <FontAwesomeIcon
                icon={ faHeart }
                className={ topicDetails.isTopicLiked ? 'liked-icon' : '' }
              />
              {topicDetails.likesCount}
              {' '}
              Likes
            </li>
            <li className='para'>
              <FontAwesomeIcon icon={ faComment } />
              {topicDetails.commentsCount}
              {' '}
              Comments
            </li>
            <li className='para'>
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
