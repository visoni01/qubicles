import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import UserCards from '../../../../components/CommonModal/userCards'
import { fetchAgentTopDataStart } from '../../../../redux-saga/redux/people'
import { PROFILE_ROUTE } from '../../../../routes/routesPath'
import { TOP_TALENT } from '../../../../redux-saga/redux/constants'

const TopTalent = ({ heading }) => {
  const { agentTopData, isLoading } = useSelector((state) => state.agentTopData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAgentTopDataStart({
      dataType: TOP_TALENT,
    }))
  }, [ dispatch ])

  return (
    <UserCards
      isLoading={ isLoading }
      heading={ heading }
      userData={ agentTopData.map((user) => ({
        itemId: user.userId,
        itemHeading: user.fullName,
        itemPic: user.profilePic,
        itemRating: user.rating,
        itemLink: 'Visit Profile',
        itemRoute: `${ PROFILE_ROUTE }/${ user.userId }/resume`,
        itemSubHeading: user.title,
      })) }
    />
  )
}

TopTalent.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default TopTalent
