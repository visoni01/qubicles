import React from 'react'
import {
  Grid, Card, CardContent,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import navBar from '../../../../hoc/navbar'
import {
  searchProperty, breifcaseIcon, chatIcon, mediaIcon, networkIcon,
} from '../../../../assets/images/icons/peopleNavigationIcons'
import './styles.scss'

import ROUTE_PATHS from '../../../../routes/routesPath'
import PeopleNavigationActions from './PeopleNavigationActions'

function PeopleNavigation() {
  const navigations = [
    {
      id: 1,
      title: 'Jobs',
      description: '',
      route: ROUTE_PATHS.PEOPLE_JOBS_TAB,
      icon: breifcaseIcon,
    },
    {
      id: 2,
      title: 'Talent',
      description: '',
      route: ROUTE_PATHS.PEOPLE_TALENT_TAB,
      icon: searchProperty,
    },
    {
      id: 3,
      title: 'Training',
      description: '',
      route: ROUTE_PATHS.PEOPLE_TRAINING_TAB,
      icon: mediaIcon,
    },
    {
      id: 4,
      title: 'Groups',
      description: '',
      route: ROUTE_PATHS.GROUP,
      icon: chatIcon,
    },
    {
      id: 5,
      title: 'Network',
      description: '',
      icon: networkIcon,
    },

  ]
  return (
    <div>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 8 }>
          <Grid container spacing={ 5 } className='navigation-page'>
            {navigations.map((card) => (
              <Grid
                key={ card.id }
                item
                xl={ 4 }
                lg={ 4 }
                md={ 6 }
                sm={ 12 }
              >
                <Link to={ card.route }>
                  <Card className='navigation-card border-1'>
                    <img src={ card.icon } alt='Chat Icon' className='image' />
                    {/* <CardMedia image='https://picsum.photos/400/300' className='image' /> */}
                    <CardContent>
                      <h3 className='h3 text-center mt-10 mb-10'>
                        {card.title}
                      </h3>
                      <p className='para text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quae inventore rerum ratione enim voluptatum
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
          <PeopleNavigationActions />

        </Grid>
      </Grid>
    </div>
  )
}

export default navBar(PeopleNavigation)
