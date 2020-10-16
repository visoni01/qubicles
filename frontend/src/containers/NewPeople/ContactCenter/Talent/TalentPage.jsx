import React from 'react'
import {
  Box, InputBase, Button, Avatar, Divider, Chip,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch, faMapMarkerAlt, faLanguage, faAward,
} from '@fortawesome/free-solid-svg-icons'
import './styles.scss'
import { terry, sally, kareem } from '../../../../assets/images/avatar'

const TalentPage = () => (
  <>
    <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
      <div className='search-input'>
        <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
        <InputBase
          placeholder='Search Talent'
          className='input-field'
        />
      </div>
    </div>
    <Box className='box'>

      <div className='display-inline-flex talent-head'>
        <Avatar alt='Terry Garret' src={ terry } />
        <div className='talent-details'>
          <div className='username'>
            <div className='display-inline-flex'>
              <h4>Terry Garret</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='large'
                value={ 5 }
                precision={ 0.1 }
              />
              <FontAwesomeIcon className='badges' icon={ faAward } />
            </div>
            <Button className='text-button'>View Resume </Button>
          </div>
          <p className='location'>
            <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10' />
            San Francisco, CA
            <span className='status'> Available </span>
          </p>
          <p className='languages'>
            <FontAwesomeIcon icon={ faLanguage } className='ml-10' />
            English, German
            <span> 12.50 $/hour </span>
          </p>
        </div>
      </div>
      <div className='talent-content'>
        <h4 className='mt-10'>
          Customer Service Expert
        </h4>
        <p className='mt-10 mb-10'>
          I have over 15 years of experience in telemarketing and lead generation.
          I also have over 5 years od experience in management, quality control and supervision.
          I do have the ability and update your contact list in real time...
        </p>
        <div className='talent-tags mt-10'>
          <Chip label='Customer Service' className='talent-chips' />
          <Chip label='Phone Calling ' className='talent-chips' />
          <Chip label='Email Support' className='talent-chips' />
          <span className='more'> +3 more </span>
        </div>
      </div>
      <Divider className='mt-20 mb-20' />
      {/* Another One */}

      <div className='display-inline-flex talent-head'>
        <Avatar alt='Chad Green' src={ kareem } />
        <div className='talent-details'>
          <div className='username'>
            <div className='display-inline-flex'>
              <h4>Chad Green</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='large'
                value={ 5 }
                precision={ 0.1 }
              />
              <FontAwesomeIcon className='badges' icon={ faAward } />
            </div>
            <Button className='text-button'>View Resume </Button>
          </div>
          <p className='location'>
            <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10' />
            San Francisco, CA
            <span className='status'> Available </span>
          </p>
          <p className='languages'>
            <FontAwesomeIcon icon={ faLanguage } className='ml-10' />
            English, German
            <span> 12.50 $/hour </span>
          </p>
        </div>
      </div>
      <div className='talent-content'>
        <h4 className='mt-10'>
          Customer Service Expert
        </h4>
        <p className='mt-10 mb-10'>
          I have over 15 years of experience in telemarketing and lead generation.
          I also have over 5 years od experience in management, quality control and supervision.
          I do have the ability and update your contact list in real time...
        </p>
        <div className='talent-tags mt-10'>
          <Chip label='Customer Service' className='talent-chips' />
          <Chip label='Phone Calling ' className='talent-chips' />
          <Chip label='Email Support' className='talent-chips' />
          <span className='more'> +3 more </span>
        </div>
      </div>
      <Divider className='mt-20 mb-20' />
      {/* Another One */}

      <div className='display-inline-flex talent-head'>
        <Avatar alt='Janice Fox' src={ sally } />
        <div className='talent-details'>
          <div className='username'>
            <div className='display-inline-flex'>
              <h4>Janice Fox</h4>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='large'
                value={ 5 }
                precision={ 0.1 }
              />
              <FontAwesomeIcon className='badges' icon={ faAward } />
            </div>
            <Button className='text-button'>View Resume </Button>
          </div>
          <p className='location'>
            <FontAwesomeIcon icon={ faMapMarkerAlt } className='ml-10' />
            San Francisco, CA
            <span className='status'> Available </span>
          </p>
          <p className='languages'>
            <FontAwesomeIcon icon={ faLanguage } className='ml-10' />
            English, German
            <span> 12.50 $/hour </span>
          </p>
        </div>
      </div>
      <div className='talent-content'>
        <h4 className='mt-10'>
          Customer Service Expert
        </h4>
        <p className='mt-10 mb-10'>
          I have over 15 years of experience in telemarketing and lead generation.
          I also have over 5 years od experience in management, quality control and supervision.
          I do have the ability and update your contact list in real time...
        </p>
        <div className='talent-tags mt-10'>
          <Chip label='Customer Service' className='talent-chips' />
          <Chip label='Phone Calling ' className='talent-chips' />
          <Chip label='Email Support' className='talent-chips' />
          <span className='more'> +3 more </span>
        </div>
      </div>

    </Box>
  </>
)

export default TalentPage
