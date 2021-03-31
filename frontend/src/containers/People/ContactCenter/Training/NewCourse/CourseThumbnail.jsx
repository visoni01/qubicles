import React, { useRef, useCallback } from 'react'
import { Button, IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

export default function CourseThumbnail({
  contentDetails, setContentDetails,
}) {
  const fileInput = useRef()
  // const [ fileSrc, setFileSrc ] = useState(contentDetails.thumbnailImage)
  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[ 0 ]
    const reader = new FileReader()

    reader.onloadend = () => {
      setContentDetails((current) => ({ ...current, thumbnailImage: reader.result }))
    }
    if (event.target.files[ 0 ]) {
      reader.readAsDataURL(file)
    }
  }, [ setContentDetails ])

  const handleDelete = () => {
    setContentDetails((current) => ({ ...current, thumbnailImage: null }))
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
        {!contentDetails.thumbnailImage ? (
          <div className='upload'>
            <input
              type='file'
              id='course-thumbnail-input'
              className='position-absolute'
              accept='image/*'
              ref={ fileInput }
              onChange={ handleFileInputChange }
              style={ { display: 'none' } }
            />

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
          </div>
        ) : (
          <div className='thumbnail-preview'>
            <img alt='Course Thumbnail' src={ contentDetails.thumbnailImage } />
            <IconButton onClick={ handleDelete }>
              <FontAwesomeIcon className='custom-fa-icon dark pointer sz-xl' icon={ faTimesCircle } />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}

CourseThumbnail.propTypes = {
  contentDetails: PropTypes.shape({
    thumbnailImage: PropTypes.any,
  }).isRequired,
  setContentDetails: PropTypes.func.isRequired,
}
