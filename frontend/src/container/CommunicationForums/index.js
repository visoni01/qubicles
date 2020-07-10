import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ForumWrap from '../../components/CommunicationForums/ForumWrap'
import { categoryDataFetchingStart } from '../../redux-saga/redux/actions'
import withNavBar from '../../Hoc/navbar'


const ForumGroup = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(categoryDataFetchingStart())
  }, [])
  const { categories, isLoading } = useSelector((state) => state.category)
  // categories = []
  return (
    <div id='dashboard-wrapper' className='dashboard-outer'>
      <div className='dashboard-inner'>
        {/* Dashboard Wrapper */}
        <div className='dashboard-wrapper'>
          <div id='main-dashboard' className='section-wrapper'>
            {/* Dashboard content */}
            <div id='forum-home' className='dashboard-columns'>
              {/* Page title */}
              <div className='control forum-search'>
                <input type='text' className='input is-rounded' placeholder='Search Groups...' />
                <div className='search-icon'>
                  <FontAwesomeIcon icon={ faSearch } />
                </div>
              </div>
              {/* ForumGroup Category */}
              { !isLoading
              && categories.map((category) => <ForumWrap { ...category } key={ category.id } />)}
            </div>
          </div>
          {/* Forum Category */}
          { !isLoading
              && categories.map((category) => <ForumWrap { ...category } key={ category.id } />)}
        </div>
      </div>
    </>
  )
}

export default ForumGroup