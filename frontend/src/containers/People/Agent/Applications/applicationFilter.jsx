import React, { useState, useEffect } from 'react'
import {
  List, MenuItem, ListItemText, Box,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateAgentJobApplicationsCategory,
  agentJobApplicationsRequestStart,
} from '../../../../redux-saga/redux/actions'

const ApplicationFilter = () => {
  const {
    applicationFilter, selectedApplicationCategory,
  } = useSelector((state) => state.agentJobApplications)
  const { userDetails } = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const [ selectedCategory, setSelectedCategory ] = useState(applicationFilter[ selectedApplicationCategory ])
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
        requestType: 'FETCH',
      }))
    }
    // eslint-disable-next-line
  }, [ dispatch, selectedApplicationCategory, userDetails.user_id, applicationFilter ])

  return (
    <Box className='custom-box no-padding side-filter-root job-list'>
      <div className='mb-20'>
        <h2 className='h2 title'>Applications</h2>
      </div>
      <List className='filter-list-items'>
        { Object.keys(applicationFilter).map((categoryId) => (
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
