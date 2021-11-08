import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import PeopleContactCenter from './ContactCenter'
import AgentContactCenter from './Agent'
import { viewAllCoursesFetchStart, resetViewAllCoursesReducer } from '../../redux-saga/redux/people'
import { USERS } from '../../utils/constants'

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
    return () => {
      dispatch(resetViewAllCoursesReducer())
    }
  }, [ dispatch, categoryId, searchField, courseFilter, offset ])

  if (userDetails && userDetails.is_post_signup_completed && _.isEqual(userDetails.user_code, USERS.EMPLOYER)) {
    return <PeopleContactCenter />
  }

  if (userDetails && userDetails.is_post_signup_completed
    && [ USERS.AGENT, USERS.TRAINER, USERS.SUPERVISOR, USERS.QA_SUPPORT ].includes(userDetails.user_code)) {
    return <AgentContactCenter />
  }
}
