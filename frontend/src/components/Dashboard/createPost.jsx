import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@material-ui/core'
import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons'
import { createStatusPostStart } from '../../redux-saga/redux/actions'
import profileLogo2 from '../../assets/images/helen.jpg'
import Loader from '../loaders/circularLoader'
import './style.scss'

const CreatePost = () => {
  const [ postText, setPostText ] = useState(null)
  const [ permission, setPermission ] = useState('public')
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
    <div className='compose-card is-new-content is-start is-vcenter post-section create-post-status'>
      <figure className='avatar image is-hidden-mobile'>
        <img
          className='img-circle'
          src={ profileLogo2 }
          alt='profile-logo-2'
        />
      </figure>
      <div className='status-wrapper'>
        <textarea
          className='textarea'
          rows='6'
          autoComplete='off'
          value={ postText }
          onChange={ (event) => setPostText(event.target.value) }
          placeholder='Write something ...'
        />
      </div>
      <hr className='ruler' />
      <div className='columns is-multiline is-full'>
        <div className='column is-6 is-narrower'>
          <Button
            variant='contained'
            className='publish-button '
            startIcon={ <FontAwesomeIcon icon={ faPlus } /> }
            onClick={ publish }
          >
            Publish
          </Button>
        </div>
        <div className='other-options column is-6 is-narrower'>
          <div className='upload-file'>
            <FontAwesomeIcon icon={ faCamera } />
            <span className='file-input-label'>Media</span>
            {/* <br /> */}
            <input type='file' className='input-field' accept='image/*' ref={ fileInput } />
          </div>
        </div>
        <hr className='ruler' />
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
