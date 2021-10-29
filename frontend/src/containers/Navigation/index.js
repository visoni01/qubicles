/* eslint-disable complexity */
import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  programsQuicklinks, insightsQuicklinks, settingsQuicklinks, peopleClientQuicklinks,
} from './navigationActionsList'
import NavigationActions from './navigationActions'
import {
  companyPeopleNavigations, agentPeopleNavigations, programsNavigations, insightsNavigations, settingsNavigations,
} from './navigationLinksList'
import {
  PEOPLE_ROUTE, PROGRAMS_NAVIGATION_ROUTE, INSIGHTS_NAVIGATION_ROUTE, SETTINGS_NAVIGATION_ROUTE,
} from '../../routes/routesPath'
import PeopleNavStats from './peopleNavStats'
import './styles.scss'

const navCard = (card) => (
  <Card className='navigation-card border-1'>
    <img src={ card.icon } alt='Chat Icon' className='image' />
    <CardContent classes={ { root: 'card-content-root' } }>
      <h3 className='h3 text-center mt-10 mb-10'>{card.title}</h3>
      <p className='para text-center'>{card.description}</p>
    </CardContent>
  </Card>
)

function NavigationPage() {
  const [ navigationCardsList, setNavigationCardsList ] = useState([])
  const [ navigationQuickLinks, setNavigationQuickLink ] = useState([])
  const [ navigationTitle, setNavigationTitle ] = useState('')

  const { userDetails } = useSelector((state) => state.login)

  const location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case PEOPLE_ROUTE: {
        if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'employer') {
          setNavigationCardsList(companyPeopleNavigations)
        }
        if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code !== 'employer') {
          setNavigationCardsList(agentPeopleNavigations)
        }
        setNavigationQuickLink(peopleClientQuicklinks)
        setNavigationTitle('People')
        break
      }
      case PROGRAMS_NAVIGATION_ROUTE: {
        setNavigationCardsList(programsNavigations)
        setNavigationQuickLink(programsQuicklinks)
        setNavigationTitle('Programs')
        break
      }
      case INSIGHTS_NAVIGATION_ROUTE: {
        setNavigationCardsList(insightsNavigations)
        setNavigationQuickLink(insightsQuicklinks)
        setNavigationTitle('Insights')
        break
      }
      case SETTINGS_NAVIGATION_ROUTE: {
        setNavigationCardsList(settingsNavigations)
        setNavigationQuickLink(settingsQuicklinks)
        setNavigationTitle('Settings')
        break
      }
      default: break
    }
  }, [ userDetails, location ])

  return (
    <div>
      <Grid container spacing={ 4 }>
        <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 8 }>
          <Grid container spacing={ 4 } className='navigation-page'>
            {navigationCardsList.map((card) => (
              <Grid key={ card.id } item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
                {card.route
                  ? (
                    <Link to={ card.route }>
                      {navCard(card)}
                    </Link>
                  ) : (
                    navCard(card)
                  )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
          <NavigationActions
            ChildComponent={ navigationTitle === 'People' ? PeopleNavStats : null }
            quickLinks={ navigationQuickLinks }
            title={ navigationTitle }
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default NavigationPage
