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
import PropTypes from 'prop-types'
import _ from 'lodash'
import { createStatusPostStart, startLoader, stopLoader } from '../../../../redux-saga/redux/actions'
import { postStatusPermissions } from '../../../People/ContactCenter/constants'

const CreatePost = ({ initialPostData }) => {
  const [ postText, setPostText ] = useState(initialPostData.postText)
  const [ permission, setPermission ] = useState(initialPostData.permission)
  const [ fileSrc, setFileSrc ] = useState(initialPostData.fileSrc)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const { isLoading, success } = useSelector((state) => state.createPost)
  const { userDetails } = useSelector((state) => state.login)
  const { settings: clientSettings } = useSelector((state) => state.clientDetails)
  const { settings: agentSettings } = useSelector((state) => state.agentDetails)

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
      activityPermission: permission,
      file: fileSrc,
      text: postText,
    }
    dispatch(createStatusPostStart(postData))
  }, [ postText, permission, dispatch, fileSrc ])

  const setPostTextCB = useCallback((event) => {
    setPostText(event.target.value)
  }, [])

  const setPermissionCB = useCallback((event) => {
    setPermission(event.target.value)
    setAnchorEl(null)
  }, [])

  const clear = () => {
    setPostText('')
    setPermission('public')
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
      setPermission('public')
      fileInput.current.value = ''
      setFileSrc('')
    }
  }, [ success, isLoading ])

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoader())
    } else {
      dispatch(stopLoader())
    }
  }, [ dispatch, isLoading ])

  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[ 0 ]
    const reader = new FileReader()

    if (file) {
      const fileUrl = URL.createObjectURL(file)

      reader.onloadend = () => {
        setFileSrc(fileUrl)
      }

      if (event.target.files[ 0 ]) {
        reader.readAsDataURL(file)
      }
    }
  }, [])

  return (
    <Box className='custom-box mb-25'>
      <div
        className='create-post-container display-inline-flex is-fullwidth'
        style={ { pointerEvents: isLoading ? 'none' : 'auto' } }
      >
        <Avatar
          className='comment-avatar'
          alt={ userDetails.full_name }
          src={ _.isEqual(userDetails.user_code, 'employer') ? clientSettings.profilePic : agentSettings.profilePic }
        />
        <div className='create-post'>
          <div className='post-content'>
            <TextareaAutosize
              aria-label='minimum height'
              autoComplete='off'
              rowsMin={ 3 }
              value={ postText }
              onChange={ setPostTextCB }
              placeholder='Write something...'
              className='para'
            />

            {fileSrc && (
              <div className='post-image-container'>
                <div className='post-image'>
                  <div className='image-container'>
                    <img alt='post' src={ fileSrc } height='300px' />
                    <IconButton onClick={ handleDelete }>
                      <FontAwesomeIcon className='custom-fa-icon white pointer sz-xl' icon={ faTimesCircle } />
                    </IconButton>
                  </div>
                </div>
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
                  {postStatusPermissions[ permission ].label}
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
              id='create-post-photo-input'
              accept='image/*'
              ref={ fileInput }
              onChange={ handleFileInputChange }
            />
            <label htmlFor='create-post-photo-input'>
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
          classes={ { paper: 'mt-10' } }
        >
          <RadioGroup
            className='radio-buttons border-2 activity-permission-filter'
            value={ permission }
            onChange={ setPermissionCB }
          >
            <div className='mt-5 ml-10 mr-10'>
              <h4 className='h4'> Who can see your posts ? </h4>
            </div>
            {Object.keys(postStatusPermissions).map((item) => (
              <FormControlLabel
                key={ item }
                value={ item }
                className='display-inline-flex justify-between mt-5'
                control={ <Radio /> }
                labelPlacement='start'
                label={ (
                  <div className='mt-5'>
                    <h4 className='h4'>
                      {postStatusPermissions[ item ].label}
                    </h4>
                    <p className='para'>{postStatusPermissions[ item ].secondaryLabel}</p>
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

CreatePost.defaultProps = {
  initialPostData: {
    postText: '',
    fileSrc: '',
    permission: 'public',
  },
}

CreatePost.propTypes = {
  initialPostData: PropTypes.shape({
    postText: PropTypes.string.isRequired,
    fileSrc: PropTypes.string.isRequired,
    permission: PropTypes.string.isRequired,
  }),
}

export default CreatePost
