import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  FormControl, Select, InputLabel, MenuItem, Button, Avatar, Chip,
  Container, List, ListItem, ListItemText, Radio, Divider, Menu, Popover, Grid, IconButton, TextareaAutosize,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCamera, faPaperPlane, faTrashAlt, faChevronDown, faImage, faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { boolean } from 'yup'
import { createStatusPostStart } from '../../redux-saga/redux/actions'
import Loader from '../loaders/circularLoader'
import './style.scss'
import { shortenFileName } from '../../utils/common'

const NewCreatePost = () => {
  const [ postText, setPostText ] = useState('')
  const [ permission, setPermission ] = useState({
    value: 'public', label: 'Public',
  })
  const [ fileName, setFileName ] = useState(null)
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
    // setPermission(event.target.value)
    setPermission({
      value: event.target.value,
      label: event.target.name,
    })
  }, [])

  const { isLoading, success } = useSelector((state) => state.createPost)
  const { userDetails } = useSelector((state) => state.login)
  const clear = () => {
    setPostText('')
    setPermission({
      value: 'public', label: 'Public',
    })
    fileInput.current.value = ''
    setFileName(null)
    setFileSrc('')
  }

  const handleDelete = () => {
    fileInput.current.value = ''
    setFileName(null)
    setFileSrc('')
  }

  useEffect(() => {
    if (success) {
      setPostText('')
      setPermission({
        value: 'public', label: 'Public',
      })
      fileInput.current.value = ''
      setFileName(null)
      setFileSrc('')
    }
  }, [ success, isLoading ])

  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    // console.log('fileInputt=====>>>>>', fileInput)
    // console.log('fileInput.current=====>>>>>', fileInput.current)
    const fileObj = fileInput.current.files[ 0 ]
    const file = event.target.files[ 0 ]
    // fileObj.srcObject = stream
    // setFileSrc(stream)
    // console.log('stream=====>>>>>', stream)
    // setFileSrc(URL.createObjectURL(fileObj))
    // const shortFileName = shortenFileName(fileObj)
    // setFileName(shortFileName)
    const reader = new FileReader()
    // const file = fileObj

    reader.onloadend = () => {
      setFileSrc(
        // file: file,
        reader.result,
      )
    }

    reader.readAsDataURL(file)
  }, [])

  return (
    <div
      className='is-new-content  is-start is-vcenter'
      style={ { pointerEvents: isLoading ? 'none' : 'auto' } }
    >

      <Grid container spacing={ 1 }>
        <div className='textarea-input'>
          <Grid item xs={ 1 }>
            <Avatar className='avatar'>
              {userDetails && userDetails.full_name && userDetails.full_name[ 0 ].toUpperCase()}
            </Avatar>
          </Grid>
          {/* <form onReset={ clear }> */}
          <Grid item xs={ 11 }>
            <div className='post-content'>
              {/* <textarea
                // className='textarea'
                rows='5'
                autoComplete='off'
                value={ postText }
                onChange={ setPostTextCB }
                placeholder='Write something ...'
              /> */}
              <TextareaAutosize
                aria-label='minimum height'
                autoComplete='off'
                rowsMin={ 3 }
                value={ postText }
                onChange={ setPostTextCB }
                placeholder='Write something ...'
              />
              {fileSrc && (
              <div className='post-image'>
                <img alt='post' src={ fileSrc } height='300px' />
                <IconButton onClick={ handleDelete }>
                  <FontAwesomeIcon icon={ faTimesCircle } />
                </IconButton>
              </div>
              )}

              { postText && (
              <div className='postButtons'>
                <Container>
                  {/* <Grid container spacing={ 3 }> */}
                  {/* <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }> */}
                  <Button
                    disabled={ isLoading }
                    color='secondary'
                    className='cancel-button'
                    onClick={ clear }
                  >
                    cancel
                  </Button>
                  {/* </Grid> */}
                  {/* <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }> */}
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
                    <List component='nav' aria-label='main mailbox folders'>
                      <ListItemText primary='Who can see your posts?' />
                      <ListItem>
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
                      <ListItem>
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
                      <ListItem>
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
                      <ListItem>
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
                      <ListItem>
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
                  {/* </Grid> */}
                  {/* <Grid item xs={ 2 } xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }> */}
                  <Button
                    variant='contained'
                    disabled={ isLoading }
                    className='button-primary-small post-button'
                    classes={ { label: 'primary-label' } }
                    onClick={ post }
                  >
                    post
                  </Button>
                  {/* </Grid> */}
                  {/* </Grid> */}
                </Container>
              </div>
              )}
            </div>
          </Grid>
          {/* <input type='file' name='' className='position-absolute' /> */}
          <Grid item xs={ 1 }>
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
                  <FontAwesomeIcon icon={ faImage } />
                </label>
              </p>
            </form>
          </Grid>
        </div>
      </Grid>
      {/* <div className='column is-6'>
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
        </div> */}

    </div>

  )
}

export default NewCreatePost
