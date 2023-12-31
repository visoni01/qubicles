import React, { useEffect } from 'react'
import { Divider } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Slider from './slider'
import {
  Clients, Steps, Header, Footer,
} from '../../components/Home'
import { isProductionEnvironment } from '../../utils/common'
import './style.scss'

const Home = () => {
  const history = useHistory()

  // eslint-disable-next-line
  useEffect(() => {
    if (isProductionEnvironment()) {
      const script = document.createElement('script')
      const eventListener = document.createElement('script')

      script.src = '//static.leadpages.net/leadboxes/current/embed.js'
      script.async = true
      script.defer = true

      eventListener.innerHTML = `window.addEventListener('LPLeadboxesReady', () => {
      window.temp = window.setTimeout(() => (LPLeadboxes.addDelayedLeadbox('kNzQaTguSZNBfdEwN6QFH2', {
        delay: '0s', views: 0, dontShowFor: '1d', domain: 'go.fenero.io',
      })), 20000)
    })`

      document.body.appendChild(script)
      document.body.appendChild(eventListener)
      return () => {
        document.body.removeChild(script)
        window.clearTimeout(window.temp)
      }
    }
  }, [])

  return (
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
}

export default Home
