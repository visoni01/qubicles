import React from 'react'
import { ClipLoader } from 'react-spinners'
import PropTypes from 'prop-types'

const Loader = ( {
  size, color, isLoading, optionalStyle,
} ) => (
  <div className={ optionalStyle }>
    <ClipLoader size={ size } color={ color } loading={ isLoading } />
  </div>
)

Loader.defaultProps = {
  size: 150,
  color: '#123abc',
  isLoading: true,
  optionalStyle: {},
}

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  optionalStyle: PropTypes.shape( {} ),
}

export default Loader
