import React from 'react'
import { Box, InputBase } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'
import TalentCard from './TalentCard'
import { talentCards } from '../testData'

const TalentPage = () => (
  <>
    <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
      <div className='search-input'>
        <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
        <InputBase
          placeholder='Search Talent'
          className='input-field'
        />
      </div>
    </div>
    <Box className='talent-page box'>
      {talentCards.map((talentCard) => (
        <TalentCard
          key={ talentCard.candidateId }
          candidateName={ talentCard.candidateName }
          candidatePic={ talentCard.candidatePic }
          availability={ talentCard.availability }
          candidateRating={ talentCard.candidateRating }
          location={ talentCard.location }
          languages={ talentCard.languages }
          ratePerHourDollar={ talentCard.ratePerHourDollar }
          profileName={ talentCard.profileName }
          profileDescription={ talentCard.profileDescription }
          profileTags={ talentCard.profileTags }
        />
      ))}
    </Box>
  </>
)

export default TalentPage
