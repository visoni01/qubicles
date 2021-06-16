import React, { useCallback } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { useSelector, useDispatch } from 'react-redux'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import './style.scss'
import { IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { hideMessage } from '../../redux-saga/redux/actions'

// Note: Component for displaying the message on top right corner
// This component will only be called through the redux action
// For example:
// 1) Success: showMessage({ msg: '' })
// 2) Error: showMessage({ msg: '', error: true })

const CustomSnackbar = () => {
  const { open, msg, error } = useSelector((state) => state.snackbar)

  const dispatch = useDispatch()
  const hideSnackbar = useCallback(() => {
    dispatch(hideMessage())
  }, [ dispatch ])

  return (
    <Snackbar
      classes={ { root: 'snackbar' } }
      anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
      autoHideDuration={ 3000 }
      onClose={ hideSnackbar }
      open={ open }
    >
      <SnackbarContent
        style={ { backgroundColor: error ? '#F14667' : '#4877F4' } }
        message={ msg }
        classes={ {
          message: 'font-size-14x',
        } }
        action={ (
          <IconButton
            className='button-root'
            onClick={ hideSnackbar }
          >
            <FontAwesomeIcon className='custom-fa-icon white pointer sz-sm' icon={ faTimes } />
          </IconButton>
        ) }
      />
    </Snackbar>
  )
}

export default CustomSnackbar
