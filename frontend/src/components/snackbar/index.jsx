import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { useSelector, useDispatch } from 'react-redux'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { hideMessage } from '../../redux-saga/redux/actions'
import './style.scss'

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
      anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
      autoHideDuration={ 3000 }
      open={ open }
    >
      <SnackbarContent
        style={ { backgroundColor: error ? '#f4443e' : '#4caf50' } }
        message={ msg }
        action={ <Button size='small' className='button-root' onClick={ hideSnackbar }>x</Button> }
      />
    </Snackbar>
  )
}

export default CustomSnackbar
