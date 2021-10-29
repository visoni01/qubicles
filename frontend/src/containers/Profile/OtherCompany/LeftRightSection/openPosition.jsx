import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import OpenPositionsCard from '../../../../components/Profile/OtherCompany/LeftRightSection/openPositionsCard'
import { COMPANY_PROFILE_ROUTE } from '../../../../routes/routesPath'

const OpenPosition = ({ companyId }) => {
  let { jobsWithCategories } = useSelector((state) => state.jobsWithCategories)

  const history = useHistory()
  jobsWithCategories = jobsWithCategories.filter((job, index) => index < 3)

  return (
    <Box className='custom-box'>
      <h3 className='h3'> Open Positions </h3>

      {jobsWithCategories.map((jobCategory) => (
        jobCategory.jobs.length && (
          <OpenPositionsCard
            key={ jobCategory.categoryId }
            categoryTitle={ jobCategory.categoryTitle }
            jobs={ jobCategory.jobs }
          />
        )))}

      <div className='mb-20 is-flex is-center'>
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
          onClick={ () => history.push(`${ COMPANY_PROFILE_ROUTE }/${ companyId }/about`) }
        >
          View All Jobs
        </Button>
      </div>
    </Box>
  )
}

OpenPosition.propTypes = {
  companyId: PropTypes.number.isRequired,
}

export default OpenPosition
