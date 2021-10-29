import React from 'react'
import ROUTE_PATHS from '../routesPath'
import JobPreview from '../../containers/People/ContactCenter/Jobs/jobPreview'
import NewJobModal from '../../containers/People/ContactCenter/Jobs/NewJob/index'
import Peoplepage from '../../containers/People/index'
import EditJob from '../../containers/People/ContactCenter/Jobs/editJob'
import ViewResume from '../../containers/People/ContactCenter/Talent/viewResume'
import NewCoursePage from '../../containers/People/ContactCenter/Training/NewCourse/index'
import ViewCourse from '../../containers/People/ContactCenter/Training/ViewCourse/index'
import ViewJobApplication from '../../containers/People/Shared/jobApplicationPage'
import RouteRenderer from './featureSubRoutes'
import PeopleViewJobs from '../../containers/People/viewJobsIndex'
import MyCourses from '../../containers/People/ContactCenter/Training/MyCourses'
import CompanyCourses from '../../containers/People/ContactCenter/Training/CompanyCourses'
import EditCoursePage from '../../containers/People/ContactCenter/Training/NewCourse/editCoursePage'
import TestEntries from '../../containers/People/ContactCenter/Training/MyCourses/TestEntries'
import EnrolledCourses from '../../containers/People/ContactCenter/Training/EnrolledCourses'

const List = [
  {
    path: ROUTE_PATHS.JOB_PREVIEW,
    component: JobPreview,
    exact: true,
  },
  {
    path: ROUTE_PATHS.NEW_JOB,
    component: NewJobModal,
    exact: true,
  },
  {
    path: [
      ROUTE_PATHS.PEOPLE_JOBS_TAB,
      ROUTE_PATHS.PEOPLE_TALENT_TAB,
      ROUTE_PATHS.PEOPLE_TRAINING_TAB,
      ROUTE_PATHS.PEOPLE_APPLICATIONS_TAB,
    ],
    component: Peoplepage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.EDIT_JOB,
    component: EditJob,
    exact: true,
  },
  {
    path: ROUTE_PATHS.JOB_POST,
    component: PeopleViewJobs,
    exact: true,
  },
  {
    path: ROUTE_PATHS.VIEW_RESUME,
    component: ViewResume,
    exact: true,
  },
  {
    path: ROUTE_PATHS.CREATE_COURSE,
    component: NewCoursePage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.EDIT_COURSE,
    component: EditCoursePage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.VIEW_COURSE,
    component: ViewCourse,
    exact: true,
  },
  {
    path: ROUTE_PATHS.MY_COURSES,
    component: MyCourses,
    exact: true,
  },
  {
    path: ROUTE_PATHS.COMPANY_COURSES,
    component: CompanyCourses,
    exact: true,
  },
  {
    path: ROUTE_PATHS.VIEW_JOB_APPLICATION,
    component: ViewJobApplication,
    exact: true,
  },
  {
    path: ROUTE_PATHS.VIEW_TEST_ENTRIES,
    component: TestEntries,
    exact: true,
  },
  {
    path: ROUTE_PATHS.ENROLLED_COURSES,
    component: EnrolledCourses,
    exact: true,
  },
]
const SubRoutes = () => (<RouteRenderer routes={ List } />)

export default SubRoutes
