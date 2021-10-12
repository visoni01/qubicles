import React from 'react'
import PropTypes from 'prop-types'

const ThreeDotLoader = ({ isSmall }) => (
  <div className={ `dots ${ isSmall ? 'h-15' : '' }` }>
    {[ ...Array(3).keys() ].map((val) => (
      <span
        key={ val }
        className={ ` ${ isSmall ? 'sm' : '' }` }
      />
    ))}
  </div>
)

ThreeDotLoader.defaultProps = {
  isSmall: false,
}

ThreeDotLoader.propTypes = {
  isSmall: PropTypes.bool,
}

export default ThreeDotLoader
