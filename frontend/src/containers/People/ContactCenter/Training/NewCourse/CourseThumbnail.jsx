import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Button, IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { errorsPropTypes } from './propTypes'
import { showErrorMessage } from '../../../../../redux-saga/redux/utils'
import { acceptedImageFormats, maxImageFileSize } from '../../constants'

export default function CourseThumbnail({
  contentSection, setContentSection, errors,
}) {
  const dispatch = useDispatch()

  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[ 0 ]
    const reader = new FileReader()

    if (file) {
      if (file.size > maxImageFileSize) {
        dispatch(showErrorMessage({ msg: 'File size should not be greater than 1 MB!' }))
        return
      }

      const imageUrl = URL.createObjectURL(file)

      reader.onloadend = () => {
        setContentSection((current) => ({
          ...current,
          thumbnailImage: imageUrl,
        }))
      }

      if (event.target.files[ 0 ]) {
        reader.readAsDataURL(file)
      }

      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    }
  }, [ setContentSection, dispatch ])

  const handleDelete = () => {
    setContentSection((current) => ({ ...current, thumbnailImage: null }))
  }

  return (
    <div className='content-tab-section list-divider'>
      <div className='content-box'>
        <div className='info'>
          <h3 className='h3 mb-10'> Course Thumbnail</h3>
          <p className='para'>
            {`Choose a thumbnail image for
          your course (format 16:9) `}
          </p>
        </div>

        {!contentSection.thumbnailImage ? (
          <div className='course-thumbnail-upload'>
            <Button
              className='button-width'
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
              onClick={ () => document.getElementById('course-thumbnail-input').click() }
            >
              Choose Image
            </Button>
            <span className='para red ml-30'>{errors && errors.thumbnailImage && errors.thumbnailImage.message}</span>
          </div>

        ) : (
          <div className='thumbnail-preview'>
            <img alt='Course Thumbnail' src={ contentSection.thumbnailImage } />
            <IconButton onClick={ handleDelete } className='cross-button'>
              <FontAwesomeIcon className='custom-fa-icon dark pointer sz-xl' icon={ faTimesCircle } />
            </IconButton>
          </div>
        )}
      </div>
      <input
        type='file'
        id='course-thumbnail-input'
        className='position-absolute'
        accept={ acceptedImageFormats.join(',') }
        onChange={ handleFileInputChange }
        style={ { display: 'none' } }
      />
    </div>
  )
}

CourseThumbnail.propTypes = {
  contentSection: PropTypes.shape({
    thumbnailImage: PropTypes.any,
  }).isRequired,
  setContentSection: PropTypes.func.isRequired,
  errors: errorsPropTypes.isRequired,
}
