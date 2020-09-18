/* eslint-disable complexity */
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  Select, MenuItem, Button, Grid,
} from '@material-ui/core/'
import moment from 'moment'
import IntlTelInput from 'react-intl-tel-input'
import steps from './steps'
import 'react-intl-tel-input/dist/main.css'
import { spreadArgs, phoneNumberFormatter, formatSSN } from '../../../../../utils/common'

const StepForm = ({
  step, onNext, onBack, onSubmit, stepData,
}) => {
  const [ formValues, setValues ] = useState(stepData || {})
  const {
    register, errors, handleSubmit, control, setValue, getValues, unregister,
  } = useForm({
    validationSchema: steps[ step ] && steps[ step ].schema,
  })
  console.log('errors=====>>>>>>', errors.name)
  const handleRadioChange = (name) => (event) => {
    setValue(name, event.target.value)
    setValues({ ...formValues, [ name ]: event.target.value })
  }

  useEffect(() => {
    setValues(stepData)
    if (steps[ step ]) {
      steps[ step ].fields.map((field) => {
        // Manually registering radio and select fields in the react-hook-form.
        if (field.type === 'radio' || field.type === 'select') {
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
    let { value } = event.target
    if (name === 'ssn') {
      value = formatSSN(value)
      setValue(name, value)
    }
    setValues({ ...formValues, [ name ]: value })
  }

  const handlePhoneNumberChange = (isValid, value, selectedCountryData, fullNumber) => {
    const nextValue = isValid
      ? fullNumber.replace(/([()])|-/g, '')
      : phoneNumberFormatter(value, selectedCountryData)
    if (isValid) {
      setValues({ ...formValues, mobile_phone: nextValue })
    }
    return nextValue
  }

  const isChecked = (name, value) => formValues[ name ] && formValues[ name ] === value

  // eslint-disable-next-line complexity
  const inputField = (fieldData) => {
    const {
      type, name, options, label,
    } = fieldData

    if (type === 'radio' || type === 'checkbox') {
      return (
        <>
          <label>{label}</label>
          <div key={ `${ name }${ label }` } className='control check-box'>
            {options
            && options.map(([ inputName, value, inputLabel ]) => (
              <div key={ `${ inputName }` } className='check-box-div'>
                <input
                  onChange={ handleRadioChange(name) }
                  type={ type }
                  id={ inputName }
                  name={ name }
                  defaultValue={ value }
                  defaultChecked={ isChecked(name, value) }
                />
                <label htmlFor={ value } className='checkbox-label'>
                  {inputLabel}
                </label>
                <br />
              </div>
            ))}
          </div>
        </>
      )
    } if (type === 'select') {
      let selectFieldValue
      if (Array.isArray(formValues[ name ])) {
        selectFieldValue = formValues[ name ]
      } else {
        selectFieldValue = formValues[ name ] ? (formValues[ name ].split(',')) : []
      }

      return (
        <div key={ `${ name }${ label }` } className='dropdown-field'>
          <div>
            <label>{label}</label>
          </div>
          <Select
            MenuProps={ {
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            } }
            name={ name }
            id={ name }
            value={ selectFieldValue }
            multiple
            onChange={ handleRadioChange(name) }
            className='dropdown'
          >
            {options && options.map(({ label: optionLabel, value }) => (
              <MenuItem key={ value } value={ value }>
                {optionLabel}
              </MenuItem>
            ))}
          </Select>
        </div>
      )
    }

    let value = formValues[ name ]

    if (type === 'date' && name === 'dob') {
      value = formValues.dob ? moment(formValues.dob, 'YYYY-MM-DD').format('YYYY-MM-DD') : formValues.dob
    }

    return (
      <Grid item xs>
        <div className='control'>
          {
          (name === 'mobile_phone') ? (
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
                format
                formatOnInit
                name={ name }
                onChangeName='onPhoneNumberChange'
                onChange={ spreadArgs(handlePhoneNumberChange) }
                telInputProps={ {
                  required: true,
                } }
                defaultValue={ formValues[ name ] }
              />
            </>
          ) : (
            <div key={ `${ name }${ label }` }>
              <div>
                <label>{label}</label>
              </div>
              <input
                onChange={ handleValueChange(name) }
                defaultValue={ value }
                type={ type }
                className='input'
                name={ name }
                ref={ register }
              />
            </div>
          )
        }
        </div>
      </Grid>
    )
  }

  const fields = () => steps
    && steps[ step ]
    && steps[ step ].fields.map(({ name, label, ...rest }) => (
      // <div className='form-field' key={ `${ name }${ label }` }>
      // <div className='field'>
      // {/* <label>{label}</label> */}
      <div className='field' key={ `${ name }${ label }` }>
        {inputField({ name, label, ...rest })}
        {errors && errors[ name ] && (
        <div className='error-message'>
          {errors[ name ].message}
        </div>
        )}
      </div>
      // {/* </div> */}
      // </div>
    ))

  return (
    <>
      <div id='signup-panel' className='process-panel-wrap is-narrow is-active agent-form'>
        <div className='form-panel'>
          {step === 4 ? (
            <div className='photo-upload'>
              <div className='preview'>
                <span className='upload-button'>
                  <FontAwesomeIcon icon={ faPlus } />
                </span>
                <img
                  id='upload-preview'
                  src='https://via.placeholder.com/150x150'
                  data-demo-src='assets/img/avatars/avatar-w.png'
                  alt=''
                />
                <form
                  id='profile-pic-dz'
                  className='dropzone is-hidden'
                  action='/'
                />
              </div>
              <div className='limitation'>
                <small>Upload copy of government identification card</small>
              </div>
            </div>
          ) : (
            <Grid container spacing={ 1 }>
              {fields()}
            </Grid>
          )}
        </div>

        <Grid container spacing={ 3 }>
          <div className='registration-buttons'>
            <Grid item xs={ 6 }>
              {step > 1 && (
              <button
                className='button is-rounded process-button'
                data-step='step-dot-1'
                type='button'
                onClick={ onBack }
              >
                Back
              </button>
              )}
            </Grid>
            <Grid item xs={ 6 }>
              <button
                className='button is-rounded process-button is-next'
                data-step='step-dot-3'
                type='button'
                onClick={ handleSubmit(step === 5 ? onSubmit : onNext) }
              >
                {step === 5 ? 'Submit' : 'Next'}
              </button>
            </Grid>
          </div>
        </Grid>
      </div>
    </>
  )
}

StepForm.propTypes = {
  step: PropTypes.number,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  stepData: PropTypes.instanceOf({}),
}

StepForm.defaultProps = {
  step: 1,
  onNext: () => {},
  onBack: () => {},
  onSubmit: () => {},
  stepData: {},
}

export default StepForm
