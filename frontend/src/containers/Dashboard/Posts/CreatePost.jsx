import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button, Avatar, List, ListItem, IconButton,
  ListItemText, Radio, Divider, Popover, TextareaAutosize, Box,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown, faImage, faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { createStatusPostStart } from '../../../redux-saga/redux/actions'
import Loader from '../../../components/loaders/circularLoader'
import { terry } from '../../../assets/images/avatar'

const NewCreatePost = () => {
  const [ postText, setPostText ] = useState('')
  const [ permission, setPermission ] = useState({
    value: 'public', label: 'Public',
  })
  const [ fileSrc, setFileSrc ] = useState('')
  const [ anchorEl, setAnchorEl ] = useState(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const fileInput = useRef()
  const dispatch = useDispatch()

  const post = useCallback(() => {
    if (!(postText && postText.trim())) {
      return
    }
    const postData = {
      activityPermission: permission.value,
      file: fileInput.current.files && fileInput.current.files[ 0 ],
      text: postText,
    }
    dispatch(createStatusPostStart(postData))
  }, [ postText, fileInput, permission, dispatch ])

  const setPostTextCB = useCallback((event) => {
    setPostText(event.target.value)
  }, [])

  const setPermissionCB = useCallback((event) => {
    setPermission({
      value: event.target.value,
      label: event.target.name,
    })
    setAnchorEl(null)
  }, [])

  const { isLoading, success } = useSelector((state) => state.createPost)
  const clear = () => {
    setPostText('')
    setPermission({
      value: 'public', label: 'Public',
    })
    fileInput.current.value = ''
    setFileSrc('')
  }

  const handleDelete = () => {
    fileInput.current.value = ''
    setFileSrc('')
  }

  useEffect(() => {
    if (success) {
      setPostText('')
      setPermission({
        value: 'public', label: 'Public',
      })
      fileInput.current.value = ''
      setFileSrc('')
    }
  }, [ success, isLoading ])

  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files[ 0 ]
    const reader = new FileReader()

    reader.onloadend = () => {
      setFileSrc(
        reader.result,
      )
    }
    reader.readAsDataURL(file)
  }, [])

  return (
    <Box className='custom-box mb-25'>
      <div
        className='create-post-container'
        style={ { pointerEvents: isLoading ? 'none' : 'auto' } }
      >
        <Avatar className='comment-avatar' alt='Remy Sharp' src={ terry } />
        <div className='create-post'>
          <div className='post-content'>
            <TextareaAutosize
              aria-label='minimum height'
              autoComplete='off'
              rowsMin={ 3 }
              value={ postText }
              onChange={ setPostTextCB }
              placeholder='Write something...'
            />

            {fileSrc && (
            <div className='post-image'>
              <img alt='post' src={ fileSrc } height='300px' />
              <IconButton onClick={ handleDelete }>
                <FontAwesomeIcon icon={ faTimesCircle } />
              </IconButton>
            </div>
            )}
          </div>

          { postText && (
          <div className='postButtons'>
            <Button
              disabled={ isLoading }
              color='secondary'
              className='cancel-button'
              onClick={ clear }
            >
              Cancel
            </Button>

            <div>
              { isLoading && (
              <Loader
                className='add-status-loader'
                displayLoaderManually
                enableOverlay={ false }
                size={ 30 }
              />
              )}
            </div>

            <div>
              <Button
                variant='contained'
                aria-describedby={ id }
                disabled={ isLoading }
                aria-controls='customized-menu'
                aria-haspopup='true'
                className='button-secondary-small permission-button'
                classes={ { label: 'secondary-label' } }
                endIcon={ <FontAwesomeIcon className='icon-hover' icon={ faChevronDown } /> }
                onClick={ handleClick }
              >
                {permission.label}
              </Button>
              <Popover
                id={ id }
                open={ open }
                anchorEl={ anchorEl }
                onClose={ handleClose }
                elevation={ 0 }
                anchorOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'center',
                } }
                transformOrigin={ {
                  vertical: 'top',
                  horizontal: 'center',
                } }
              >
                <List component='nav' aria-label='permission-list' className='permission-list-container'>
                  <ListItemText primary='Who can see your posts?' />
                  <ListItem className='permission-list-item'>
                    <ListItemText
                      primary='Public'
                      secondary='Anyone on Qubicles'
                    />
                    <Radio
                      checked={ permission.value === 'public' }
                      onChange={ setPermissionCB }
                      value='public'
                      name='Public'
                      color='primary'
                      inputProps={ { 'aria-label': 'public' } }
                    />
                  </ListItem>
                  <Divider component='li' />
                  <ListItem className='permission-list-item'>
                    <ListItemText
                      primary='Followers'
                      secondary='Your followers'
                    />
                    <Radio
                      checked={ permission.value === 'followers' }
                      onChange={ setPermissionCB }
                      value='followers'
                      name='Followers'
                      color='primary'
                      inputProps={ { 'aria-label': 'followers' } }
                    />
                  </ListItem>
                  <Divider component='li' />
                  <ListItem className='permission-list-item'>
                    <ListItemText
                      primary='Company'
                      secondary='Members of your company'
                    />
                    <Radio
                      checked={ permission.value === 'company' }
                      onChange={ setPermissionCB }
                      value='company'
                      name='Company'
                      color='primary'
                      inputProps={ { 'aria-label': 'company' } }
                    />
                  </ListItem>
                  <Divider component='li' />
                  <ListItem className='permission-list-item'>
                    <ListItemText
                      primary='Admins'
                      secondary='Admins of your company'
                    />
                    <Radio
                      checked={ permission.value === 'admins' }
                      onChange={ setPermissionCB }
                      value='admins'
                      name='Admins'
                      color='primary'
                      inputProps={ { 'aria-label': 'admins' } }
                    />
                  </ListItem>
                  <Divider component='li' />
                  <ListItem className='permission-list-item'>
                    <ListItemText
                      primary='Managers'
                      secondary='Managers of your company'
                    />
                    <Radio
                      checked={ permission.value === 'managers' }
                      onChange={ setPermissionCB }
                      value='managers'
                      name='Managers'
                      color='primary'
                      inputProps={ { 'aria-label': 'managers' } }
                    />
                  </ListItem>
                </List>
              </Popover>
              <Button
                variant='contained'
                disabled={ isLoading }
                className='button-primary-small post-button'
                classes={ { label: 'primary-label' } }
                onClick={ post }
              >
                Post
              </Button>
            </div>
          </div>
          )}
        </div>

        <form onReset={ clear }>
          <p className='galley-icon'>
            <input
              type='file'
              className='position-absolute'
              id='photo-input'
              accept='image/*'
              ref={ fileInput }
              onChange={ handleFileInputChange }
            />
            <label htmlFor='photo-input'>
              <FontAwesomeIcon icon={ faImage } className='image-icon' />
            </label>
          </p>
        </form>
      </div>
    </Box>
  )
}

export default NewCreatePost
