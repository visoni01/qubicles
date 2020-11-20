import React, { useState, useEffect, useCallback } from 'react'
import {
  Box, IconButton, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@material-ui/lab/Pagination'
import { groupTopicsFetchingStart } from '../../../redux-saga/redux/actions'
import ListSkeleton from '../skeletons/topicsList'
import TopicsListItem from './listItem'

const Topics = ({ groupId, groupTitle, setSelectedTopic }) => {
  const dispatch = useDispatch()
  const [ currentPage, setCurrentPage ] = useState(1)

  const noOfTopicsPerPage = 10 // Temporary defined.
  const { topics, topicsCount, isLoading } = useSelector((state) => state.groupTopics)
  const noOfPages = Math.floor(topicsCount / noOfTopicsPerPage) + Math.sign(topicsCount % noOfTopicsPerPage)

  const changeCurrentPage = useCallback((_, page) => setCurrentPage(page), [])

  useEffect(() => {
    if (groupId) {
      dispatch(groupTopicsFetchingStart({
        groupId,
        limit: noOfTopicsPerPage,
        offset: noOfTopicsPerPage * (currentPage - 1),
      }))
    }
  }, [ currentPage, groupId ])

  if (isLoading) {
    return (
      <Box className='custom-box'>
        <ListSkeleton />
      </Box>
    )
  }

  return (
    <Box className='custom-box'>
      <div className='section-heading display-inline-flex is-fullwidth'>
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
        {topics.length ? topics.map((topic, index) => (
          <>
            <TopicsListItem
              topic={ topic }
              index={ index }
              setSelectedTopic={ setSelectedTopic }
            />
            { (index + 1 < noOfTopicsPerPage) && <Divider className='mb-30' />}
          </>
        )) : (
          <h4 className='h4 text-center padding-20'>
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