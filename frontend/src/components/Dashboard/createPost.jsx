import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { createStatusPostStart } from '../../redux-saga/redux/actions'
import profileLogo2 from '../../assets/images/helen.jpg'
import Loader from '../loaders/circularLoader'
import './style.scss'

const CreatePost = () => {
  const [ postText, setPostText ] = useState(null)
  const fileInput = useRef()
  const dispatch = useDispatch()

  const publish = useCallback(() => {
    const postData = {
      activityPermission: 'public',
      file: fileInput.current.files && fileInput.current.files[ 0 ],
      text: postText,
    }

    dispatch(createStatusPostStart(postData))
  }, [ postText, fileInput, dispatch ])

  const { isLoading, success } = useSelector((state) => state.createPost)

  useEffect(() => {
    if (success) {
      setPostText('')
    }
  }, [ isLoading, success ])

  return (
    <div className='compose-card is-flex is-start is-vcenter post-section create-post-status'>
      <figure className='avatar image is-hidden-mobile'>
        <img
          className='img-circle'
          src={ profileLogo2 }
          alt='profile-logo-2'
        />
      </figure>
      <div className='status-wrapper'>
        <textarea
          className='textarea is-grow'
          rows='5'
          autoComplete='off'
          value={ postText }
          onChange={ (event) => setPostText(event.target.value) }
          placeholder='Write something ...'
        />
      </div>
      <div className='icon-button' onClick={ publish }>
        <i data-feather='upload-cloud' />
      </div>
      <div className='other-options'>
        <div className='upload-file'>
          <FontAwesomeIcon icon={ faCamera } />
          <span className='file-input-label'>Media</span>
          <input type='file' className='input-field' accept='image/*' ref={ fileInput } />
        </div>
      </div>
      {
        isLoading
        && (
        <div>
          <Loader
            className='add-status-loader'
            displayLoaderManually
            enableOverlay={ false }
            size={ 40 }
          />
        </div>
        )
      }
    </div>
  )
}

export default CreatePost
