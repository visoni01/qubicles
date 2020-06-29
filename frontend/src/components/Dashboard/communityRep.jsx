import React from 'react'
import StarRatings from 'react-star-ratings'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const CommunityRep = () => {
  const { isLoading, communityRep } = useSelector((state) => state.communityRep)
  return (
    <div className='feed-channels card-background-color'>
      <div className='custom-header'>
        Your Community Reputation
      </div>
      {
        !isLoading && communityRep.length && communityRep.map(({ likes, rating, followers }, index) => (
          <div className='menu-items' key={ `${ likes }-${ rating }-${ followers }` }>
            <div className='mb-22'>
              <div className='mb-4'>
                <StarRatings
                  rating={ rating }
                  starRatedColor='orange'
                  numberOfStars={ 5 }
                  name='rating'
                  starDimension='25px'
                  starSpacing='5px'
                />
              </div>
              <div className='mb-4'>
                <FontAwesomeIcon icon={ faHeart } />
                {` ${ likes } people likes your company`}
              </div>
              <div className='mb-4 font-size-custom'>
                <FontAwesomeIcon icon={ faThumbsUp } />
                {` ${ followers } people are following you`}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default CommunityRep
