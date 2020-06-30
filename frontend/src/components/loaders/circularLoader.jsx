import React from 'react'
import { ClipLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import './style.scss'

// Note: Generic component for displaying the loader in the center of the screen
// enableOverlay: Used for display the background color with medium opacity
//                and to control the pointer event
// displayLoaderManually: Show loader when this property is set to true.

const Loader = ({
  size, color, displayLoaderManually, className, enableOverlay,
}) => {
  const { loading } = useSelector((state) => state.loader)

  return (
    <>
      {
        (loading || displayLoaderManually)
        && (
          <>
            <div className={ enableOverlay && 'overlay' } />
            <div className={ className || 'loader-container' }>
              <ClipLoader size={ size } color={ color } loading />
            </div>
          </>
        )
      }
    </>
  )
}

Loader.defaultProps = {
  size: 80,
  color: '#123abc',
  enableOverlay: true,
  className: '',
  displayLoaderManually: false,
}

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  enableOverlay: PropTypes.bool,
  displayLoaderManually: PropTypes.bool,
  className: PropTypes.string,
}

export default Loader
