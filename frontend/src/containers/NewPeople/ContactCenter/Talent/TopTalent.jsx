import React, { useState } from 'react'
import {
  Avatar, Box, Button,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import './styles.scss'
import PropTypes from 'prop-types'
import { topTalents } from '../testData'
import TopTalentCard from './TopTalentCard'
import TalentCard from './TalentCard'

const TopTalent = ({ heading }) => {
  const [ header, setHeader ] = useState(heading)
  return (
    <Box className='box top-talent-root'>
      <h3>
        {header}
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
}

TopTalent.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default TopTalent
