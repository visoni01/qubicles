import React, { useState, useCallback, useEffect } from 'react'
import { InputBase, debounce } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { updateAgentJobs, fetchAgentJobsStart } from '../../../../redux-saga/redux/actions'
import { SearchIcon } from '../../../../assets/images/common'

const AgentJobSearch = () => {
  const { jobFilter } = useSelector((state) => state.jobFilter)

  const [ searchField, setSearchField ] = useState(jobFilter.searchKeyword)

  const dispatch = useDispatch()

  useEffect(() => {
    setSearchField(jobFilter.searchKeyword)
  }, [ jobFilter ])

  const callSearchApi = useCallback(debounce((nextValue) => {
    dispatch(fetchAgentJobsStart({
      requiredSkills: jobFilter.selectedSkill.map((skill) => skill.id),
      requiredLanguages: jobFilter.selectedLanguage.map((lang) => lang.title),
      requiredHourlyRate: jobFilter.selectedHourlyRate,
      requiredRating: jobFilter.selectedRating,
      requiredLocation: jobFilter.selectedLocation,
      requiredCategory: jobFilter.selectedCategory.map((category) => category.id),
      searchKeyword: nextValue,
    }))
    dispatch(updateAgentJobs({
      talentFilter: {
        ...jobFilter,
        searchKeyword: nextValue,
      },
    }))
  }, 500), [ dispatch, jobFilter ])

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
          placeholder='Search Jobs'
          className='input-field'
        />
      </div>
    </div>
  )
}

export default AgentJobSearch
