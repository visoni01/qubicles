import React from 'react'
import {
  Button, Divider, Chip, Avatar,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { faCircle, faAward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { terry, carolin, thomas } from '../../../../../assets/images/avatar'
import '../styles.scss'

const WorkHistory = () => (
  <div className='box courses-root reviews-root work-history-root has-fullwidth'>
    <h3 className='courses-heading mb-20'> Work History </h3>
    <div className='display-inline-flex work-history-section'>

      {/* First Dummy Data */}
      <h4 className='h4-heading'> Customer Service Agent </h4>
      <p className='paragraph-heading mt-5'> Microsoft </p>
      <p className='paragraph-light-content date'>
        Feb 2020 - Oct 2020
        <FontAwesomeIcon icon={ faCircle } />
        8 months
      </p>
      <div className='tags-set mt-20 mb-10'>
        {[
          'Customer Service', 'Phone Calling', 'Email Support', 'Quick Decisions', 'Customer Support',
        ].map((tag) => <Chip key={ tag } label={ tag } className='tag-chip mt-10' />)}
      </div>
      <div className='feedback-section'>
        <Avatar className='profile-pic' alt='carolin' src={ carolin } />
        <div className='middle-part'>
          <p className='paragraph-heading'>Jasmine Palmer</p>
          <p className='paragraph-light-content'> Customer Service Manager at Microsoft </p>
        </div>
        <div className='right-part'>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='small'
            value={ 5 }
            precision={ 0.1 }
          />
          <Button className='text-button'> Show full feedback </Button>
        </div>
      </div>
      <p className='paragraph-heading'> Certificates and Awards </p>
      <FontAwesomeIcon className='badges' icon={ faAward } />
      <Divider className='divider' />

      {/* Second Dummy Data */}
      <h4 className='h4-heading'> Customer Service Agent </h4>
      <p className='paragraph-heading mt-5'> Setonic </p>
      <p className='paragraph-light-content date'>
        Sep 2019 - Feb 2020
        <FontAwesomeIcon icon={ faCircle } />
        5 months
      </p>
      <div className='tags-set mt-20 mb-10'>
        {[
          'Customer Service', 'Phone Calling', 'Email Support',
        ].map((tag) => <Chip key={ tag } label={ tag } className='tag-chip' />)}
      </div>
      <div className=' feedback-section'>
        <Avatar className='profile-pic' alt='thomas' src={ thomas } />
        <div className='middle-part'>
          <p className='paragraph-heading'>Thomas Jordan</p>
          <p className='paragraph-light-content'> Customer Service Manager at Setonic </p>
        </div>
        <div className='right-part'>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='small'
            value={ 5 }
            precision={ 0.1 }
          />
          <Button className='text-button'> Show full feedback </Button>
        </div>
      </div>
      <Divider className='divider' />

      {/* Third Dummy Data */}
      <h4 className='h4-heading'> Customer Service Agent </h4>
      <p className='paragraph-heading mt-5'> Blue Star </p>
      <p className='paragraph-light-content date'>
        May 2019 - Aug 2019
        <FontAwesomeIcon icon={ faCircle } />
        3 months
      </p>
      <div className='tags-set mt-20'>
        {[
          'Customer Service', 'Phone Calling', 'Email Support',
        ].map((tag) => <Chip key={ tag } label={ tag } className='tag-chip mt-10' />)}
      </div>
    </div>
  </div>

)

export default WorkHistory
