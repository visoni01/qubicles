import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import TalentCard from '../../../../components/People/ContactCenter/Talent/talentCard'
import TalentCardSkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/Talent/talentCardSkeleton'
import './styles.scss'
import TalentSearch from './talentSearch'

const TalentPage = () => {
  const { isLoading, talentCards } = useSelector((state) => state.peopleTalentCards)

  return (
    <>
      <TalentSearch />
      <Box className='custom-box'>
        {/* Talent Cards */}
        {!isLoading && talentCards && talentCards.length > 0 && talentCards.map((talentCard) => (
          <TalentCard
            key={ talentCard.candidateId }
            candidateId={ talentCard.candidateId }
            candidateName={ talentCard.candidateName }
            candidatePic={ talentCard.candidatePic }
            availability={ talentCard.availability }
            candidateRating={ talentCard.candidateRating }
            location={ talentCard.location }
            languages={ talentCard.languages }
            ratePerHourDollar={ talentCard.ratePerHourDollar }
            profileName={ talentCard.profileName }
            profileDescription={ talentCard.profileDescription }
            skills={ talentCard.skills }
          />
        ))}
        {!isLoading && talentCards && talentCards.length === 0 && (
        <div className='mt-10 mb-10'>
          <div className='text-align-last-center'>
            <h3 className=' h3'>No matching results found!</h3>
            <h4 className='h4 unbold light'> Please try again with different filter options...</h4>
          </div>
        </div>
        )}
        {/* Talent Card Loading Skeleton */}
        {isLoading && (
        <>
          {[ ...Array(3).keys() ].map((val) => (
            <TalentCardSkeleton key={ val } />
          ))}
        </>
        )}
      </Box>
    </>
  )
}

export default TalentPage
