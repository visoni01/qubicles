import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl, Select, InputLabel, MenuItem, makeStyles, Button, Avatar,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faPen, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
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
      activityPermission: permission,
      file: fileInput.current.files && fileInput.current.files[ 0 ],
      text: postText,
    }
    dispatch(createStatusPostStart(postData))
  }, [ postText, fileInput, permission, dispatch ])

  const { isLoading, success } = useSelector((state) => state.createPost)

  const clear = () => {
    setPostText('')
    setPermission('public')
  }

  useEffect(() => {
    if (success) {
      setPostText('')
      setPermission('public')
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
    <div className='compose-card is-new-content is-start is-vcenter post-section create-post-status'>
      <div className='avatar-container'>
        <Avatar alt='profile-logo-2' src={ profileLogo2 } className='avatar is-hidden-mobile' />
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
        <div className='other-options column is-6 is-narrower'>
          <div className='upload-file'>
            <FontAwesomeIcon icon={ faCamera } />
            <span className='file-input-label'>Media</span>
            <input type='file' className='input-field' accept='image/*' ref={ fileInput } />
          </div>
        </div>
        {(fileInput.current) && (
        <div className='other-options column is-6 is-narrower'>
          <input value={ fileInput.current } />
        </div>
        )}
        <hr />
        <div className='column is-6 is-narrower'>
          <Button
            variant='contained'
            className='publish-button '
            startIcon={ <FontAwesomeIcon icon={ faPen } /> }
            onClick={ publish }
          >
            publish
          </Button>
        </div>
        <div className='column is-6 is-narrower'>
          <Button
            variant='contained'
            className='publish-button '
            startIcon={ <FontAwesomeIcon icon={ faMinusCircle } /> }
            onClick={ clear }
          >
            clear
          </Button>
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
