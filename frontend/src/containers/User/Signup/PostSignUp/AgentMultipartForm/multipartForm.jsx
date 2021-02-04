/* eslint-disable complexity */
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import {
  Select, MenuItem, Button, Grid, FormControlLabel, Radio, RadioGroup, Checkbox, ListItemText,
} from '@material-ui/core/'
import moment from 'moment'
import IntlTelInput from 'react-intl-tel-input'
import steps from './steps'
import 'react-intl-tel-input/dist/main.css'
import { spreadArgs, phoneNumberFormatter, formatSSN } from '../../../../../utils/common'
import { uploadDocumentIcon } from '../../../../../assets/images/icons/profileSettingsIcons'

const StepForm = ({
  step, onNext, onBack, onSubmit, stepData,
}) => {
  const [ formValues, setValues ] = useState(stepData || {})
  const {
    register, errors, handleSubmit, control, setValue, getValues, unregister,
  } = useForm({
    validationSchema: steps[ step ] && steps[ step ].schema,
  })

  const handleRadioChange = (name) => (event) => {
    setValue(name, event.target.value)
    setValues({ ...formValues, [ name ]: event.target.value })
  }

  useEffect(() => {
    setValues(stepData)
    if (steps[ step ]) {
      steps[ step ].fields.map((field) => {
        // Manually registering radio and select fields in the react-hook-form.
        if (field.type === 'radio' || field.type === 'select' || field.type === 'singleSelect') {
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
      type, name, options, label, placeholder,
    } = fieldData

    if (type === 'radio') {
      return (
        <>
          <label>{label}</label>
          <div key={ `${ name }${ label }` }>
            <RadioGroup
              className={ `radio-buttons unset-label
              ${ (name === 'source' || name === 'service') ? 'label-sz-sm' : '' }` }
              onChange={ handleRadioChange(name) }
            >
              <div className='display-inline-flex mt-15'>
                {options && options.map(([ inputName, value, inputLabel ]) => (
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
    } if (type === 'select' || type === 'singleSelect') {
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
              classes: {
                paper: 'select-menu-paper',
              },
            } }
            classes={ { select: 'select-root' } }
            name={ name }
            id={ name }
            disableUnderline
            value={ selectFieldValue }
            multiple={ !(type === 'singleSelect') }
            renderValue={ (selected) => selected.join(', ') }
            onChange={ handleRadioChange(name) }
            className='dropdown'
          >
            {options && options.map(({ label: optionLabel, value }) => (
              <MenuItem key={ value } value={ value }>
                {type === 'singleSelect' ? (
                  <ListItemText primary={ optionLabel } />
                ) : (
                  <div className='checkboxes unset-label display-inline-flex align-items-start'>
                    <Checkbox checked={ selectFieldValue.indexOf(value) > -1 } />
                    <ListItemText primary={ optionLabel } />
                  </div>
                ) }
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
                placeholder={ placeholder }

              />
            </>
          ) : (
            <div key={ `${ name }${ label }` }>
              <div>
                <label>{label}</label>
              </div>
              <input
                autoComplete='off'
                placeholder={ placeholder }
                onChange={ handleValueChange(name) }
                defaultValue={ value }
                type={ type }
                min={ 0 }
                className='input'
                name={ name }
                ref={ register }
              />
            </div>
          )
        }
      </div>
    )
  }

  const fields = () => steps
    && steps[ step ]
    && steps[ step ].fields.map(({
      name, label, type, placeholder, ...rest
    }) => (
      <Grid item xs={ (name === 'source' || name === 'service') ? 12 : 6 } key={ `${ name }${ label }` }>
        <div className='field' key={ `${ name }${ label }` }>
          {inputField({
            name, label, type, placeholder, ...rest,
          })}
          {errors && errors[ name ] && (
          <div className='error-message'>
            {errors[ name ].message}
          </div>
          )}
        </div>
      </Grid>
    ))

  return (
    <>
      <div id='signup-panel' className='process-panel-wrap is-narrow is-active'>
        <div className='form-panel'>
          {step === 4 ? (
            <div className='photo-upload'>
              <img
                className='padding-30'
                src={ uploadDocumentIcon }
                alt=''
              />
              <p className='mt-10'>Upload copy of government identification card</p>
              <div className='upload-button text-align-last-center mt-20'>
                {/* WIP Document Upload */}
                <input
                  disabled
                  accept='image/*'
                  id='contained-button-file'
                  type='file'
                />
                <label htmlFor='contained-button-file'>
                  <Button
                    classes={ {
                      root: 'button-primary-small',
                      label: 'button-primary-small-label',
                    } }
                    component='span'
                  >
                    Upload from Computer
                  </Button>
                </label>
              </div>
            </div>
          ) : (
            <Grid container spacing={ 3 }>
              {fields()}
            </Grid>
          )}
        </div>

        <div item className='registration-buttons'>
          <Grid container spacing={ 3 } justify='space-between' alignItems='flex-end'>
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
                  {step === 5 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
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
