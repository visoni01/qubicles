import React from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import { topCompanies } from '../../ContactCenter/testData'
import TopCompanyCard from './TopCompanyCard'

export default function TopComapnies({ heading }) {
  return (
    <Box className='custom-box top-talent-root'>
      <h3 className='h3'>
        {heading}
      </h3>
      {topCompanies.map((talent) => (
        <TopCompanyCard
          key={ talent.clientId }
          clientName={ talent.clientName }
          clientRating={ talent.clientRating }
          clientPic={ talent.clientPic }
        />
      ))}
    </Box>
  )
}

TopComapnies.propTypes = {
  heading: PropTypes.string.isRequired,
}
