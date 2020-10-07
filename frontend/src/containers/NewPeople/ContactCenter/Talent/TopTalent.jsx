import React from 'react'
import {
  Avatar, Box, Divider, Typography, Button,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

const TopTalent = () => (
  <Box className='box top-talent-root'>
    <h3>
      Top Talent
    </h3>

    <div>
      <div className='display-inline-flex candidate-info'>
        <Avatar className='avatar-logo' />
        <Typography>User</Typography>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='large'
          value={ 5 }
          precision={ 0.1 }
        />
      </div>
      <p className='description'> Customer Service Specialist </p>
      <Button className='text-button'>View Resume </Button>
      <Divider className='divider' />
    </div>

    <div>
      <div className='display-inline-flex candidate-info'>
        <Avatar className='avatar-logo' />
        <Typography>User</Typography>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='large'
          value={ 5 }
          precision={ 0.1 }
        />
      </div>
      <p className='description'> Customer Service Specialist </p>
      <Button className='text-button'>View Resume </Button>
      <Divider className='divider' />
    </div>

    <div>
      <div className='display-inline-flex candidate-info'>
        <Avatar className='avatar-logo' />
        <Typography>User</Typography>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='large'
          value={ 5 }
          precision={ 0.1 }
        />
      </div>
      <p className='description'> Customer Service Specialist </p>
      <Button className='text-button'>View Resume </Button>
      <Divider className='divider' />
    </div>

  </Box>
)

export default TopTalent
