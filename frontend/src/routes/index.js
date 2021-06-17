import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { CircularLoader } from '../containers/loaders'
import CustomSnackbar from '../containers/snackbar'
import CustomRoutes from './customRoutes'
import ScrollToTop from '../components/scrollToTop'

const Routes = () => (
  <Router>
    <ScrollToTop />
    <CustomRoutes />
    <CircularLoader />
    <CustomSnackbar />
  </Router>
)

export default Routes
