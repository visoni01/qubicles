import React from 'react'
import {
  Avatar, Box, Divider, Typography, Button,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight, faComment, faEye, faHeart,
} from '@fortawesome/free-solid-svg-icons'

const TopTalent = () => (
  <Box className='box top-talent-root'>
    <h3>
      Top Talent
    </h3>

    <div>
      <div className='display-inline-flex topic-info'>
        <Avatar className='avatar-logo' />
        <Typography className='ml-40'>User</Typography>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='large'
          value={ 5 }
          precision={ 0.1 }
        />
      </div>
      <p className='description ml-40'> Customer Service Specialist </p>
      <Button className='ml-30' color='primary'>View Resume </Button>
      <Divider className='divider' />
    </div>

    <div>
      <div className='display-inline-flex topic-info'>
        <Avatar className='avatar-logo' />
        <Typography className='margin-auto'>User</Typography>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='large'
          value={ 5 }
          precision={ 0.1 }
        />
      </div>
      <p className='description ml-30'> Customer Service Specialist </p>
      <Button className='ml-30' color='primary'>View Resume </Button>
      <Divider className='divider' />
    </div>

    <div>
      <div className='display-inline-flex topic-info'>
        <Avatar className='avatar-logo' />
        <Typography className='margin-auto'>User</Typography>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='large'
          value={ 5 }
          precision={ 0.1 }
        />
      </div>
      <p className='description ml-30'> Customer Service Specialist </p>
      <Button className='ml-30' color='primary'>View Resume </Button>
      <Divider className='divider' />
    </div>

  </Box>
)

export default TopTalent
