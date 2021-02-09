import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './style.scss'
import { Button, Grid } from '@material-ui/core'
import { userUpdateStart } from '../../../../redux-saga/redux/actions'
import AgentMultipartForm from './AgentMultipartForm'
import ContactCenterMultipartForm from './ContactCenterMultipartForm'
import agent from '../../../../assets/images/agent-registration.svg'
import contactCenter from '../../../../assets/images/contactcenter-registration.svg'

const RoleSetup = () => {
  const dispatch = useDispatch()
  const updateEmpployeeRoleCB = useCallback(() => {
    dispatch(userUpdateStart({ role: 'employer' }))
  }, [ dispatch ])

  const updateAgentRoleCB = useCallback(() => {
    dispatch(userUpdateStart({ role: 'agent' }))
  }, [ dispatch ])

  return (
    <div className='outer-panel'>
      <div className='outer-panel-inner'>
        <div className='process-title'>
          <h1 id='step-title-1' className='h1 step-title is-active'>
            Welcome! How do you intend on using Qubicles?
          </h1>
        </div>
        <div id='signup-panel-1' className=' is-active'>
          <Grid container justify='center' className='role-selector' spacing={ 8 }>
            <Grid item>
              <div className='account-type'>
                <img src={ contactCenter } alt='Center logo' className='intro-logo' />
                <h3 className='h3'>For a Contact Center</h3>
                <p className='para'>
                  Operating inbound,  outbound,  blended or multi-channel programs for a new or existing contact
                  center
                </p>
                <Button
                  classes={ {
                    root: 'button-primary-large',
                    label: 'button-primary-large-label',
                  } }
                  onClick={ updateEmpployeeRoleCB }
                >
                  Continue
                </Button>
              </div>
            </Grid>
            <Grid item>
              <div className='account-type'>
                <img src={ agent } alt='Agent logo' className='intro-logo' />
                <h3 className='h3'>As an Agent or Manager</h3>
                <p className='para'>
                  Handle customer interactions, quality assurance, training or support for contact center
                  {'\n'}
                  <br />
                </p>
                <Button
                  classes={ {
                    root: 'button-primary-large',
                    label: 'button-primary-large-label',
                  } }
                  onClick={ updateAgentRoleCB }
                >
                  Continue
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

const PostSignUp = () => {
  const userData = useSelector((state) => state.login)
  const userCode = userData && userData.userDetails && userData.userDetails.user_code

  return (
    <div className='signup-wrapper'>
      <div className='fake-nav'>
        <img className='qubicles-logo' src='https://i.imgur.com/Ap2GB30.png' width={ 180 } height={ 28 } alt='' />
      </div>
      {
        !(userCode) && <RoleSetup />
      }
      {
        userCode === 'agent'
        && <AgentMultipartForm />
      }
      {
        userCode === 'employer'
        && <ContactCenterMultipartForm />
      }
    </div>
  )
}

export default PostSignUp
