import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Select, MenuItem } from '@material-ui/core/'
import steps from './steps'

const StepForm = ( {
  step, onNext, onBack, onSubmit, stepData,
} ) => {
  const [ formValues, setValues ] = useState( stepData || {} )
  const { register, errors, handleSubmit } = useForm( {
    validationSchema: steps[ step ] && steps[ step ].schema,
  } )

  const handleValueChange = ( name ) => ( event ) => {
    setValues( { ...formValues, [ name ]: event.target.value } )
  }
  const isChecked = ( name, value ) => formValues[ name ] && formValues[ name ] === value

  const inputField = ( {
    label, type, name, options, multi,
  } ) => {
    if ( type === 'radio' || type === 'checkbox' ) {
      return (
        <div className="control">
          {options
            && options.map( ( [ inputName, value, inputLabel ] ) => (
              <div key={ `${ inputName }` } className="check-box-div">
                <input
                  onChange={ handleValueChange( name ) }
                  type={ type }
                  id={ inputName }
                  name={ name }
                  value={ value }
                  ref={ register }
                  checked={ isChecked( name, value ) }
                />
                <label htmlFor={ value } className="checkbox-label">
                  {inputLabel}
                </label>
                <br />
              </div>
            ) )}
        </div>
      )
    } if ( type === 'select' ) {
      return (
        <div className="control">
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
            value={ formValues[ name ] || [] }
            multiple
            onChange={ handleValueChange( name ) }
            className="dropdown"
          >
            {options && options.map( ( { label: optionLabel, value } ) => (
              <MenuItem key={ value } value={ value }>
                {optionLabel}
              </MenuItem>
            ) )}
          </Select>
        </div>
      )
    }
    return (
      <div className="control">
        <input
          onChange={ handleValueChange( name ) }
          value={ formValues[ name ] }
          type={ type }
          className="input"
          name={ name }
          ref={ register }
        />
      </div>
    )
  }

  const fields = () => steps
    && steps[ step ]
    && steps[ step ].fields.map( ( { name, label, ...rest } ) => (
      <div className="form-field" key={ `${ name }${ label }` }>
        <div className="field">
          <label>{label}</label>
          {inputField( { name, label, ...rest } ) }
          {errors && errors[ name ] && (
          <div className="error-message">
            {errors[ name ].message}
          </div>
          )}
        </div>
      </div>
    ) )

  return (
    <>
      <div id="signup-panel" className="process-panel-wrap is-narrow is-active agent-form">
        <div className="form-panel">
          {step === 4 ? (
            <div className="photo-upload">
              <div className="preview">
                <a className="upload-button" href="/">
                  <FontAwesomeIcon icon={ faPlus } />
                </a>
                <img
                  id="upload-preview"
                  src="https://via.placeholder.com/150x150"
                  data-demo-src="assets/img/avatars/avatar-w.png"
                  alt=""
                />
                <form
                  id="profile-pic-dz"
                  className="dropzone is-hidden"
                  action="/"
                />
              </div>
              <div className="limitation">
                <small>Upload copy of government identification card</small>
              </div>
            </div>
          ) : (
            fields()
          )}
        </div>

        <div className="buttons">
          { step > 1 && (
          <button
            className="button is-rounded process-button"
            data-step="step-dot-1"
            type="button"
            onClick={ onBack }
          >
            Back
          </button>
          ) }
          <button
            className="button is-rounded process-button is-next"
            data-step="step-dot-3"
            type="button"
            onClick={ handleSubmit( step === 5 ? onSubmit : onNext ) }
          >
            {step === 5 ? 'Submit' : 'Next'}
          </button>
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
}

StepForm.defaultProps = {
  step: 1,
  onNext: () => {},
  onBack: () => {},
  onSubmit: () => {},
}

export default StepForm
