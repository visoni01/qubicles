import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const ScrollToTop = ({ history, manualScroll }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    if (manualScroll) {
      window.scrollTo(0, 0)
    }
    return () => {
      unlisten()
    }
  }, [ history ])

  return (null)
}

export default withRouter(ScrollToTop)
