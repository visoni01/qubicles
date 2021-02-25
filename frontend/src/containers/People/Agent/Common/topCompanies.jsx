import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import TopCompanyCard from './topCompanyCard'
import { fetchTopCompaniesStart } from '../../../../redux-saga/redux/actions'
import TopCompanySkeleton from '../../../../components/People/ContactCenter/SkeletonLoader/TopCompanySkeleton'

export default function TopCompanies({ heading }) {
  const { topCompanies, isLoading, success } = useSelector((state) => state.fetchTopCompanies)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTopCompaniesStart())
  }, [ dispatch ])

  if (isLoading && !success) {
    return (
      <>
        <TopCompanySkeleton />
      </>
    )
  }

  return (
    <Box className='custom-box top-talent-root'>
      <h3 className='h3'>
        {heading}
      </h3>
      {topCompanies.map((company) => (
        <TopCompanyCard
          key={ company.clientId }
          clientId={ company.clientId }
          clientName={ company.clientName }
          clientRating={ company.clientRating }
          clientPic={ company.clientPic }
          openPositions={ company.openPositions }
        />
      ))}
    </Box>
  )
}

TopCompanies.propTypes = {
  heading: PropTypes.string.isRequired,
}
