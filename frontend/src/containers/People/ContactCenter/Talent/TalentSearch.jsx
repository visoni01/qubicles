import React, { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputBase, debounce } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { fetchTalentCardsStart, updateTalentFilter } from '../../../../redux-saga/redux/actions'

export default function TalentSearch() {
  const dispatch = useDispatch()
  const { talentFilter } = useSelector((state) => state.talentFilter)
  const [ searchField, setSearchField ] = useState(talentFilter.searchKeyword)

  useEffect(() => {
    setSearchField(talentFilter.searchKeyword)
  }, [ talentFilter ])

  const callSearchApi = useCallback(debounce((nextValue) => {
    dispatch(fetchTalentCardsStart({
      requiredSkills: talentFilter.selectedSkill.map((skill) => skill.id),
      requiredLanguages: talentFilter.selectedLanguage.map((lang) => lang.title),
      requiredHourlyRate: talentFilter.selectedHourlyRate,
      requiredRating: talentFilter.selectedRating,
      requiredAvailability: talentFilter.selectedAvailability,
      requiredTalentType: talentFilter.selectedTalentType,
      searchKeyword: nextValue,
    }))
    dispatch(updateTalentFilter({
      talentFilter: {
        ...talentFilter,
        searchKeyword: nextValue,
      },
    }))
  }, 500), [ dispatch, talentFilter ])

  const handleSearch = useCallback((e) => {
    const nextValue = e.target.value
    setSearchField(nextValue)
    callSearchApi(nextValue)
  }, [ callSearchApi ])

  return (
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
  )
}
