import React from 'react'
import { Box, InputBase, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { jobsCards } from '../testData'
import JobCategoryCard from './JobCategoryCard'
import ROUTE_PATHS from '../../../../routes/routesPath'

const JobsPage = () => {
  const history = useHistory()
  return (
    <>
      <div className='display-inline-flex is-fullwidth mt-10 search-bar-people'>
        <div className='search-input'>
          <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
          <InputBase
            placeholder='Search Jobs'
            className='input-field'
          />
        </div>
        <Button
          className='search-button'
          onClick={ () => history.push(ROUTE_PATHS.NEW_JOB) }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          New Job
        </Button>
      </div>
      <Box className='custom-box'>
        {
        jobsCards.map((jobCategory) => (
          <JobCategoryCard
            key={ jobCategory.categoryId }
            categoryName={ jobCategory.categoryName }
            jobs={ jobCategory.jobs }
          />
        ))
      }
      </Box>
    </>
  )
}

export default JobsPage
