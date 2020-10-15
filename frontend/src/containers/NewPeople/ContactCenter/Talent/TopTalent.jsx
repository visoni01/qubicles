import React, { useState } from 'react'
import {
  Avatar, Box, Divider, Button,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import './styles.scss'
import PropTypes from 'prop-types'
import { terry, sally, kareem } from '../../../../assets/images/avatar'

const TopTalent = ({ heading }) => {
  const [ header, setHeader ] = useState(heading)
  return (
    <Box className='box top-talent-root'>
      <h3>
        {header}
      </h3>
      <div className='display-inline-flex top-talent'>
        <Avatar className='profile-pic' alt='Terry Garret' src={ terry } />
        <div className='candidate-info'>
          <b>Terry Garret</b>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ 5 }
            precision={ 0.1 }
          />
          <p className='description'> Customer Service Specialist </p>
          <Button className='text-button'>View Resume </Button>
        </div>
      </div>
      <Divider className='divider' />

      <div className='display-inline-flex top-talent'>
        <Avatar className='profile-pic' alt='Chad Green' src={ sally } />
        <div className='candidate-info'>
          <b>Chad Green</b>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ 5 }
            precision={ 0.1 }
          />
          <p className='description'> Customer Service Expert </p>
          <Button className='text-button'>View Resume </Button>
        </div>
      </div>
      <Divider className='divider' />

      <div className='display-inline-flex top-talent'>
        <Avatar className='profile-pic' alt='Randy Williamson' src={ kareem } />
        <div className='candidate-info'>
          <b>Randy Williamson</b>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ 5 }
            precision={ 0.1 }
          />
          <p className='description'> Customer Support Enthusiast </p>
          <Button className='text-button'>View Resume </Button>
        </div>
      </div>
      <Divider className='divider' />

    </Box>
  )
}

TopTalent.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default TopTalent
