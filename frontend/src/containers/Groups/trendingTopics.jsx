import React from 'react'
import {
  Avatar, Box, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight, faComment, faEye, faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { carolin } from '../../assets/images/avatar/index'

const TrendingTopics = () => (
  <Box className='primary-box trending-topic-root padding-20'>
    <h3 className='h3 mb-10'>
      Trending Topics
    </h3>
    {[ ...Array(4).keys() ].map((e, index) => (
      <div key={ e }>
        <div className='topic-info'>
          <Avatar className='avatar-logo' src={ carolin } />
          <p>User</p>
          <div>
            <FontAwesomeIcon icon={ faChevronRight } />
          </div>
          <p className='group-name'>Group Name</p>
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
        { (index < 3) && <Divider className='divider' /> }
      </div>
    ))}
  </Box>
)

export default TrendingTopics
