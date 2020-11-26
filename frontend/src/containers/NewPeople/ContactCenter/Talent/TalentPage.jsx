import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, InputBase, debounce } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import TalentCard from './TalentCard'
import { fetchTalentCardsStart } from '../../../../redux-saga/redux/actions'
import TalentCardSkeleton from './Skeletons/TalentCardSkeleton'
import './styles.scss'

const TalentPage = () => {
  const { isLoading, talentCards } = useSelector((state) => state.peopleTalentCards)
  const [ searchField, setSearchField ] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    if (!talentCards) {
      dispatch(fetchTalentCardsStart({}))
    }
  }, [ dispatch, talentCards ])
  const callSearchApi = useCallback(debounce((nextValue) => {
    dispatch(fetchTalentCardsStart({ searchKeyword: nextValue }))
  }, 500), [ dispatch ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchField(nextValue)
    callSearchApi(nextValue)
  }, [ callSearchApi ])

  return (
    <>
      <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
        <div className='search-input'>
          <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
          <InputBase
            onChange={ handleSearch }
            value={ searchField }
            placeholder='Search Talent'
            className='input-field'
          />
        </div>
      </div>
      <Box className='custom-box'>
        {/* Talent Cards */}
        {!isLoading && talentCards && talentCards.length > 0 && talentCards.map((talentCard) => (
          <TalentCard
            key={ talentCard.candidateId }
            candidateId={ talentCard.candidateId }
            candidateName={ talentCard.candidateName }
            candidatePic={ talentCard.candidatePic }
            availability={ talentCard.availability }
            candidateRating={ talentCard.candidateRating }
            location={ talentCard.location }
            languages={ talentCard.languages }
            ratePerHourDollar={ talentCard.ratePerHourDollar }
            profileName={ talentCard.profileName }
            profileDescription={ talentCard.profileDescription }
            skills={ talentCard.skills }
          />
        ))}
        {!isLoading && talentCards && talentCards.length === 0 && (
        <div className='mt-10 mb-10'>
          <h3 className='h3 text-align-center'>No matching results found!</h3>
          <h4 className='h4 unbold light text-align-center'> Please try again with other filter options...</h4>
        </div>
        )}
        {/* Talent Card Loading Skeleton */}
        {isLoading && (
        <>
          {[ ...Array(3).keys() ].map((val) => (
            <TalentCardSkeleton key={ val } />
          ))}
        </>
        )}
      </Box>
    </>
  )
}

export default TalentPage
