import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faAddressBook, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'
import qubiclesLogo from '../../assets/images/qbe-dark.png'
import ShareModal from './shareOptions'
import './style.scss'

const InviteFriends = () => (
  <div>
    <div className='fake-nav'>
      <img className='qubicles-logo' src={ qubiclesLogo } width={ 180 } height={ 28 } alt='' />
    </div>
    <div className='background-image-div'>
      <i />
      <h1 className='div1-h1'>
        Invite Friends &
        <br />
        Earn Up To $5 and Free Crypto
      </h1>
      <h3 className='div1-h2'>Introduce your friends, earn free credits and tokens</h3>
    </div>
    <div className='div2-steps'>
      <h1 className='steps-heading'>
        Three Easy Steps
      </h1>
      <Grid container spacing={ 6 } className='grid-container'>
        <Grid item xs={ 4 }>
          <FontAwesomeIcon icon={ faComment } className='steps-icons' />
          <h3 className='step-heading'>
            Spread the word by email or with your link via social sharing.
          </h3>
        </Grid>
        <Grid item xs={ 4 }>
          <FontAwesomeIcon icon={ faAddressBook } className='steps-icons' />
          <h3 className='step-heading'>
            Your friend signs up and gets $5 credit to use toward the service.
          </h3>
        </Grid>
        <Grid item xs={ 4 }>
          <FontAwesomeIcon accentHeight={ 40 } icon={ faMoneyBillWave } className='steps-icons' />
          <h3 className='step-heading'>
            You get $5 credit plus 1 free QBE token, up to $100.
          </h3>
        </Grid>
      </Grid>
    </div>
    <Paper className='div3-paper'>
      <ShareModal />
    </Paper>
  </div>
)

export default InviteFriends
