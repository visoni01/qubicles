import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@material-ui/core'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const TodayActivity = () => (
  <Box className='box'>
    <div className='activity-section'>
      <h3 className='mb-3 heading'>
        Today's Activity
        <FontAwesomeIcon icon={ faEllipsisV } className='pull-right' />
      </h3>
      <div>
        <ul>
          <li>
            <p className='green'>
              3.282
            </p>
            <p>
              Calls
            </p>
          </li>
          <li>
            <p className='green'>
              680
            </p>
            <p>
              Sales
            </p>
          </li>
          <li>
            <p className='yellow'>
              558
            </p>
            <p>
              Working
            </p>
          </li>
        </ul>

        <ul>
          <li className=''>
            <p className='green'>
              754
            </p>
            <p>
              Live
            </p>
          </li>
          <li>
            <p className='red'>
              599
            </p>
            <p>
              Online
            </p>
          </li>
          <li>
            <p className='yellow'>
              260
            </p>
            <p>
              On a Call
            </p>
          </li>
        </ul>
      </div>
    </div>
  </Box>
)

export default TodayActivity
