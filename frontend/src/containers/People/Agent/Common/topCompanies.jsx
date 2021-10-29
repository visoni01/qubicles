import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTopCompaniesStart } from '../../../../redux-saga/redux/actions'
import UserCards from '../../../../components/CommonModal/userCards'
import { COMPANY_PROFILE_ROUTE } from '../../../../routes/routesPath'

export default function TopCompanies({ heading }) {
  const { topCompanies, isLoading } = useSelector((state) => state.fetchTopCompanies)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTopCompaniesStart())
  }, [ dispatch ])

  return (
    <UserCards
      isLoading={ isLoading }
      heading={ heading }
      userData={ topCompanies.map((user) => ({
        itemId: user.clientId,
        itemHeading: user.clientName,
        itemPic: user.clientPic,
        itemRating: user.clientRating,
        itemLink: `${ user.openPositions } open position`,
        itemRoute: `${ COMPANY_PROFILE_ROUTE }/${ user.clientId }/about`,
      })) }
    />
  )
}

TopCompanies.propTypes = {
  heading: PropTypes.string.isRequired,
}
