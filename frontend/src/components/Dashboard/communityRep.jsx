import React from 'react'
import StarRatings from 'react-star-ratings'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { isEmptyObject } from '../../utils/common'

const CommunityRep = () => {
  const { isLoading, communityRep } = useSelector((state) => state.communityRep)
  const likeMsg = communityRep.likes === 1 ? 'person likes your company' : 'people like your company'
  const followMsg = communityRep.subscribers === 1 ? 'person is following you' : 'people are following you'

  return (
    <div className='feed-channels card-background-color'>
      <div className='custom-header'>
        Your Community Reputation
      </div>
      { !isLoading && !isEmptyObject(communityRep) && (
        <div className='mb-22'>
          <div className='mb-4'>
            <StarRatings
              rating={ communityRep.rating }
              starRatedColor='orange'
              numberOfStars={ 5 }
              name='rating'
              starDimension='25px'
              starSpacing='5px'
            />
          </div>
          <div className='mb-4'>
            <FontAwesomeIcon icon={ faHeart } className='like-icon' />
            {` ${ communityRep.likes } ${ likeMsg }`}
          </div>
          <div className='mb-4 font-size-custom'>
            <FontAwesomeIcon icon={ faThumbsUp } className='follow-icon' />
            {` ${ communityRep.subscribers } ${ followMsg }`}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommunityRep
