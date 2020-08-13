import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl, Select, InputLabel, MenuItem, makeStyles, Button, Avatar, Chip,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { createStatusPostStart } from '../../redux-saga/redux/actions'
import Loader from '../loaders/circularLoader'
import './style.scss'

const CreatePost = () => {
  const [ postText, setPostText ] = useState(null)
  const [ permission, setPermission ] = useState('public')
  const [ fileName, setFileName ] = useState(null)
  const fileInput = useRef()
  const dispatch = useDispatch()

  const publish = useCallback(() => {
    const postData = {
      activityPermission: permission,
      file: fileInput.current.files && fileInput.current.files[ 0 ],
      text: postText,
    }
    debugger
    dispatch(createStatusPostStart(postData))
  }, [ postText, fileInput, permission, dispatch ])

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
  }, [ isLoading, success ])

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    customLabel: {
      color: '#888da8',
    },
    selectColor: {
      background: '#f7f7f7',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }))
  const classes = useStyles()
  return (
    <div
      className='compose-card is-new-content post-item-custom is-start is-vcenter post-section create-post-status'
      style={ { pointerEvents: isLoading ? 'none' : 'auto' } }
    >
      <div className='columns is-vcentered'>
        <div className='column is-1'>
          <Avatar className='avatar'>
            {userDetails && userDetails.full_name && userDetails.full_name[ 0 ].toUpperCase()}
          </Avatar>
        </div>
        <div className='status-wrapper column is-11'>
          <textarea
            className='textarea'
            rows='6'
            autoComplete='off'
            value={ postText }
            onChange={ (event) => setPostText(event.target.value) }
            placeholder='Write something ...'
          />
        </div>
      </div>
      <div className='columns is-multiline is-full'>
        <div className='other-options column is-6 is-narrower'>
          <form onReset={ clear }>
            <div className='upload-file'>
              <FontAwesomeIcon icon={ faCamera } />
              <span className='file-input-label'>Media</span>
              <input type='file' className='input-field' accept='image/*' ref={ fileInput } onChange={ (event) => setFileName(fileInput.current.files[ 0 ].name) } />
            </div>
          </form>
          {fileName && (
          <Chip
            variant='outlined'
            label={ fileName }
            onDelete={ handleDelete }
          />
          )}
        </div>
        <div className='column is-6 is-narrower'>
          <FormControl variant='filled' className={ classes.formControl }>
            <InputLabel FormControlClasses={ { focused: classes.customLabel } } id='permission'>Permission</InputLabel>
            <Select
              labelId='permission'
              id='permission-select'
              value={ permission }
              onChange={ (event) => setPermission(event.target.value) }
              classes={ { inkbar: classes.selectColor } }
            >
              <MenuItem value='public'>public</MenuItem>
              <MenuItem value='followers'>followers</MenuItem>
              <MenuItem value='company'>company</MenuItem>
              <MenuItem value='admins'>admins</MenuItem>
              <MenuItem value='managers'>managers</MenuItem>
            </Select>
          </FormControl>
        </div>
        <hr />
        <div className='columns is-multiline is-vcentered'>
          <div className='column is-one-third '>
            <Button
              variant='contained'
              className='post-status-button '
              startIcon={ <FontAwesomeIcon icon={ faPen } /> }
              onClick={ publish }
            >
              publish
            </Button>
          </div>
          <div className='column is-one-third '>
            { isLoading && (
            <div>
              <Loader
                className='add-status-loader'
                displayLoaderManually
                enableOverlay={ false }
                size={ 40 }
              />
            </div>
            ) }
          </div>
          <div className='column is-one-third'>
            <Button
              variant='contained'
              className='post-status-button  '
              startIcon={ <FontAwesomeIcon icon={ faTrashAlt } /> }
              onClick={ clear }
            >
              clear
            </Button>
          </div>
        </div>
      </div>

    </div>

  )
}

export default CreatePost
