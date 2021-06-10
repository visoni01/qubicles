import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const CircularProgressWithLabel = ({ value, size }) => (
  <Box position='relative' display='inline-flex'>
    <CircularProgress size={ size } variant='determinate' value={ value } />
    <Box
      top={ 0 }
      left={ 0 }
      bottom={ 0 }
      right={ 0 }
      position='absolute'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Typography variant='caption' component='div' color='textSecondary'>
        {`${ value }%`}
      </Typography>
    </Box>
  </Box>
)

CircularProgressWithLabel.defaultProps = {
  size: 80,
  value: 0,
}

CircularProgressWithLabel.propTypes = {
  size: PropTypes.number,
  value: PropTypes.number,
}

export default CircularProgressWithLabel
