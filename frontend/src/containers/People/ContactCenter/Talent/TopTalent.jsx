import React from 'react'
import { Box } from '@material-ui/core'
import './styles.scss'
import PropTypes from 'prop-types'
import { topTalents } from '../testData'
import TopTalentCard from './TopTalentCard'

const TopTalent = ({ heading }) => (
  <Box className='custom-box top-talent-root'>
    <h3 className='h3'>
      {heading}
    </h3>
    {
        topTalents.map((talent) => (
          <TopTalentCard
            key={ talent.candidateId }
            candidateName={ talent.candidateName }
            candidateRating={ talent.candidateRating }
            candidatePic={ talent.candidatePic }
            profileName={ talent.profileName }
          />
        ))
      }
  </Box>
)

TopTalent.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default TopTalent
