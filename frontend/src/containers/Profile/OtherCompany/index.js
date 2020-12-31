/* eslint-disable complexity */
import React, { useEffect } from 'react'
import { Grid, Tabs, Tab } from '@material-ui/core'
import { useParams, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import OtherCompanyIntro from './LeftRightSection/otherCompanyIntro'
import SimilarCompanies from './LeftRightSection/similarCompanies'
import OtherContactCenterFeed from './Feed/index'
import OtherCompanyAbout from './About/index'
import OpenPosition from './LeftRightSection/openPosition'
import { OTHER_COMPANY_PROFILE_ROUTE } from '../../../routes/routesPath'
import { jobsWithCategoriesFetchStart } from '../../../redux-saga/redux/actions'

const OtherContactCenterProfile = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const { companyId } = useParams()

  const feedRoute = `${ OTHER_COMPANY_PROFILE_ROUTE }/${ companyId }/feed`
  const aboutRoute = `${ OTHER_COMPANY_PROFILE_ROUTE }/${ companyId }/about`

  const temp = [
    feedRoute, aboutRoute,
  ]

  const { jobsWithCategories } = useSelector((state) => state.jobsWithCategories)

  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isEmpty(jobsWithCategories)) {
      dispatch(jobsWithCategoriesFetchStart({
        clientId: companyId,
        limit: 3,
        offset: 0,
      }))
    }
    // eslint-disable-next-line
  }, [ dispatch ])

  return (
    <div>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 }>
          <div className='left-section'>
            <OtherCompanyIntro />
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
              <Link to={ feedRoute } className={ currentPath === feedRoute ? 'active-tab' : 'inactive-tab' }>
                <Tab
                  label='Feed'
                />
              </Link>
              <Link to={ aboutRoute } className={ currentPath === aboutRoute ? 'active-tab' : 'inactive-tab' }>
                <Tab
                  label='About'
                />
              </Link>
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
