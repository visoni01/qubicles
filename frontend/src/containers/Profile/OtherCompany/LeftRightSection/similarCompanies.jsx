import React from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import { similarCompanies } from '../testData'
import CompaniesSuggestionsCard from './companiesSuggestionsCard'
import '../styles.scss'

const SimilarCompanies = ({ heading }) => (
  <Box className='custom-box company-suggestions-root mt-20'>
    <h3 className='h3'>{heading}</h3>
    {similarCompanies.map((company) => (
      <CompaniesSuggestionsCard
        key={ company.companyId }
        companyName={ company.companyName }
        companyRating={ company.companyRating }
        companyProfilePic={ company.companyProfilePic }
      />
    ))}
  </Box>
)

SimilarCompanies.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default SimilarCompanies
