import React, { Suspense } from 'react'
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
    <Suspense fallback={ <div>Loading...</div> }>
      <ScrollToTop />
      <CustomRoutes />
      <CircularLoader />
      <CustomSnackbar />
      <PostCommentSection />
    </Suspense>
  </Router>
)

export default Routes
