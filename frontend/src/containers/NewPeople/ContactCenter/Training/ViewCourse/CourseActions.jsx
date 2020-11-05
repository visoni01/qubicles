import React from 'react'
import {
  Button, Box, Card, CardMedia, CardContent,
} from '@material-ui/core'

import '../style.scss'
import { Rating } from '@material-ui/lab'

export default function CourseActions() {
  return (
    <>
      <Box className='custom-box actions-box'>
        <div className='mb-20'>
          <Card className='course-card'>
            <Box className='custom-box no-padding price-overlay'>
              <p className='h3 price-qbe text-center'>
                { `${ 12 } `}
                <span className='h3 unbold'>QBE</span>
              </p>
              <p className='para light price-usd text-center'>
                {`$${ 12 } USD`}
              </p>
            </Box>
            <CardMedia
              image='https://picsum.photos/400/300'
              className='course-image round-border'
            />
          </Card>
        </div>
        <div className='mb-10'>
          <Button
            className='wide-button'
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
          >
            Buy Course
          </Button>
          <Button
            className='wide-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Preview
          </Button>
        </div>
        <div className='mb-20'>
          <h4 className='h4'> Rating for this course</h4>
          <div className='rating-text'>
            <Rating
              className='rating-star no-margin-left'
              name='read-only'
              readOnly
              size='small'
              value={ 4.5 }
              precision={ 0.1 }
            />
            <span className='para light'>{`(${ 15 } ratings) `}</span>
            <span className='para light'>{`${ 24 } students`}</span>
          </div>
        </div>
        <div className='mb-20'>
          <h4 className='h4'> Last updated</h4>
          <span className='para light'>09/20/2020</span>
        </div>
        <div className='mb-20'>
          <h4 className='h4'>Category</h4>
          <span className='para light'>Client Service</span>
        </div>
        <div className='mb-20'>
          <h4 className='h4'>Language(s)</h4>
          <span className='para light'>English</span>
        </div>
      </Box>
    </>
  )
}
