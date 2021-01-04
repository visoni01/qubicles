import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

const Routes = ({ routes }) => (
  <Switch>
    {routes.map(({
      path, exact, component,
    }) => (
      <Route
        path={ path }
        key={ path }
        exact={ exact }
        component={ component }
      />
    ))}
  </Switch>
)

Routes.propTypes = {
  routes: PropTypes.shape([]).isRequired,
}

export default Routes
