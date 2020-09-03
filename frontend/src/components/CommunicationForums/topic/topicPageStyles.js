import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  topicLikeIconHover: {
    '&:hover, &.Mui-focusVisible': { color: 'red' },
  },
  topicLikeIconOn: {
    color: 'red',
  },
  commentLikeIconHover: {
    '&:hover, &.Mui-focusVisible': { color: 'red' },
  },
  commentLikeIconOn: {
    color: 'red',
  },
}))

export default useStyles
