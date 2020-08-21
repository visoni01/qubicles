import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl, Select, InputLabel, MenuItem, Button, Avatar, Chip,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCamera, faPaperPlane, faTrashAlt, faStickyNote,
} from '@fortawesome/free-solid-svg-icons'
import { createStatusPostStart } from '../../redux-saga/redux/actions'
import Loader from '../loaders/circularLoader'
import './style.scss'

const CreatePost = () => {
  const [ postText, setPostText ] = useState(null)
  const [ permission, setPermission ] = useState('public')
  const [ fileName, setFileName ] = useState(null)
  const fileInput = useRef()
  const dispatch = useDispatch()

  const post = useCallback(() => {
    if (!(postText && postText.trim())) {
      return
    }
    const postData = {
      activityPermission: permission,
      file: fileInput.current.files && fileInput.current.files[ 0 ],
      text: postText,
    }
    dispatch(createStatusPostStart(postData))
  }, [ postText, fileInput, permission, dispatch ])

  const setPostTextCB = useCallback((event) => {
    setPostText(event.target.value)
  }, [])

  const setPermissionCB = useCallback((event) => {
    setPermission(event.target.value)
  }, [])

  const { isLoading, success } = useSelector((state) => state.createPost)
  const { userDetails } = useSelector((state) => state.login)
  const clear = () => {
    setPostText('')
    setPermission('public')
    fileInput.current.value = ''
    setFileName(null)
  }

  const handleDelete = () => {
    fileInput.current.value = ''
    setFileName(null)
  }

  useEffect(() => {
    if (success) {
      setPostText('')
      setPermission('public')
      fileInput.current.value = ''
      setFileName(null)
    }
  }, [ success, isLoading ])

  const handleFileInputChange = useCallback(() => {
    const fileObj = fileInput.current.files[ 0 ]
    // eslint-disable-next-line no-shadow
    let fileName = fileObj.name
    if (fileName && fileName.length > 30) {
      fileName = `${ fileName.substr(0, 30) }.${ fileObj.type.split('/')[ 1 ] }`
    }
    setFileName(fileInput.current.files[ 0 ].name)
  }, [])

  return (
    <div
      className='compose-card is-new-content post-item-custom is-start is-vcenter post-section create-post-status'
      style={ { pointerEvents: isLoading ? 'none' : 'auto' } }
    >
      <div className='columns is-vcentered'>
        <div className='column is-1 custom-avatar'>
          <Avatar className='avatar'>
            {userDetails && userDetails.full_name && userDetails.full_name[ 0 ].toUpperCase()}
          </Avatar>
        </div>
        <div className='status-wrapper column is-11 custom-is-11'>
          <textarea
            className='textarea is-grow'
            rows='5'
            autoComplete='off'
            value={ postText }
            onChange={ setPostTextCB }
            placeholder='Write something ...'
          />
        </div>
      </div>
      <div className='columns is-multiline is-full'>
        <div className='other-options column is-4 is-narrower'>
          <form onReset={ clear }>
            <div className='upload-file'>
              <FontAwesomeIcon icon={ faCamera } />
              <span className='file-input-label'>Media</span>
              <input
                type='file'
                className='input-field'
                accept='image/*'
                ref={ fileInput }
                onChange={ handleFileInputChange }
              />
            </div>
          </form>

        </div>
        <div className='column is-6 is-narrower select-custom'>
          <FormControl>
            <InputLabel id='permission'>Permission</InputLabel>
            <Select
              labelId='permission'
              id='permission-select'
              value={ permission }
              onChange={ setPermissionCB }
            >
              <MenuItem value='public'>public</MenuItem>
              <MenuItem value='followers'>followers</MenuItem>
              <MenuItem value='company'>company</MenuItem>
              <MenuItem value='admins'>admins</MenuItem>
              <MenuItem value='managers'>managers</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='columns is-multiline is-full chip-custom'>
          {fileName && (
          <Chip
            variant='outlined'
            label={ fileName }
            onDelete={ handleDelete }
          />
          )}
        </div>

      </div>
      <div className='break-line'> </div>
      <div className='columns is-multiline is-vcentered create-post-footer'>
        <div className='column is-6'>
          {
            isLoading && (
            <Loader
              className='add-status-loader'
              displayLoaderManually
              enableOverlay={ false }
              size={ 30 }
            />
            )
          }
        </div>
        <div className='column is-6 action'>
          <Button
            variant='contained'
            disabled={ isLoading }
            className='post-status-button align-right post'
            startIcon={ <FontAwesomeIcon className='action-icon' icon={ faPaperPlane } /> }
            onClick={ post }
          >
            post
          </Button>

          <Button
            variant='contained'
            disabled={ isLoading }
            className='post-status-button align-right'
            startIcon={ <FontAwesomeIcon className='action-icon' icon={ faTrashAlt } /> }
            onClick={ clear }
          >
            clear
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
