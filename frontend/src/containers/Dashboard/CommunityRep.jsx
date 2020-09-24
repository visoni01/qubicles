import React from 'react'
import { Box, Grid, Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { AvatarGroup } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import { kareem, sally, thomas } from '../../assets/images/avatar'

const CommunityRep = () => {
  const { isLoading, communityRep } = useSelector((state) => state.communityRep)
  const likeMsg = communityRep.likes === 1 ? 'person likes your company' : 'people liked your company'
  const followMsg = communityRep.subscribers === 1 ? 'person is following you' : 'people are following you'
  return (
    <Box className='box community-rep'>
      <Grid container direction='column' spacing={ 2 }>
        <Grid item xs={ 12 }>
          <h3 className='h3'>
            Your Community Reputation
          </h3>
        </Grid>
        <Grid item xs={ 12 }>
          <Grid container justify='space-evenly' alignItems='center' spacing={ 3 }>
            <Grid item xs={ 6 }>
              <Rating
                className='rating'
                name='read-only'
                readOnly
                size='large'
                value={ communityRep.rating }
                precision={ 0.1 }
              />
            </Grid>
            <Grid item xs={ 3 } className='rating-text'>
              <b>
                {communityRep.rating}
              </b>
            </Grid>
            <Grid item xs={ 3 }>
              <FontAwesomeIcon icon={ faInfoCircle } />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={ 12 } justify='flex-start' alignContent='center'>
          <Grid item xs={ 1 } className='heart-icon'>
            <FontAwesomeIcon icon={ faHeart } />
          </Grid>
          <Grid item xs={ 4 }>
            <AvatarGroup max={ 4 } spacing='small'>
              <Avatar alt='Remy Sharp' src={ kareem } />
              <Avatar alt='Remy Sharp' src={ sally } />
              <Avatar alt='Remy Sharp' src={ thomas } />
            </AvatarGroup>
          </Grid>
          <Grid item xs={ 6 }>
            <p className='like-people'>
              <b style={ { fontSize: '15px' } }>{` ${ 7 } `}</b>
              {likeMsg}
            </p>
          </Grid>
        </Grid>
        <Grid container item xs={ 12 } justify='flex-start' alignContent='center'>
          <Grid item xs={ 1 } className='user-icon'>
            <FontAwesomeIcon icon={ faUser } />
          </Grid>
          <Grid item xs={ 4 }>
            <AvatarGroup max={ 4 } spacing='small'>
              <Avatar alt='Remy Sharp' src={ kareem } />
              <Avatar alt='Remy Sharp' src={ sally } />
              <Avatar alt='Remy Sharp' src={ thomas } />
            </AvatarGroup>
          </Grid>
          <Grid item xs={ 6 }>
            <p className='like-people'>
              <b style={ { fontSize: '15px' } }>{` ${ 14 } `}</b>
              {followMsg}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CommunityRep
