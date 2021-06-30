import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import './style.scss'
import classNames from 'classnames'
import CircularProgressWithLabel from '../../components/loaders/circularLoaderWithLabel'

// Note: Generic component for displaying the loader in the center of the screen
// enableOverlay: Used for display the background color with medium opacity
//                and to control the pointer event
// displayLoaderManually: Show loader when this property is set to true.

const Loader = ({
  size, displayLoaderManually, className, enableOverlay,
}) => {
  const { loading, type } = useSelector((state) => state.loader)
  const { uploadProgressData } = useSelector((state) => state.trainingCourse)

  const classes = {
    'loader-container': true,
  }

  if (className) {
    classes[ `${ className }` ] = true
  }

  const loaderRootClasses = classNames(classes)

  return (
    <>
      {
        (loading || displayLoaderManually)
        && (
          <>
            <div className={ enableOverlay ? 'overlay' : '' } />
            <div className={ loaderRootClasses }>
              {_.isEmpty(type)
                ? <CircularProgress size={ size } />
                : <CircularProgressWithLabel size={ size } value={ uploadProgressData } />}
            </div>
          </>
        )
      }
    </>
  )
}

Loader.defaultProps = {
  size: 80,
  enableOverlay: true,
  className: '',
  displayLoaderManually: false,
}

Loader.propTypes = {
  size: PropTypes.number,
  enableOverlay: PropTypes.bool,
  displayLoaderManually: PropTypes.bool,
  className: PropTypes.string,
}

export default Loader
