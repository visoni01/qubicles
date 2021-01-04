import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button, Avatar, IconButton,
  Radio, Popover, TextareaAutosize, Box, RadioGroup, FormControlLabel, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown, faImage, faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { createStatusPostStart } from '../../../redux-saga/redux/actions'
import Loader from '../../../components/loaders/circularLoader'
import { terry } from '../../../assets/images/avatar'
import { postStatusPermissions } from '../../People/ContactCenter/constants'

const CreateOrEditPost = () => {
  const [ postText, setPostText ] = useState('sd')
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
              classes={ {
                root: 'button-secondary-small-red',
                label: 'button-secondary-small-red-label',
              } }
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
            <Grid container spacing={ 3 } justify='flex-end'>
              <Grid item>
                <Button
                  classes={ {
                    root: 'button-primary-small',
                    label: 'button-primary-small-label pl-5 pr-5',
                  } }
                  endIcon={ <FontAwesomeIcon className='custom-fa-icon white' icon={ faChevronDown } /> }
                  onClick={ handleClick }
                >
                  {permission.label}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  disabled={ isLoading }
                  classes={ {
                    root: 'button-primary-small',
                    label: 'button-primary-small-label',
                  } }
                  onClick={ post }
                >
                  Post
                </Button>
              </Grid>
            </Grid>
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
          <RadioGroup
            className='radio-buttons border-2 activity-permission-filter'
            value={ permission.value }
            onChange={ setPermissionCB }
          >
            <div className='margin-10'>
              <h4 className='h4'> Who can see your posts ? </h4>
            </div>
            {postStatusPermissions.map((item) => (
              <FormControlLabel
                key={ item.value }
                value={ item.value }
                className='display-inline-flex justify-between mt-5'
                control={ <Radio /> }
                labelPlacement='start'
                name={ item.label }
                label={ (
                  <div className='mt-5'>
                    <h4 className='h4'>
                      {item.label}
                    </h4>
                    <p className='para'>{item.secondaryLabel}</p>
                  </div>
                ) }
              />
            ))}
          </RadioGroup>
        </Popover>
      </div>
    </Box>
  )
}

export default CreateOrEditPost
