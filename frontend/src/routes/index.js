import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'
import CustomRoutes from './customRoutes'
import ScrollToTop from '../components/ScrollToTop'
import PostCommentSection from '../components/Dashboard/PostCommentSection'

const Routes = () => (
  <Router>
    <ScrollToTop />
    <CustomRoutes />
    <CircularLoader />
    <CustomSnackbar />
    <PostCommentSection />
  </Router>
)

export default Routes
