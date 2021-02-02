import React from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import Quicklinks from './quicklinks'

const NavigationActions = ({
  title, quickLinks, ChildComponent,
}) => (
  <Box className='custom-box actions-box people-navigation-actions'>
    <h2 className=' h2 mb-30'>
      {title}
    </h2>
    {ChildComponent && (
    <ChildComponent />
    )}
    <Quicklinks
      quickLinks={ quickLinks }
    />
  </Box>
)

NavigationActions.defaultProps = {
  ChildComponent: null,
}

NavigationActions.propTypes = {
  title: PropTypes.string.isRequired,
  quickLinks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    hasBreak: PropTypes.bool.isRequired,
    link: PropTypes.string,

  })).isRequired,
  ChildComponent: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
}

export default NavigationActions
