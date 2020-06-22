import { makeStyles, withStyles } from '@material-ui/core/styles'
import StepConnector from '@material-ui/core/StepConnector'

const useStepperStyles = makeStyles({
  container: {
    width: '50%',
  },
  stepperRoot: {
    background: 'none',
  },
  stepIconRoot: {
    backgroundColor: '#ffffff',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIconActive: {
    border: '2px solid #2874d27d',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  stepIconCompleted: {
    border: '2px solid #2874d27d',
  },
  stepIcon: {
    color: '#5b8be4bf',
  },
})

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: '#172ed082',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#114ffd',
    },
  },
  line: {
    height: 6,
    border: 0,
    backgroundColor: 'white',
    borderRadius: 1,
  },
})(StepConnector)

export { useStepperStyles, ColorlibConnector }
