import React from 'react'
import ROUTE_PATHS from '../routesPath'
import JobPost from '../../containers/People/ContactCenter/Jobs/JobView'
import JobPreview from '../../components/People/ContactCenter/Jobs/JobPreview'
import NewJobModal from '../../containers/People/ContactCenter/Jobs/NewJob/index'
import Peoplepage from '../../containers/People/index'
import EditJob from '../../containers/People/ContactCenter/Jobs/EditJob'
import ViewResume from '../../containers/People/ContactCenter/Talent/ViewResume'
import CreateCourse from '../../containers/People/ContactCenter/Training/NewCourse/index'
import ViewCourse from '../../containers/People/ContactCenter/Training/ViewCourse/index'
import ViewJobApplication from '../../containers/People/ContactCenter/Talent/Application/JobApplicationPage'
import RouteRenderer from './featureSubRoutes'

const List = [
  {
    path: ROUTE_PATHS.JOB_POST,
    component: JobPost,
    exact: true,
  },
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
    path: [ ROUTE_PATHS.PEOPLE_JOBS_TAB, ROUTE_PATHS.PEOPLE_TALENT_TAB, ROUTE_PATHS.PEOPLE_TRAINING_TAB ],
    component: Peoplepage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.EDIT_JOB,
    component: EditJob,
    exact: true,
  },
  {
    path: ROUTE_PATHS.VIEW_RESUME,
    component: ViewResume,
    exact: true,
  },
  {
    path: ROUTE_PATHS.CREATE_COURSE,
    component: CreateCourse,
    exact: true,
  },
  {
    path: ROUTE_PATHS.VIEW_COURSE,
    component: ViewCourse,
    exact: true,
  },
  {
    path: ROUTE_PATHS.VIEW_JOB_APPLICATION,
    component: ViewJobApplication,
    exact: true,
  },
]
const SubRoutes = () => (<RouteRenderer routes={ List } />)

export default SubRoutes
