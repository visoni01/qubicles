import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import CategoryWrap from '../../components/CommunicationForums/groups/CategoryWrap'
import { categoryDataFetchingStart, addNewCategory } from '../../redux-saga/redux/actions'
import withNavBar from '../../hoc/navbar'
import NewGroupModal from '../../components/CommunicationForums/groups/NewGroup'
import Loader from '../../components/loaders/circularLoader'

const CreateGroup = () => {
  const [ openNewGroupModal, setOpenNewGroupModal ] = useState(false)
  const dispatch = useDispatch()

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
  const dispatch = useDispatch()
  const { categories, isLoading } = useSelector((state) => state.category)
  useEffect(() => {
    dispatch(categoryDataFetchingStart())
  }, [ dispatch ])
  // eslint-disable-next-line
  
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
              <CreateGroup />
            </div>
            {/* ForumGroup Category */}
            {
              isLoading
                ? (
                  <Loader
                    className='loader-custom'
                    enableOverlay={ false }
                    displayLoaderManually
                  />
                )
                : categories.map((category) => <CategoryWrap { ...category } key={ category.id } />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default withNavBar(ForumGroup)
