import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import CategoryWrap from '../../components/CommunicationForums/groups/CategoryWrap'
import { categoryDataFetchingStart, addNewCategoryStart } from '../../redux-saga/redux/actions'
import withNavBar from '../../hoc/navbar'
import NewGroupModal from '../../components/CommunicationForums/groups/NewGroup'

const ForumGroup = () => {
  const [ openNewGroupModal, setOpenNewGroupModal ] = useState(false)
  const dispatch = useDispatch()
  const { categories, isLoading } = useSelector((state) => state.category)
  useEffect(() => {
    dispatch(categoryDataFetchingStart())
  }, [ dispatch ])
  // eslint-disable-next-line
  const handleNewGroupModal = useCallback(() => setOpenNewGroupModal((openNewGroupModal) => !openNewGroupModal), [])
  const addNewGroup = (data) => {
    dispatch(addNewCategoryStart(data))
    setOpenNewGroupModal(false)
  }

  return (
    <div className='dashboard-inner'>
      {/* Dashboard Wrapper */}
      <div className='dashboard-wrapper'>
        <div id='main-dashboard' className='section-wrapper'>
          {/* Dashboard content */}
          <div id='forum-home' className='dashboard-columns'>
            {/* Page title */}
            <div className='search-bar-header mt-10'>
              <div className='control forum-search people-search-bar'>
                <input type='text' className='input is-rounded' placeholder='Search Forum...' />
                <div className='search-icon'>
                  <FontAwesomeIcon icon={ faSearch } />
                </div>
              </div>
              <Button
                variant='contained'
                className='new-job-button'
                startIcon={ <FontAwesomeIcon icon={ faPlus } className='people-header-icons' /> }
                onClick={ handleNewGroupModal }
              >
                New Group
              </Button>
            </div>
            {/* ForumGroup Category */}
            { !isLoading
            && categories.map((category) => <CategoryWrap { ...category } key={ category.id } />)}
          </div>
        </div>
      </div>
      <NewGroupModal open={ openNewGroupModal } handleClose={ handleNewGroupModal } onSubmit={ addNewGroup } />
    </div>
  )
}

export default withNavBar(ForumGroup)
