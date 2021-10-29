import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { COMPANY_PROFILE_ROUTE, PROFILE_ROUTE } from '../../../routes/routesPath'
import ConfirmationModal from '../../../components/CommonModal/confirmationModal'
import { VIEW_MEMBERS } from '../../../redux-saga/redux/constants'

const PersonCard = ({
  id, clientId, name, title, profilePic, userCode, actionType, handleRemove, isRemoved, loading,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  const [ openConfirmBlockModal, setOpenConfirmBlockModal ] = useState(false)

  const handleRemoveUser = useCallback(() => {
    handleRemove({ id, name })
    setOpenConfirmBlockModal(false)
  }, [ handleRemove, id, name ])

  return (
    <div
      className={
        `person-card ${ actionType !== VIEW_MEMBERS ? 'person-card-hover' : '' } ${ loading ? 'no-hover' : '' }`
      }
      id={ id }
    >
      <div className={ `is-flex is-vcenter ${ actionType === VIEW_MEMBERS && 'pt-5 pb-5' }` }>
        <Avatar className='profile-pic' alt={ name } src={ profilePic } />

        {actionType !== VIEW_MEMBERS
          ? (
            <div>
              <h4 className='h4 mb-5'>{name}</h4>
              <p className='para light'>{title}</p>
            </div>
          )
          : (
            <>
              {userDetails.user_id === id
                ? <h4 className='h4 self-name'>You</h4>
                : (
                  <div className='is-flex is-between is-fullwidth mt-10 mr-15'>
                    <div>
                      <h4 className='h4'>{name}</h4>
                      <p className='para light'>{title}</p>
                      <Link
                        className='primary-text-link'
                        to={ `${ userCode === 'agent'
                          ? PROFILE_ROUTE : COMPANY_PROFILE_ROUTE }/${ userCode === 'agent' ? id : clientId }/feed` }
                        target='_blank'
                      >
                        View Profile
                      </Link>
                    </div>

                    {!isRemoved && userDetails.user_id !== id && (
                      <Button
                        classes={ {
                          root: 'remove-button',
                          label: 'primary-text-link-red',
                        } }
                        onClick={ () => setOpenConfirmBlockModal(true) }
                        disabled={ loading }
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                )}
            </>
          )}
      </div>
      <ConfirmationModal
        open={ openConfirmBlockModal }
        handleClose={ () => setOpenConfirmBlockModal(false) }
        message='Are you sure you want to remove this user?'
        confirmButtonText='Yes'
        handleConfirm={ handleRemoveUser }
      />
    </div>
  )
}

PersonCard.defaultProps = {
  clientId: null,
  profilePic: '',
  title: '',
  actionType: '',
  userCode: '',
  handleRemove: () => {},
  isRemoved: false,
  loading: false,
}

PersonCard.propTypes = {
  id: PropTypes.number.isRequired,
  clientId: PropTypes.number,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  profilePic: PropTypes.string,
  userCode: PropTypes.string,
  actionType: PropTypes.string,
  handleRemove: PropTypes.func,
  isRemoved: PropTypes.bool,
  loading: PropTypes.bool,
}

export default PersonCard
