import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'
import CustomRoutes from './customRoutes'
import ScrollToTop from '../components/ScrollToTop'

const Routes = () => (
  <Router>
    <Suspense fallback={ <LinearProgress /> }>
      <ScrollToTop />
      <CustomRoutes />
      <CircularLoader />
      <CustomSnackbar />
    </Suspense>
  </Router>
)

export default Routes
