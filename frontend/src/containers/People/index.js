import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PeopleContactCenter from './ContactCenter'
import AgentContactCenter from './Agent'
import { viewAllCoursesFetchStart } from '../../redux-saga/redux/people'

export default function PeopleTabs() {
  const { userDetails } = useSelector((state) => state.login)
  const {
    categoryId, searchField, courseFilter, offset,
  } = useSelector((state) => state.viewAllCourses)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(viewAllCoursesFetchStart({
      categoryId,
      searchField,
      courseFilter,
      offset,
    }))
  }, [ dispatch, categoryId, searchField, courseFilter, offset ])

  if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'employer') {
    return (
      <PeopleContactCenter />
    )
  }
  if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'agent') {
    return (
      <AgentContactCenter />
    )
  }
}
