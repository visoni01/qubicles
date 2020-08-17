import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  topicLikeIconHover: {
    '&:hover, &.Mui-focusVisible': { color: '#FF6E4F' },
  },
  topicLikeIconOn: {
    color: '#FF6E4F',
  },
  commentLikeIconHover: {
    '&:hover, &.Mui-focusVisible': { color: '#FF6E4F' },
  },
  commentLikeIconOn: {
    color: '#FF6E4F',
  },
}))

export default useStyles
