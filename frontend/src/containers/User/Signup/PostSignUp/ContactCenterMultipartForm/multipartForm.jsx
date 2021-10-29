import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import IntlTelInput from 'react-intl-tel-input'
import {
  Button, Grid, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core'
import steps from './steps'
import 'react-intl-tel-input/dist/main.css'
import { spreadArgs, phoneNumberFormatter } from '../../../../../utils/common'

const Form = ({
  step, onNext, onBack, onSubmit, stepData,
}) => {
  const [ formValues, setValues ] = useState(stepData || {})

  const {
    register, errors, handleSubmit, control, setValue, unregister, getValues,
  } = useForm({
    validationSchema: steps[ step ] && steps[ step ].schema,
  })

  useEffect(() => {
    setValues(stepData)
    if (steps[ step ]) {
      steps[ step ].fields.map((field) => {
        // Manually registering radio and select fields in the react-hook-form.
        if (field.type === 'radio') {
          register(field.name)
        }
        // Setting value in the registered field if exists.
        if (stepData[ field.name ]) {
          setValue(field.name, stepData[ field.name ])
        }
        return null
      })
      if (Object.keys(getValues()).length !== steps[ step ].fields.length) {
        steps[ step ].fields.map((field) => {
          // Registering and setting value if it misses.
          if (field.type === 'text') {
            register(field.name)
            setValue(field.name, stepData[ field.name ])
          }
          return null
        })
      }
    }

    return () => {
      if (steps[ step ]) {
        steps[ step ].fields.map((field) => {
          // Unregistering fields.
          unregister(field.name)
          return null
        })
      }
    }
    // eslint-disable-next-line
  }, [ stepData ])

  const handleValueChange = (name) => (event) => {
    setValues({ ...formValues, [ name ]: event.target.value })
    setValue(name, event.target.value)
  }

  const handlePhoneNumberChange = (isValid, value, selectedCountryData, fullNumber) => {
    const nextValue = isValid
      ? fullNumber.replace(/([()])|-/g, '')
      : phoneNumberFormatter(value, selectedCountryData)
    if (isValid) {
      setValues({ ...formValues, phone_number: nextValue })
    }
    return nextValue
  }

  const isChecked = (name, value) => formValues[ name ] && formValues[ name ] === value

  const inputField = (fieldData) => {
    const {
      label, type, name, placeholder, checkTypes,
    } = fieldData

    if (type === 'radio') {
      return (
        <>
          <label>{label}</label>
          <div key={ `${ name }${ label }` } className='control check-box'>
            <RadioGroup
              className={ `radio-buttons ${ (name === 'source') ? 'label-sz-sm' : '' }` }
              onChange={ handleValueChange(name) }
              name={ name }
            >
              <div className='display-inline-flex mt-15'>
                {checkTypes && checkTypes.map(([ inputName, value, inputLabel ]) => (
                  <div key={ inputName }>
                    <FormControlLabel
                      value={ value }
                      control={ <Radio /> }
                      label={ inputLabel }
                      checked={ isChecked(name, value) }
                    />
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </>
      )
    }
    return (
      <div className='control'>
        {name === 'phone_number' ? (
          <>
            <div>
              <label>{label}</label>
            </div>
            <Controller
              as={ IntlTelInput }
              control={ control }
              fieldId={ name }
              fieldName={ name }
              preferredCountries={ [ 'us', 'ca' ] }
              containerClassName='control custom-intl-tel-input intl-tel-input'
              name={ name }
              format
              formatInput
              onChangeName='onPhoneNumberChange'
              onChange={ spreadArgs(handlePhoneNumberChange) }
              telInputProps={ {
                required: true,
              } }
              defaultValue={ formValues[ name ] }
            />
          </>
        ) : (
          <>
            <div>
              <label>{label}</label>
            </div>
            <input
              onChange={ handleValueChange(name) }
              type={ type }
              className='input'
              placeholder={ placeholder }
              name={ name }
              autoComplete='off'
              ref={ register }
              min={ 0 }
              defaultValue={ formValues[ name ] }
            />
          </>
        )}
      </div>
    )
  }

  const fields = () => steps && steps[ step ]
    && steps[ step ].fields.map(({
      name, label, type, placeholder, ...rest
    }) => (
      <Grid item xs={ (type === 'radio' || name === 'client_ein') ? 12 : 6 } key={ `${ name }${ label }` }>
        <div className='field' key={ `${ name }${ label }` }>
          {inputField({
            name, label, type, placeholder, ...rest,
          })}
          {errors && errors[ name ] && (
            <div className='error-message'>{errors[ name ].message}</div>
          )}
        </div>
      </Grid>
    ))

  return (
    <>
      <div id='signup-panel' className='process-panel-wrap is-narrow is-active'>
        <div className='form-panel'>
          <Grid container spacing={ 3 }>
            {fields()}
          </Grid>
        </div>
        <div className='registration-buttons'>
          <Grid container spacing={ 3 }>
            <Grid item xs={ 6 }>
              {step > 1 && (
                <div className='back-button'>
                  <Button
                    classes={ {
                      root: 'button-primary-large',
                      label: 'button-primary-large-label',
                    } }
                    onClick={ onBack }
                  >
                    Back
                  </Button>
                </div>
              )}
            </Grid>
            <Grid item xs={ 6 }>
              <div className='next-button'>
                <Button
                  classes={ {
                    root: 'button-primary-large',
                    label: 'button-primary-large-label',
                  } }
                  onClick={ handleSubmit(step === 5 ? onSubmit : onNext) }
                >
                  {step === 3 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

Form.propTypes = {
  step: PropTypes.number,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  stepData: PropTypes.instanceOf({}),
}

Form.defaultProps = {
  step: 1,
  onNext: () => {},
  onBack: () => {},
  onSubmit: () => {},
  stepData: {},
}

export default Form
