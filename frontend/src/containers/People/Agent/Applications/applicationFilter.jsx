import React, { useState, useEffect } from 'react'
import {
  List, MenuItem, ListItemText, Box,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateAgentJobApplicationsCategory, agentJobApplicationsRequestStart,
} from '../../../../redux-saga/redux/actions'
import { REQUEST_TYPES } from '../../../../utils/constants'

const ApplicationFilter = () => {
  const { applicationFilter, selectedApplicationCategory } = useSelector((state) => state.agentJobApplications)
  const { userDetails } = useSelector((state) => state.login)

  const [ selectedCategory, setSelectedCategory ] = useState(applicationFilter[ selectedApplicationCategory ])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateAgentJobApplicationsCategory({ category: selectedCategory.id }))
  }, [ dispatch, selectedCategory ])

  useEffect(() => {
    if (!applicationFilter[ selectedCategory.id ].initialFetch) {
      dispatch(agentJobApplicationsRequestStart({
        applicationListData: {
          agentUserId: userDetails.user_id,
          limit: selectedCategory.limit,
          offset: selectedCategory.offset,
          statusTypes: selectedCategory.statusTypes,
          applicationCategoryId: selectedCategory.id,
        },
        requestType: REQUEST_TYPES.FETCH,
      }))
    }
    // eslint-disable-next-line
  }, [ dispatch, selectedApplicationCategory, userDetails.user_id, applicationFilter ])

  return (
    <Box className='custom-box no-padding side-filter-root job-list'>
      <div className='mb-20'>
        <h2 className='h2 title'> Applications </h2>
      </div>
      <List className='filter-list-items'>
        {Object.keys(applicationFilter).map((categoryId) => (
          <MenuItem
            button
            onClick={ () => setSelectedCategory(applicationFilter[ categoryId ]) }
            selected={ selectedCategory.id === applicationFilter[ categoryId ].id }
            key={ categoryId }
          >
            <ListItemText classes={ { primary: 'list-item' } }>
              <h4 className='h4 light unbold'>
                {applicationFilter[ categoryId ].name}
              </h4>
            </ListItemText>
          </MenuItem>
        ))}
      </List>
    </Box>
  )
}

export default ApplicationFilter
