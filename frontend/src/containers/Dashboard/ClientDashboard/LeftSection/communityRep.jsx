import React, { useEffect } from 'react'
import { Box, Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { AvatarGroup } from '@material-ui/lab'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import { kareem, sally, thomas } from '../../../../assets/images/avatar'
import { communityRepDataFechingStart } from '../../../../redux-saga/redux/actions'

const CommunityRep = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(communityRepDataFechingStart())
  }, [ dispatch ])

  const { isLoading, communityRep } = useSelector((state) => state.communityRep)
  const likeMsg = communityRep.likes === 1 ? 'person likes your company' : 'people liked your company'
  const followMsg = communityRep.subscribers === 1 ? 'person is following you' : 'people are following you'
  const { settings } = useSelector((state) => state.clientDetails)

  return (
    <Box className='custom-box mb-25 community-rep'>
      <h3 className='h3 mb-15'>
        Your Community Reputation
      </h3>

      {/* Rating */}
      <div className='rating'>
        {!isLoading && (
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='large'
            value={ settings.rating }
            precision={ 0.5 }
          />
        )}
        <span className='h3 rating-text'>
          {settings.rating}
        </span>
        <FontAwesomeIcon icon={ faInfoCircle } className='rating-info' />
      </div>

      {/* Likes */}
      <div className='rep-info'>
        <FontAwesomeIcon icon={ faHeart } className='fa-icon heart-icon' />
        <AvatarGroup max={ 4 } spacing='small' className='avatar-group'>
          <Avatar alt='Remy Sharp' src={ kareem } />
          <Avatar alt='Remy Sharp' src={ sally } />
          <Avatar alt='Remy Sharp' src={ thomas } />
        </AvatarGroup>
        <p className='para'>
          <b className='h3'>{` ${ communityRep.likes } `}</b>
          <span className='text'>{likeMsg}</span>
        </p>
      </div>

      {/* Followers */}
      <div className='rep-info'>
        <FontAwesomeIcon icon={ faUser } className='fa-icon user-icon' />
        <AvatarGroup max={ 4 } spacing='small' className='avatar-group'>
          <Avatar alt='Remy Sharp' src={ kareem } />
          <Avatar alt='Remy Sharp' src={ sally } />
          <Avatar alt='Remy Sharp' src={ thomas } />
        </AvatarGroup>
        <p className='para'>
          <b className='h3'>{` ${ communityRep.subscribers } `}</b>
          <span className='text'>{followMsg}</span>
        </p>
      </div>

    </Box>
  )
}

export default CommunityRep
