import React, { useState, useCallback, useEffect } from 'react'
import { InputBase, debounce } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTalentCardsStart, updateTalentFilter } from '../../../../redux-saga/redux/actions'
import { SearchIcon } from '../../../../assets/images/common'

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
      <div className='display-inline-flex is-fullwidth search-input'>
        <SearchIcon className='ml-10 mr-10 align-self-center' />
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
