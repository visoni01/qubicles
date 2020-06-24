import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'
import Slider from './slider'
import { Clients, Steps } from '../../components/LandingPage'
import './style.scss'

const IndexPage = ({ history }) => (
  <div>
    {/* &lt;% layout('layout') -%&gt; */}
    {/* Hero and nav */}
    <div className="hero is-cover is-relative is-fullheight is-default is-bold">
      {/* &lt;% include partials/header %&gt; */}
      {/* Hero Wallop Slider */}
      <Slider />
    </div>
    {/* Clients */}
    <Clients />
    <Divider variant="middle" />
    <Steps history={ history } />
    {/* &lt;% include partials/footer %&gt; */}
  </div>
)

IndexPage.propTypes = {
  history: PropTypes.instanceOf({}).isRequired,
}

export default IndexPage
