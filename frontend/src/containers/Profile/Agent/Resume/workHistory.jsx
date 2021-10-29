import { Box, Chip, Divider } from '@material-ui/core'
import React from 'react'
import { workHistory } from './mockData'

const WorkHistory = () => (
  <Box className='custom-box mb-30'>
    <h3 className='h3 mb-20'> Work History </h3>
    <div>
      {workHistory.map((work, index) => (
        <div key={ work.company }>
          <div className='mb-20 mt-20'>
            <p className='para bold mb-5'>{work.title}</p>
            <p className='para'>{work.company}</p>
            <p className='para light mb-10'>{work.duration}</p>
            {work.skills && work.skills.map((skill) => (
              <Chip
                label={ (
                  <p className='para'>{ skill }</p>
                ) }
                variant='outlined'
                key={ skill }
                className='mr-10 skills-chip'
              />
            ))}
          </div>
          {workHistory.length !== (index + 1) && <Divider />}
        </div>
      ))}
    </div>
  </Box>
)

export default WorkHistory
