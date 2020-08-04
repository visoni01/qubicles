import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import CategoryWrap from './CategoryWrap'
import { categoryDataFetchingStart } from '../../../redux-saga/redux/actions'
import Loader from '../../loaders/circularLoader'

const CategoryList = () => {
  const { categories, isLoading } = useSelector((state) => state.category)
  const isCategories = !_.isEmpty(categories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(categoryDataFetchingStart({ searchKeyword: '' }))
  }, [ dispatch ])

  if (isCategories) {
    return (isLoading
      ? (
        <Loader
          className='loader-custom'
          enableOverlay={ false }
          displayLoaderManually
        />
      )
      : categories.map((category) => <CategoryWrap { ...category } key={ category.id } />)
    )
  }
  return (
    <div className='no-category-message'>
      Forum Group not available
    </div>
  )
}

export default CategoryList
