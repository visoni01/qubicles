import React from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import steps from './steps'

const StepForm = ( { step, onNext, onBack } ) => {
  const { register, errors, handleSubmit } = useForm( {
    validationSchema: steps[ step ] && steps[ step ].schema,
  } )

  const inputField = ( label, type, name, checkTypes ) => (
    <div className="field" key={ `${ name }${ label }` }>
      <label>{label}</label>
      {type === 'checkbox' ? (
        <div className="control">
          {checkTypes
            && checkTypes.map( ( [ inputName, value, inputLabel ] ) => (
              <div key={ `${ inputName }` } className="check-box-div">
                <input
                  type="radio"
                  id={ inputName }
                  name={ inputName }
                  value={ value }
                  ref={ register }
                />
                <label htmlFor={ value } className="checkbox-label">
                  {inputLabel}
                </label>
                <br />
              </div>
            ) )}
        </div>
      ) : (
        <div className="control">
          <input type={ type } className="input" name={ name } ref={ register } />
        </div>
      )}
      {errors && errors[ name ] && (
        <div className="error-message">
          {' '}
          {errors[ name ].message}
        </div>
      )}
    </div>
  )

  const fields = () => steps
    && steps[ step ]
    && steps[ step ].fields.map( ( field ) => inputField( ...field ) )

  return (
    <>
      <div id="signup-panel" className="process-panel-wrap is-narrow is-active">
        <div className="form-panel">
          {step === 4 ? (
            <div className="photo-upload">
              <div className="preview">
                <a className="upload-button">
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
          <button
            className="button is-rounded process-button"
            data-step="step-dot-1"
            type="button"
            onClick={ onBack }
          >
            Back
          </button>
          <button
            className="button is-rounded process-button is-next"
            data-step="step-dot-3"
            type="button"
            onClick={ handleSubmit( onNext ) }
          >
            Next
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
}

StepForm.defaultProps = {
  step: 1,
  onNext: () => {},
  onBack: () => {},
}

export default StepForm
