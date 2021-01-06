import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

const Routes = ({ routes }) => (
  <Switch>
    {routes.length && routes.map(({
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
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array ]).isRequired,
    exact: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,

  })).isRequired,
}

export default Routes
