import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, Popover } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { defaultUser } from '../../assets/images/avatar'
import { COMPANY_PROFILE_ROUTE, PROFILE_ROUTE } from '../../routes/routesPath'

const ProfilePreview = ({
  open, anchorEl, handleClose, userId, clientId, profilePic, name, selfMessage,
}) => (
  <Popover
    open={ open }
    anchorEl={ anchorEl }
    onClose={ handleClose }
    elevation={ 0 }
    anchorOrigin={ {
      vertical: 'top',
      horizontal: `${ selfMessage ? 'left' : 'right' }`,
    } }
    transformOrigin={ {
      vertical: 'top',
      horizontal: `${ selfMessage ? 'right' : 'left' }`,
    } }
    classes={ {
      paper: `profile-popover ${ selfMessage ? 'margin-left-reverse-10' : 'ml-10' }`,
    } }
  >
    <Card className='profile-card'>
      <CardMedia
        image={ profilePic || defaultUser }
        className='profile-picture'
      />
      <h4 className='h4 ml-10 mt-10'>{name || 'N/A'}</h4>
      <Link
        className='text-link ml-10'
        to={ `${ clientId ? COMPANY_PROFILE_ROUTE : PROFILE_ROUTE }/${ clientId || userId }/feed` }
        target='_blank'
      >
        View Profile
      </Link>
    </Card>
  </Popover>
)

ProfilePreview.defaultProps = {
  clientId: null,
  profilePic: '',
  name: '',
  selfMessage: false,
}

ProfilePreview.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Element).isRequired,
  handleClose: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  clientId: PropTypes.number,
  profilePic: PropTypes.string,
  name: PropTypes.string,
  selfMessage: PropTypes.bool,
}

export default ProfilePreview
