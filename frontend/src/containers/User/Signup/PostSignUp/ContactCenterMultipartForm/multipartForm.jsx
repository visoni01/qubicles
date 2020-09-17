import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import IntlTelInput from 'react-intl-tel-input'
import steps from './steps'
import 'react-intl-tel-input/dist/main.css'
import { spreadArgs, phoneNumberFormatter } from '../../../../../utils/common'

const Form = ({
  step, onNext, onBack, onSubmit, stepData,
}) => {
  const [ formValues, setValues ] = useState(stepData || {})

  useEffect(() => {
    setValues(stepData)
  }, [ stepData ])

  const {
    register, errors, handleSubmit, control,
  } = useForm({
    validationSchema: steps[ step ] && steps[ step ].schema,
  })
  const handleValueChange = (name) => (event) => {
    setValues({ ...formValues, [ name ]: event.target.value })
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
      label, type, name, checkTypes,
    } = fieldData
    return (
      <div className='field' key={ `${ name }${ label }` }>
        <label>{label}</label>
        {(type === 'radio' || type === 'checkbox') ? (
          <div className='control'>
            {checkTypes
              && checkTypes.map(([ inputName, value, inputLabel ]) => (
                <div key={ `${ inputName }` } className='check-box-div'>
                  <input
                    type={ type }
                    onChange={ handleValueChange(name) }
                    id={ inputName }
                    name={ name }
                    value={ value }
                    ref={ register }
                    checked={ isChecked(name, value) }
                  />
                  <label htmlFor={ value } className='checkbox-label'>
                    {inputLabel}
                  </label>
                  <br />
                </div>
              ))}
          </div>
        ) : (
          <div className='control'>
            {
                (name === 'phone_number') ? (
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
                ) : (
                  <input
                    onChange={ handleValueChange(name) }
                    type={ type }
                    className='input'
                    name={ name }
                    ref={ register }
                    defaultValue={ formValues[ name ] }
                  />
                )
              }
          </div>
        )}
        {errors && errors[ name ] && (
          <div className='error-message'>
            {errors[ name ].message}
          </div>
        )}
      </div>
    )
  }

  const fields = () => steps
    && steps[ step ]
    && steps[ step ].fields.map((field) => inputField(field))

  return (
    <>
      <div id='signup-panel' className='process-panel-wrap is-narrow is-active'>
        <div className='form-panel'>{fields()}</div>
        <div className='buttons'>
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
          <button
            className='button is-rounded process-button is-next'
            data-step='step-dot-3'
            type='button'
            onClick={ handleSubmit(step === 5 ? onSubmit : onNext) }
          >
            {step === 3 ? 'Submit' : 'Next'}
          </button>
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
