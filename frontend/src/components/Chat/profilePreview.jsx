import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, Popover } from '@material-ui/core'
import { defaultUser } from '../../assets/images/avatar'

const ProfilePreview = ({
  open, anchorEl, handleClose, profilePic, name, selfMessage,
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
      <h4 className='h4 margin-10'>{name || 'N/A'}</h4>
    </Card>
  </Popover>
)

ProfilePreview.defaultProps = {
  profilePic: '',
  name: '',
  selfMessage: false,
}

ProfilePreview.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Element).isRequired,
  handleClose: PropTypes.func.isRequired,
  profilePic: PropTypes.string,
  name: PropTypes.string,
  selfMessage: PropTypes.bool,
}

export default ProfilePreview
