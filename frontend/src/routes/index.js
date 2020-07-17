import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'
import CustomRoutes from './customRoutes'

const Routes = () => (
  <Router>
    <CustomRoutes />
    <CircularLoader />
    <CustomSnackbar />
  </Router>
)

export default Routes
