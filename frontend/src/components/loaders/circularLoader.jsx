import React from 'react'
import { ClipLoader } from 'react-spinners'
import PropTypes from 'prop-types'

const Loader = ( {
  size, color, isLoading, className,
} ) => (
  <div className={ className }>
    <ClipLoader size={ size } color={ color } loading={ isLoading } />
  </div>
)

Loader.defaultProps = {
  size: 150,
  color: '#123abc',
  isLoading: true,
  className: {},
}

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  className: PropTypes.shape( {} ),
}

export default Loader
