import React, { useEffect, useState } from 'react'
import {
  Grid, Card, CardContent,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './styles.scss'
import PeopleNavigationActions from './PeopleNavigationActions'
import { companyPeopleNavigations, agentPeopleNavigations } from './navigationLinks'

function PeopleNavigation() {
  const { userDetails } = useSelector((state) => state.login)
  const [ navigations, setnavigations ] = useState([])
  useEffect(() => {
    if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'employer') {
      setnavigations(companyPeopleNavigations)
    }
    if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'agent') {
      setnavigations(agentPeopleNavigations)
    }
  }, [ userDetails ])
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam, quae inventore rerum ratione enim voluptatum
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

export default PeopleNavigation
