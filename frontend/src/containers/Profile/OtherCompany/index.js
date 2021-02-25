/* eslint-disable complexity */
import React, { useEffect } from 'react'
import { Grid, Tabs, Tab } from '@material-ui/core'
import {
  useParams, useLocation, useHistory,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import OtherCompanyIntro from './LeftRightSection/otherCompanyIntro'
import SimilarCompanies from './LeftRightSection/similarCompanies'
import OtherContactCenterFeed from './Feed/index'
import OtherCompanyAbout from './About/index'
import OpenPosition from './LeftRightSection/openPosition'
import { PROFILE_ROUTE } from '../../../routes/routesPath'
import { jobsWithCategoriesFetchStart } from '../../../redux-saga/redux/actions'

const OtherContactCenterProfile = () => {
  const location = useLocation()
  const currentPath = location.pathname
  let { companyId } = useParams()
  companyId = parseInt(companyId, 10)

  const feedRoute = `${ PROFILE_ROUTE }/${ companyId }/feed`
  const aboutRoute = `${ PROFILE_ROUTE }/${ companyId }/about`

  const temp = [
    feedRoute, aboutRoute,
  ]

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(jobsWithCategoriesFetchStart({
      clientId: companyId,
      status: 'recruiting',
      limit: 3,
      offset: 0,
    }))
    // eslint-disable-next-line
  }, [ dispatch ])

  return (
    <div>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 }>
          <div className='left-section'>
            <OtherCompanyIntro key={ companyId } clientId={ companyId } />
          </div>
        </Grid>
        <Grid
          item
          xl={ 6 }
          lg={ 6 }
          md={ 6 }
          sm={ 6 }
          className='custom-active-tabs'
        >
          <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 }>
            <Tabs
              value={ temp.indexOf(currentPath) }
            >
              <Tab
                onClick={ () => history.push(feedRoute) }
                className={ currentPath === feedRoute ? 'active-tab' : 'inactive-tab' }
                label='Feed'
              />
              <Tab
                onClick={ () => history.push(aboutRoute) }
                className={ currentPath === aboutRoute ? 'active-tab' : 'inactive-tab' }
                label='About'
              />
            </Tabs>
          </Grid>
          <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 }>
            <div>
              { currentPath === feedRoute && (<OtherContactCenterFeed companyId={ companyId } />)}
              { currentPath === aboutRoute && (<OtherCompanyAbout companyId={ companyId } />)}
            </div>
          </Grid>
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
          { currentPath === feedRoute && (<OpenPosition companyId={ companyId } />)}
          <SimilarCompanies heading='Similar Companies' />
        </Grid>
      </Grid>
    </div>
  )
}

export default OtherContactCenterProfile
