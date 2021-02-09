import { makeStyles, withStyles } from '@material-ui/core/styles'
import StepConnector from '@material-ui/core/StepConnector'

const useStepperStyles = makeStyles({
  container: {
    width: '650px',
  },

  stepperRoot: {
    background: 'none',
  },

  stepIconRoot: {
    backgroundColor: '#D5DFFC',
    zIndex: 1,
    color: '#fff',
    width: 72,
    height: 59,
    display: 'flex',
    borderRadius: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepIconActive: {
    backgroundColor: '#4877F4',
    border: '2px solid #2874d27d',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },

  stepIconCompleted: {
    backgroundColor: '#4877F4',
    border: '2px solid #2874d27d',
  },

  stepIcon: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: ' "Poppins", sans-serif',
    fontWeight: '600',
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
