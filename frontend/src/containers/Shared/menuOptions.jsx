import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { MenuIcon } from '../../assets/images/common'
import ConfirmationModal from '../../components/CommonModal/confirmationModal'

const MenuOptions = ({
  id, handleFirstOptionClick, handleConfirmModal, confirmButtonText, firstOption,
  secondOption, FirstIcon, SecondIcon, message,
}) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openConfirmDeleteModal, setOpenConfirmDelete ] = useState(false)

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    setOpenOptions(false)
  }, [])

  const handleOptionClick = useCallback((e) => {
    setAnchorEl(e.currentTarget)
    setOpenOptions((current) => !current)
  }, [])

  const handleCancelActivity = useCallback(() => {
    handleClose()
    setOpenConfirmDelete(false)
  }, [ handleClose ])

  const handleFirstOption = useCallback(() => {
    handleClose()
    handleFirstOptionClick()
  }, [ handleClose, handleFirstOptionClick ])

  const handleConfirmModalClick = useCallback(() => {
    handleClose()
    setOpenConfirmDelete(false)
    handleConfirmModal({ id })
  }, [ handleClose, handleConfirmModal, id ])

  return (
    <>
      <IconButton
        onClick={ handleOptionClick }
      >
        <MenuIcon />
      </IconButton>

      <Popover
        open={ openOptions }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        elevation={ 0 }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'right',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'right',
        } }
        className='menu-options'
      >
        <div className='ellipsis-options-menu border-2'>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ handleFirstOption }
            startIcon={ <FirstIcon className='mr-5' /> }
          >
            <p className='para'>{firstOption}</p>
          </Button>

          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ () => setOpenConfirmDelete(true) }
            startIcon={ <SecondIcon className='custom-svg-icon color-red mr-5' /> }
          >
            <p className='para red'>{secondOption}</p>
          </Button>
        </div>
      </Popover>

      <ConfirmationModal
        open={ openConfirmDeleteModal }
        handleClose={ handleCancelActivity }
        message={ message }
        confirmButtonText={ confirmButtonText }
        handleConfirm={ handleConfirmModalClick }
      />
    </>
  )
}

MenuOptions.defaultProps = {
  id: null,
}

MenuOptions.propTypes = {
  id: PropTypes.number,
  handleFirstOptionClick: PropTypes.func.isRequired,
  handleConfirmModal: PropTypes.func.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  firstOption: PropTypes.string.isRequired,
  secondOption: PropTypes.string.isRequired,
  FirstIcon: PropTypes.instanceOf(Object).isRequired,
  SecondIcon: PropTypes.instanceOf(Object).isRequired,
  message: PropTypes.string.isRequired,
}

export default MenuOptions
