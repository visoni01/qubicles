import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { addNewCategory } from '../../redux-saga/redux/actions'
import withNavBar from '../../hoc/navbar'
import NewGroupModal from '../../components/CommunicationForums/groups/NewGroup'
import CategoryList from '../../components/CommunicationForums/groups/CategoryList'
import CategorySearchBar from '../../components/CommunicationForums/groups/CategorySearch'

const CreateGroup = () => {
  const [ openNewGroupModal, setOpenNewGroupModal ] = useState(false)
  const dispatch = useDispatch()

  // eslint-disable-next-line no-shadow
  const handleNewGroupModal = useCallback(() => setOpenNewGroupModal((openNewGroupModal) => !openNewGroupModal), [])
  const addNewGroup = (data) => {
    dispatch(addNewCategory(data))
    setOpenNewGroupModal(false)
  }

  return (
    <>
      <NewGroupModal open={ openNewGroupModal } handleClose={ handleNewGroupModal } onSubmit={ addNewGroup } />
      <Button
        variant='contained'
        className='new-job-button'
        startIcon={ <FontAwesomeIcon icon={ faPlus } className='people-header-icons' /> }
        onClick={ handleNewGroupModal }
      >
        New Group
      </Button>
    </>
  )
}

const ForumGroup = () => {
  const { totalCategories } = useSelector((state) => state.category)
  const [ currentPage, setCurrentPage ] = useState(1)
  const noOfGroupsPerPage = 2 // Temporary harcoded no of groups, will provide an option to select no of groups.
  const noOfPages = (Math.floor(totalCategories / noOfGroupsPerPage) + Math.sign(totalCategories % noOfGroupsPerPage))
  const changeCurrentPage = useCallback((_, page) => setCurrentPage(page), [])

  return (
    <div className='dashboard-inner'>
      {/* Dashboard Wrapper */}
      <div className='dashboard-wrapper'>
        <div id='main-dashboard' className='section-wrapper'>
          {/* Dashboard content */}
          <div id='forum-home' className='dashboard-columns'>
            {/* Page title */}
            <div className='search-bar-header mt-10'>
              <CreateGroup />
            </div>
            {/* Forum Category Search */}
            <CategorySearchBar />

            {/* ForumGroup Category */}
            <CategoryList currentPage={ currentPage } noOfGroupsPerPage={ noOfGroupsPerPage } />
          </div>
          { noOfPages && (
          <Pagination
            count={ noOfPages }
            shape='rounded'
            page={ currentPage }
            onChange={ changeCurrentPage }
          />
          )}
        </div>
      </div>
    </div>
  )
}

export default withNavBar(ForumGroup)
