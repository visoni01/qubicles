import React, { useState, useEffect, useCallback } from 'react'
import { Box, IconButton, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@material-ui/lab/Pagination'
import { groupTopicsFetchingStart } from '../../../redux-saga/redux/actions'
import ListSkeleton from '../../../components/Forum/Skeletons/topicsList'
import TopicsListItem from './listItem'
import { FilterIcon } from '../../../assets/images/training'

const Topics = ({
  groupId, groupTitle, setSelectedTopic, updateTopicAndToggle,
}) => {
  const [ currentPage, setCurrentPage ] = useState(1)

  const { topics, topicsCount, isLoading } = useSelector((state) => state.groupTopics)

  const dispatch = useDispatch()

  const changeCurrentPage = useCallback((_, page) => setCurrentPage(page), [])

  const noOfTopicsPerPage = 10 // Temporary defined.
  const noOfPages = Math.floor(topicsCount / noOfTopicsPerPage) + Math.sign(topicsCount % noOfTopicsPerPage)

  useEffect(() => {
    if (groupId) {
      dispatch(groupTopicsFetchingStart({
        groupId,
        limit: noOfTopicsPerPage,
        offset: noOfTopicsPerPage * (currentPage - 1),
      }))
    }
  }, [ currentPage, groupId, dispatch ])

  if (isLoading) {
    return (
      <Box className='custom-box'>
        <ListSkeleton />
      </Box>
    )
  }

  return (
    <Box className='custom-box'>
      <div className='section-heading display-inline-flex align-items-center is-fullwidth'>
        <h3 className='h3 topics-list-action-icon'>
          {`Topics in ${ groupTitle }`}
        </h3>
        <IconButton className='action-button ml-10'>
          <FilterIcon />
        </IconButton>
      </div>

      <div className='mt-10'>
        {topics.length
          ? topics.map((topic, index) => (
            <div key={ topic.id }>
              <div className=' display-inline-flex is-fullwidth mt-20'>
                <TopicsListItem
                  topic={ topic }
                  index={ index }
                  setSelectedTopic={ setSelectedTopic }
                  updateTopicAndToggle={ updateTopicAndToggle }
                />
              </div>
              { (index + 1 < noOfTopicsPerPage) && <Divider className='mb-30' />}
            </div>
          ))
          : (
            <h4 className='h4 text-center padding-20'> No topics to show </h4>
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

Topics.defaultProps = {
  groupId: null,
  updateTopicAndToggle: () => {},
}

Topics.propTypes = {
  groupId: PropTypes.number,
  groupTitle: PropTypes.string.isRequired,
  setSelectedTopic: PropTypes.func.isRequired,
  updateTopicAndToggle: PropTypes.func,
}

export default Topics
