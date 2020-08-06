import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'
import CustomRoutes from './customRoutes'
import ScrollToTop from '../components/ScrollToTop'

const Routes = () => (
  <Router>
    <ScrollToTop />
    <CustomRoutes />
    <CircularLoader />
    <CustomSnackbar />
  </Router>
)

export default Routes
