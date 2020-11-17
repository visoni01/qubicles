import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@material-ui/core'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const TodayActivity = () => (
  <Box className='custom-box mb-25'>
    <div className='activity-section'>
      <h3 className='h3 mb-15'>
        Today's Activity
        <FontAwesomeIcon icon={ faEllipsisV } className='pull-right' />
      </h3>
      <div>
        <ul>
          <li>
            <p className=' h3 green'>
              3.282
            </p>
            <p className='h4'>
              Calls
            </p>
          </li>
          <li>
            <p className=' h3 green'>
              680
            </p>
            <p className='h4'>
              Sales
            </p>
          </li>
          <li>
            <p className=' h3 yellow'>
              558
            </p>
            <p className='h4'>
              Working
            </p>
          </li>
        </ul>

        <ul>
          <li>
            <p className=' h3 green'>
              754
            </p>
            <p className='h4'>
              Live
            </p>
          </li>
          <li>
            <p className=' h3 red'>
              599
            </p>
            <p className='h4'>
              Online
            </p>
          </li>
          <li>
            <p className=' h3 yellow'>
              260
            </p>
            <p className='h4'>
              On a Call
            </p>
          </li>
        </ul>
      </div>
    </div>
  </Box>
)

export default TodayActivity
