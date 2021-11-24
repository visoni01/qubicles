import React, { useCallback } from 'react'
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

const DateTime = ({ dateTime }) => {
  const getDateAndTime = useCallback(({ type }) => dateTime[ type ], [ dateTime ])

  return (
    <>
      {dateTime?.date && (
        <div className='mr-20'>
          <p className='para bold'> Date </p>
          <TextField
            margin='dense'
            variant='outlined'
            value={ getDateAndTime({ type: 'date' }) }
            disabled
          />
        </div>
      )}
      {dateTime?.time && (
        <div>
          <p className='para bold'> Time </p>
          <TextField
            margin='dense'
            variant='outlined'
            value={ getDateAndTime({ type: 'time' }) }
            disabled
          />
        </div>
      )}
    </>
  )
}

DateTime.propTypes = {
  dateTime: PropTypes.string.isRequired,
}

export default DateTime
