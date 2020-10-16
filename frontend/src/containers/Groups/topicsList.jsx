import React, { useState, useEffect, useCallback } from 'react'
import {
  Box, IconButton, Button, Avatar, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment, faEye, faHeart, faSlidersH,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@material-ui/lab/Pagination'
import { slice } from 'lodash'
import { carolin } from '../../assets/images/avatar/index'
import { formatDate } from '../../utils/common'
import { groupTopicsFetchingStart } from '../../redux-saga/redux/actions'

const Topics = ({ groupId, groupTitle, setSelectedTopic }) => {
  const dispatch = useDispatch()
  const [ currentPage, setCurrentPage ] = useState(1)

  const noOfTopicsPerPage = 10 // Temporary defined.
  const { topics, topicsCount } = useSelector((state) => state.groupTopics)
  const noOfPages = Math.floor(topicsCount / noOfTopicsPerPage) + Math.sign(topicsCount % noOfTopicsPerPage)

  const [ maxPageSelected, setMaxPageSelected ] = useState(
    topics.length === topicsCount ? noOfPages : 1,
  )

  const changeCurrentPage = useCallback((_, page) => setCurrentPage(page), [])

  useEffect(() => {
    if (groupId && !(currentPage <= maxPageSelected)) {
      setMaxPageSelected(currentPage)
      dispatch(groupTopicsFetchingStart({
        groupId,
        limit: noOfTopicsPerPage,
        offset: noOfTopicsPerPage * (currentPage - 1),
      }))
    }
  }, [ groupId, currentPage ])

  return (
    <Box className='primary-box padding-20'>
      <div className='section-heading display-inline-flex width-100-per'>
        <h3 className='h3'>
          Topics in
          {' '}
          {groupTitle}
        </h3>
        <IconButton className='action-button'>
          <FontAwesomeIcon icon={ faSlidersH } />
        </IconButton>
      </div>
      <div className='mt-10'>
        {topics.length ? slice(topics, noOfTopicsPerPage * (currentPage - 1), noOfTopicsPerPage * currentPage).map((topic, index) => (
          <>
            <div className='display-inline-flex topic-info width-100-per' key={ topic.id }>
              <Avatar className='mr-10' src={ carolin } />
              <div className='width-100-per'>
                <Button
                  className='h4 topic-name-button'
                  onClick={ () => setSelectedTopic(index, topic.id) }
                  classes={ {
                    root: ' background-none-hover no-padding',
                    label: 'text-align-left',
                  } }
                >
                  {topic.title}
                </Button>
                <div className='display-inline-flex width-100-per'>
                  <p className='para'>
                    {topic.ownerName}
                  </p>
                  <p className='date ml-20'>
                    {formatDate(topic.createdAt, 'MMMM DD YYYY, hh:mm a')}
                  </p>
                </div>
                <div>
                  <ul className='display-inline-flex action-buttons'>
                    <li>
                      <FontAwesomeIcon icon={ faHeart } />
                      274 Likes
                    </li>
                    <li>
                      <FontAwesomeIcon icon={ faComment } />
                      {topic.commentsCount}
                      {' '}
                      Comments
                    </li>
                    <li>
                      <FontAwesomeIcon icon={ faEye } />
                      {topic.views}
                      {' '}
                      Views
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            { (index + 1 < noOfTopicsPerPage) && <Divider className='mb-30' />}
          </>
        )) : (
          <h4 className='h4 text-align-center padding-20'>
            No topics to show
          </h4>
        )}
        {Boolean(topics && topics.length) && (
        <Pagination
          count={ noOfPages }
          shape='round'
          page={ currentPage }
          onChange={ changeCurrentPage }
          classes={ { root: 'topics-pagination' } }
          hidePrevButton={ currentPage < 2 }
        />
        )}
      </div>
    </Box>
  )
}

Topics.propTypes = {
  groupId: PropTypes.number.isRequired,
  groupTitle: PropTypes.string.isRequired,
  setSelectedTopic: PropTypes.func.isRequired,
}

export default Topics
