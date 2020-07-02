import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'
import Slider from './slider'
import {
  Clients, Steps, Header, Footer,
} from '../../components/Home'
import Agents from '../../components/Home/agents'
import './style.scss'

const Home = ({ history }) => (
  <div>
    {/* &lt;% layout('layout') -%&gt; */}
    {/* Hero and nav */}
    <div className='hero is-cover is-relative is-fullheight is-default is-bold'>
      <Header />
      {/* Hero Wallop Slider */}
      <Slider />
    </div>
    {/* Clients */}
    <Clients />
    <Divider variant='middle' />
    {/* Info steps */}
    <Steps history={ history } />
    <Footer />
  </div>
)

Home.propTypes = {
  history: PropTypes.instanceOf({}).isRequired,
}

export { Home, Agents }
