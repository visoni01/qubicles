import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Container, Stepper, Step, StepLabel,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStepperStyles, ColorlibConnector } from './styles'

const StepperComponent = ({ activeStep, steps }) => {
  const classes = useStepperStyles()
  const StepIcon = (active, completed, Icon) => (
    <div
      className={ classNames(classes.stepIconRoot, {
        [ classes.stepIconActive ]: active,
        [ classes.stepIconCompleted ]: completed,
      }) }
    >
      <FontAwesomeIcon icon={ Icon } className={ classes.stepIcon } />
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
        {steps.map(({ label, icon }) => (
          <Step key={ label }>
            <StepLabel
              StepIconComponent={ ({ active, completed }) => StepIcon(active, completed, icon) }
            />
          </Step>
        ))}
      </Stepper>
    </Container>
  )
}

StepperComponent.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({ icon: PropTypes.node, label: PropTypes.string }),
  ).isRequired,
}

export default StepperComponent
