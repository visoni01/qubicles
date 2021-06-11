/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback } from 'react'
import { Button, IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { errorsPropTypes } from './propTypes'
import VideoPlayer from '../ViewCourse/videoPlayer'

export default function IntroVideo({
  contentSection, setContentSection, errors,
}) {
  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[ 0 ]
    const reader = new FileReader()

    if (file) {
      const videoUrl = URL.createObjectURL(file)

      reader.onloadend = () => {
        setContentSection((current) => ({
          ...current,
          introductionVideo: videoUrl,
        }))
      }

      if (event.target.files[ 0 ]) {
        reader.readAsDataURL(file)
      }

      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    }
  }, [ setContentSection ])

  const handleDelete = () => {
    setContentSection((current) => ({ ...current, introductionVideo: null }))
  }

  return (
    <div className='content-tab-section list-divider'>
      <div className='content-box'>
        <div className='info'>
          <h3 className='h3 mb-10'>Introduction Video</h3>
          <p className='para'>
            {`Choose an introduction video. This video will be accessible for everyone who is
            intrested in your course `}
          </p>
        </div>

        {!contentSection.introductionVideo ? (
          <div className='course-thumbnail-upload'>
            <Button
              className='button-width'
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
              onClick={ () => document.getElementById('course-introduction-input').click() }
            >
              Choose Video
            </Button>
            <span className='para red ml-30'>
              {errors && errors.introductionVideo && errors.introductionVideo.message}
            </span>
          </div>
        ) : (
          <div className='thumbnail-preview'>
            <VideoPlayer source={ contentSection.introductionVideo } small />
            <IconButton onClick={ handleDelete } className='cross-button'>
              <FontAwesomeIcon className='custom-fa-icon dark pointer sz-xl' icon={ faTimesCircle } />
            </IconButton>
          </div>
        )}
      </div>
      <input
        type='file'
        id='course-introduction-input'
        className='position-absolute'
        accept='video/mp4,video/*'
        onChange={ handleFileInputChange }
        style={ { display: 'none' } }
      />
    </div>
  )
}

IntroVideo.propTypes = {
  contentSection: PropTypes.shape({
    introductionVideo: PropTypes.any,
  }).isRequired,
  setContentSection: PropTypes.func.isRequired,
  errors: errorsPropTypes.isRequired,
}
