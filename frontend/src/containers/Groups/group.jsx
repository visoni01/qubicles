import React, { useState, useEffect, useCallback } from 'react'
import {
  Box, IconButton, InputBase, Button, Avatar, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment,
  faEllipsisV, faEye, faHeart, faSearch, faSlidersH,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import GroupsList from './groups'
import TrendingTopics from './trendingTopics'
import { carolin } from '../../assets/images/avatar/index'
import { groupTopicsFetchingStart, addNewGroupTopic } from '../../redux-saga/redux/actions'
import NewTopicForm from './newTopic'
import { formatDate } from '../../utils/common'

const SelectedGroup = ({ group }) => {
  const { id, title, description } = group
  const dispatch = useDispatch()
  const [ newTopicForm, setNewTopicForm ] = useState(false)
  const { topics } = useSelector((state) => state.groupTopics)
  const { userDetails } = useSelector((state) => state.login)

  useEffect(() => {
    if (id) {
      dispatch(groupTopicsFetchingStart({ groupId: id }))
    }
  }, [ id ])

  // eslint-disable-next-line
  const changeTopicFormStatus = useCallback(() => setNewTopicForm((newTopicForm) => !newTopicForm),
    [ setNewTopicForm ])

  const handleCreateTopic = (data) => {
    dispatch(addNewGroupTopic({ ...data, groupId: id, ownerName: userDetails.full_name }))
    setNewTopicForm(false)
  }

  if (newTopicForm) {
    return <NewTopicForm handleCancel={ changeTopicFormStatus } handleSubmit={ handleCreateTopic } />
  }

  return (
    <>
      <div>
        <Box className='primary-box padding-20 mb-20'>
          <div className='section-heading display-inline-flex width-100-per'>
            <h3 className='h3'>
              {title}
            </h3>
            <IconButton className='action-button'>
              <FontAwesomeIcon icon={ faEllipsisV } />
            </IconButton>
          </div>
          <p className='para'>
            {description}
          </p>
        </Box>
        <div className='display-inline-flex width-100-per search-topic-bar'>
          <div className='search-input primary-box'>
            <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
            <InputBase
              placeholder='Search'
              className='input-field'
            />
          </div>
          <Button
            className='new-topic-button'
            classes={ {
              label: 'MuiButton-label button-primary-small-label',
              root: 'MuiButtonBase-root button-primary-small',
            } }
            onClick={ changeTopicFormStatus }
          >
            New Topic
          </Button>
        </div>
      </div>
      <Box className='primary-box padding-20'>
        <div className='section-heading display-inline-flex width-100-per'>
          <h3 className='h3'>
            Topics in Group
          </h3>
          <IconButton className='action-button'>
            <FontAwesomeIcon icon={ faSlidersH } />
          </IconButton>
        </div>
        <div className='mt-10'>
          {Boolean(topics.length) && topics.map((topic) => (
            <>
              <div className='display-inline-flex topic-info width-100-per' key={ topic.id }>
                <Avatar className='mr-10' src={ carolin } />
                <div className='width-100-per'>
                  <h4 className='h4'>
                    {topic.title}
                  </h4>
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
                        <p>
                          274 Likes
                        </p>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={ faComment } />
                        <p>
                          17 Comments
                        </p>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={ faEye } />
                        <p>
                          349 Views
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <Divider className='mb-30' />
            </>
          ))}
        </div>
      </Box>
    </>
  )
}

SelectedGroup.defaultProps = {
  group: {
    title: '',
    description: '',
  },
}

SelectedGroup.propTypes = {
  group: {
    title: PropTypes.string,
    description: PropTypes.string,
  },
}

export default SelectedGroup
