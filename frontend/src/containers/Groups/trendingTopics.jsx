import React from 'react'
import {
  Avatar, Box, Divider, Typography,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight, faComment, faEye, faHeart,
} from '@fortawesome/free-solid-svg-icons'

const TrendingTopics = () => (
  <Box className='box trending-topic-root'>
    <h3>
      Trending Topics
    </h3>

    <div>
      <div className='display-inline-flex topic-info'>
        <Avatar className='avatar-logo' />
        <Typography className='margin-auto'>User</Typography>
        <div className='margin-auto'>
          <FontAwesomeIcon icon={ faChevronRight } />
        </div>
        <Typography className='margin-auto'>Group Name</Typography>
      </div>
      <p className='description'>Display some topic's details.</p>
      <ul className='display-inline-flex '>
        <li>
          <FontAwesomeIcon icon={ faHeart } />
          274
        </li>

        <li>
          <FontAwesomeIcon icon={ faComment } />
          17
        </li>
        <li>
          <FontAwesomeIcon icon={ faEye } />
          349
        </li>
      </ul>
      <Divider className='divider' />
    </div>

    <div>
      <div className='display-inline-flex topic-info'>
        <Avatar className='avatar-logo' />
        <Typography className='margin-auto'>User</Typography>
        <div className='margin-auto'>
          <FontAwesomeIcon icon={ faChevronRight } />
        </div>
        <Typography className='margin-auto'>Group Name</Typography>
      </div>
      <p className='description'>Display some topic's details.</p>
      <ul className='display-inline-flex '>
        <li>
          <FontAwesomeIcon icon={ faHeart } />
          274
        </li>

        <li>
          <FontAwesomeIcon icon={ faComment } />
          17
        </li>
        <li>
          <FontAwesomeIcon icon={ faEye } />
          349
        </li>
      </ul>
      <Divider className='divider' />
    </div>

    <div>
      <div className='display-inline-flex topic-info'>
        <Avatar className='avatar-logo' />
        <Typography className='margin-auto'>User</Typography>
        <div className='margin-auto'>
          <FontAwesomeIcon icon={ faChevronRight } />
        </div>
        <Typography className='margin-auto'>Group Name</Typography>
      </div>
      <p className='description'>Display some topic's details.</p>
      <ul className='display-inline-flex '>
        <li>
          <FontAwesomeIcon icon={ faHeart } />
          274
        </li>

        <li>
          <FontAwesomeIcon icon={ faComment } />
          17
        </li>
        <li>
          <FontAwesomeIcon icon={ faEye } />
          349
        </li>
      </ul>
    </div>

  </Box>
)

export default TrendingTopics
