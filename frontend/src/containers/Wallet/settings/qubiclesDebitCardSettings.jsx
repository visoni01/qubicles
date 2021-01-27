import React, { useState, useCallback } from 'react'
import {
  Button, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import OrderPhysicalCard from '../orderPhysicalCard'

const QubiclesDebitCardSettings = () => {
  const [ openOrderPhysicalCard, setOpenOrderPhysicalCard ] = useState(false)

  const setOpenOrderPhysicalCardCB = useCallback(() => {
    setOpenOrderPhysicalCard(true)
  }, [])

  return (
    <>
      <div className='wallet-settings'>
        <h3 className='h3 bold'>Card Details</h3>
        <div className='mt-20'>
          <Grid
            container
            spacing={ 2 }
          >
            <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 4 } xs={ 12 }>
              <p className='para heading-color'> Card Number </p>
              <p className='para light'> 4648 0943 3833 3426</p>
            </Grid>
            <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
              <p className='para heading-color'> Expires </p>
              <p className='para light'> 10/22 </p>
            </Grid>
            <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
              <p className='para heading-color'> CVV </p>
              <p className='para light'> 110 </p>
            </Grid>
            <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 4 } xs={ 12 }>
              <p className='para heading-color'> Pin code </p>
              <div className='display-inline-flex '>
                <p className='para light'> **** </p>
                <FontAwesomeIcon
                  icon={ faEye }
                  className='ml-10 mr-10 custom-fa-icon light'
                />
              </div>
            </Grid>
          </Grid>
        </div>

        <h4 className='h4 mt-20'> Order Physical Card </h4>
        <div className='mt-20'>
          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ setOpenOrderPhysicalCardCB }
          >
            Order Now
          </Button>
        </div>
      </div>
      {openOrderPhysicalCard && (
      <OrderPhysicalCard
        open={ openOrderPhysicalCard }
        onClose={ () => setOpenOrderPhysicalCard(false) }
        onSubmit={ () => setOpenOrderPhysicalCard(false) }
      />
      )}
    </>
  )
}

export default QubiclesDebitCardSettings
