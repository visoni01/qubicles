import React from 'react'
import { Box, Link } from '@material-ui/core'
import ROUTE_PATHS from '../../routes/routesPath'

const Referral = () => (
  <Box className='custom-box wallet-root mt-30'>
    <h3 className=' h3 mb-10'> How To Earn QBE </h3>
    <div className='display-inline-flex '>
      <ul className='ml-20 referral-list'>
        <li>
          <p className='para'>
            {' '}
            <Link to='/'>
              <span className='primary-text-link'> Invite friends </span>
            </Link>
            {' '}
            with your referral code
            {' '}
          </p>
        </li>
        <li>
          <p className='para'>Earn QBE by getting hired </p>
        </li>
        <li>
          <p className='para'>Get rewarded for exceeding performance like employer of the week</p>
        </li>
        <li>
          <p className='para'>
            {' '}
            <Link to={ ROUTE_PATHS.PEOPLE_TRAINING_TAB }>
              <span className='primary-text-link'> Create courses </span>
            </Link>
            {' '}
            and earn with each enrollment
          </p>
        </li>
        <li>
          <p className='para'>Add funds to your savings and earn interest rates</p>
        </li>
      </ul>
    </div>
  </Box>
)

export default Referral
