import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'
import CategoryWrap from './CategoryWrap'
import { categoryDataFetchingStart } from '../../../redux-saga/redux/actions'
import Loader from '../../loaders/circularLoader'

const CategoryList = ({ currentPage, noOfGroupsPerPage }) => {
  const { categories, isLoading } = useSelector((state) => state.category)
  const isCategories = !_.isEmpty(categories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(categoryDataFetchingStart({
      searchKeyword: '',
      limit: noOfGroupsPerPage,
      offset: (currentPage - 1) * noOfGroupsPerPage,
    }))
  }, [ dispatch, currentPage, noOfGroupsPerPage ])

  if (isLoading) {
    return (
      <Loader
        className='loader-custom'
        enableOverlay={ false }
        displayLoaderManually
      />
    )
  }
  if (isCategories) {
    return (categories.map((category) => <CategoryWrap { ...category } key={ category.id } />))
  }
  return (
    <div className='no-category-message'>
      Forum Group not available...
    </div>
  )
}

CategoryList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  noOfGroupsPerPage: PropTypes.number.isRequired,
}

export default CategoryList
