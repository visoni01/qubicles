import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV, faTrash,
} from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem, IconButton,
} from '@material-ui/core'
import { deletePostComment } from '../../redux-saga/redux/actions'

const PostCommentAction = ({
  userActivityId, postUserActivityId, content,
}) => {
  const dispatch = useDispatch()

  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const deletePostCommentHandler = useCallback(() => {
    setAnchorEl(null)
    dispatch(deletePostComment({ userActivityId, postUserActivityId, content }))
    // eslint-disable-next-line
  }, [ userActivityId, dispatch ])

  return (
    <>
      <div className='dropdown is-right dropdown-trigger styled-dropdown is-round is-active'>
        <IconButton onClick={ handleClick }>
          <FontAwesomeIcon icon={ faEllipsisV } className='is-size-6' />
        </IconButton>
        <div className='post-comment-dropdown'>
          <Menu
            PopoverClasses={ {
              root: 'post-comment-dropdown-menu',
            } }
            id='menu'
            anchorEl={ anchorEl }
            keepMounted
            open={ Boolean(anchorEl) }
            onClose={ handleClose }
          >
            <MenuItem
              onClick={ deletePostCommentHandler }
            >
              <FontAwesomeIcon icon={ faTrash } />
              <span className='menu-item'>
                Remove
              </span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  )
}

PostCommentAction.propTypes = {
  userActivityId: PropTypes.string.isRequired,
  postUserActivityId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default PostCommentAction
