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
  <Box className='custom-box trending-topic-root'>
    <h3 className='h3 mb-10'>
      Trending Topics
    </h3>
    {[ ...Array(4).keys() ].map((e, index) => (
      <div key={ e }>
        <div className='topic-info'>
          <Avatar className='avatar-logo' src={ carolin } />
          <p className='para margin-auto-5'>User</p>
          <div>
            <FontAwesomeIcon icon={ faChevronRight } className='custom-fa-icon light sz-xs' />
          </div>
          <p className='h4 light fw-md margin-auto-5'>Group Name</p>
        </div>
        <p className='para'>Display some topic's details.</p>
        <ul className='display-inline-flex '>
          <li className='para'>
            <FontAwesomeIcon icon={ faHeart } />
            274
          </li>
          <li className='para'>
            <FontAwesomeIcon icon={ faComment } />
            17
          </li>
          <li className='para'>
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
