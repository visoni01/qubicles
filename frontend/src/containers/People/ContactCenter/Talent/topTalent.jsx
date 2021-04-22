import React from 'react'
import PropTypes from 'prop-types'
import { topTalents } from '../testData'
import UserCards from '../../../../components/CommonModal/userCards'

const TopTalent = ({ heading }) => {
  const userData = topTalents.map((user) => ({
    itemId: user.candidateId,
    itemHeading: user.candidateName,
    itemPic: user.candidatePic,
    itemRating: user.candidateRating,
    itemLink: 'view profile',
    itemRoute: '',
    itemSubHeading: user.profileName,
  }))

  return (
    <UserCards
      heading={ heading }
      userData={ userData }
    />
  )
}

TopTalent.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default TopTalent
