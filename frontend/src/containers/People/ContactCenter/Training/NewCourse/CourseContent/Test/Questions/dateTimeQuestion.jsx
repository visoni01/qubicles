import React, { useCallback } from 'react'
import { Grid, TextField, Switch } from '@material-ui/core'
import PropTypes from 'prop-types'
import { testQuestionPropType } from '../../../propTypes'

const DateTimeQuestion = ({ questionDetails, setQuestionDetails }) => {
  const getDateAndTime = useCallback(({ type }) => questionDetails.dateTime[ type ], [ questionDetails ])

  const setDateAndTime = useCallback(({ type, val }) => {
    setQuestionDetails((current) => ({
      ...current,
      dateTime: { ...current.dateTime, [ type ]: val },
    }))
  }, [ setQuestionDetails ])

  const handleChangeIsDate = useCallback(() => {
    setQuestionDetails((current) => ({
      ...current,
      dateTime: {
        ...current.dateTime,
        isDate: !current.dateTime.isDate,
        date: '',
      },
    }))
  }, [ setQuestionDetails ])

  const handleChangeIsTime = useCallback(() => {
    setQuestionDetails((current) => ({
      ...current,
      dateTime: {
        ...current.dateTime,
        isTime: !current.dateTime.isTime,
        time: '',
      },
    }))
  }, [ setQuestionDetails ])

  if (questionDetails.isSaved) {
    return (
      <div className='ml-15 display-inline-flex align-items-center'>
        {questionDetails.dateTime.isDate && (
          <div className='mr-10'>
            <p className='para bold'> Date </p>
            <TextField
              margin='dense'
              variant='outlined'
              value={ getDateAndTime({ type: 'date' }) }
              disabled
            />
          </div>
        )}
        {questionDetails.dateTime.isTime && (
          <div>
            <p className='para bold'>Time</p>
            <TextField
              margin='dense'
              variant='outlined'
              value={ getDateAndTime({ type: 'time' }) }
              disabled
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
        <p className='para bold light'>
          Please set the correct date and/or time below
        </p>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 } xs={ 3 }>
        <div className='display-inline-flex is-fullwidth justify-between align-items-center'>
          <p className='para bold'> Date </p>
          <Switch
            className='switches'
            color='primary'
            checked={ questionDetails.dateTime.isDate }
            onChange={ handleChangeIsDate }
          />
        </div>
        <TextField
          className='is-fullwidth'
          margin='dense'
          variant='outlined'
          type='date'
          value={ getDateAndTime({ type: 'date' }) }
          onChange={ (e) => setDateAndTime({ type: 'date', val: e.target.value }) }
          disabled={ !questionDetails.dateTime.isDate }
        />
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 } xs={ 3 }>
        <div className='display-inline-flex is-fullwidth justify-between align-items-center'>
          <p className='para bold'> Time </p>
          <Switch
            className='switches'
            color='primary'
            checked={ questionDetails.dateTime.isTime }
            onChange={ handleChangeIsTime }
          />
        </div>
        <TextField
          className='is-fullwidth'
          margin='dense'
          variant='outlined'
          type='time'
          value={ getDateAndTime({ type: 'time' }) }
          onChange={ (e) => setDateAndTime({ type: 'time', val: e.target.value }) }
          disabled={ !questionDetails.dateTime.isTime }
        />
      </Grid>
    </>
  )
}

DateTimeQuestion.propTypes = {
  questionDetails: testQuestionPropType.isRequired,
  setQuestionDetails: PropTypes.func.isRequired,
}

export default DateTimeQuestion
