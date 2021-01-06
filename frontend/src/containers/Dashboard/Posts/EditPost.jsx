import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button, IconButton,
  Radio, Popover, TextareaAutosize, RadioGroup, FormControlLabel, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown, faImage, faTimes,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { updatePostStatus } from '../../../redux-saga/redux/actions'
import Loader from '../../../components/loaders/circularLoader'
import { postStatusPermissions } from '../../People/ContactCenter/constants'
import PostHead from './PostHead'

const EditPost = ({
  postId, initialPostData, owner, createdAt, handleCancelEdit,
}) => {
  const [ postText, setPostText ] = useState(initialPostData.postText)
  const [ permission, setPermission ] = useState(initialPostData.permission)
  const [ fileSrc, setFileSrc ] = useState(initialPostData.postImage)
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
  const updatePost = useCallback(() => {
    if (!(postText && postText.trim())) {
      return
    }
    const postData = {
      // activityPermission: permission,
      userActivityId: postId,
      file: fileInput.current.files && fileInput.current.files[ 0 ],
      text: postText,
      removeCurrentImage: _.isEmpty(fileSrc),
    }
    dispatch(updatePostStatus(postData))
    handleCancelEdit()
  }, [ postText, postId, fileInput, fileSrc, dispatch, handleCancelEdit ])

  const setPostTextCB = useCallback((event) => {
    setPostText(event.target.value)
  }, [])

  const setPermissionCB = useCallback((event) => {
    setPermission(event.target.value)
    setAnchorEl(null)
  }, [])

  const { isLoading, success } = useSelector((state) => state.createPost)
  const clear = () => {
    handleCancelEdit()
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
    <>

      <div
        className='create-post-container text-align-end'
        style={ { pointerEvents: isLoading ? 'none' : 'auto' } }
      >
        <Grid container spacing={ 3 } justify='space-between' className='pr-10 pb-10' alignItems='flex-end'>
          <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 6 }>
            <PostHead
              owner={ owner }
              createdAt={ createdAt }
            />
          </Grid>
          <Grid item container justify='flex-end' xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 6 } spacing={ 1 }>
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
              <form onReset={ clear }>
                <p className='galley-icon'>
                  <input
                    type='file'
                    className='position-absolute'
                    id='edit-post-photo-input'
                    accept='image/*'
                    ref={ fileInput }
                    onChange={ handleFileInputChange }
                  />
                  <label htmlFor='edit-post-photo-input'>
                    <FontAwesomeIcon icon={ faImage } className='image-icon' />
                  </label>
                </p>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <div className='create-post is-fullwidth'>
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
                    <FontAwesomeIcon className='custom-fa-icon white pointer' icon={ faTimes } />
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
            <Button
              variant='contained'
              disabled={ isLoading }
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
              onClick={ updatePost }
            >
              Save Post
            </Button>

          </div>
          )}
        </div>
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
    </>
  )
}

EditPost.defaultProps = {
  initialPostData: {
    postText: '',
    postImage: '',
    permission: 'public',
  },
}

EditPost.propTypes = {
  postId: PropTypes.number.isRequired,
  initialPostData: PropTypes.shape({
    postText: PropTypes.string.isRequired,
    postImage: PropTypes.string.isRequired,
    permission: PropTypes.string.isRequired,
  }),
  owner: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
}

export default EditPost
