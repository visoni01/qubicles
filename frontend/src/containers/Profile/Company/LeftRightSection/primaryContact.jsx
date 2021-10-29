import React from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import { primaryContacts } from '../testData'
import PrimaryContactCard from './primaryContactCard'
import '../styles.scss'

const PrimaryContact = ({ heading }) => (
  <Box className='custom-box top-talent-root'>
    <h3 className='h3'>{heading}</h3>
    {primaryContacts.map((talent) => (
      <PrimaryContactCard
        key={ talent.candidateId }
        candidateName={ talent.candidateName }
        candidateRating={ talent.candidateRating }
        candidatePic={ talent.candidatePic }
        profileName={ talent.profileName }
      />
    ))}
  </Box>
)

PrimaryContact.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default PrimaryContact
