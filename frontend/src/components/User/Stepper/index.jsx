import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Container, Stepper, Step, StepLabel,
} from '@material-ui/core'
import { useStepperStyles, ColorlibConnector } from './styles'

const StepperComponent = ({ activeStep, steps }) => {
  const classes = useStepperStyles()
  const StepIcon = (active, completed, step) => (
    <div
      className={ classNames(classes.stepIconRoot, {
        [ classes.stepIconActive ]: active,
        [ classes.stepIconCompleted ]: completed,
      }) }
    >
      <div className={ classes.stepIcon }>
        {step}
      </div>
    </div>
  )

  return (
    <Container className={ classes.container }>
      <Stepper
        className={ classes.stepperRoot }
        alternativeLabel
        activeStep={ activeStep }
        connector={ <ColorlibConnector /> }
      >
        {[ ...Array(steps).keys() ].map((stepIndex) => {
          const step = stepIndex + 1
          return (
            <Step key={ step }>
              <StepLabel
                StepIconComponent={ ({ active, completed }) => StepIcon(active, completed, step) }
              />
            </Step>
          )
        })}

      </Stepper>
    </Container>
  )
}

StepperComponent.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
}

export default StepperComponent
