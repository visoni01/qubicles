import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  topicLikeIconHover: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: '#FF6E4F' },
  },
  topicLikeIconOn: {
    backgroundColor: '#FF6E4F',
  },
}))

export default useStyles
