import React from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import steps from './steps'

const Form = ( {
  step, onNext, onBack, onSubmit,
} ) => {
  const { register, errors, handleSubmit } = useForm( {
    validationSchema: steps[ step ] && steps[ step ].schema,
  } )

  const inputField = ( {
    label, type, name, checkTypes,
  } ) => (
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
    && steps[ step ].fields.map( ( field ) => inputField( field ) )

  return (
    <>
      <div id="signup-panel" className="process-panel-wrap is-narrow is-active">
        <div className="form-panel">{fields()}</div>
        <div className="buttons">
          {step > 1 && (
            <button
              className="button is-rounded process-button"
              data-step="step-dot-1"
              type="button"
              onClick={ onBack }
            >
              Back
            </button>
          )}
          <button
            className="button is-rounded process-button is-next"
            data-step="step-dot-3"
            type="button"
            onClick={ handleSubmit( step === 5 ? onSubmit : onNext ) }
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
}

Form.defaultProps = {
  step: 1,
  onNext: () => {},
  onBack: () => {},
  onSubmit: () => {},
}

export default Form
