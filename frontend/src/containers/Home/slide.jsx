import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import CustomLink from '../../components/Home/customLink'

const Slide = ({
  heading, detail, buttonName, slideBg,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  const isLoggedin = Boolean(userDetails && userDetails.user_id)

  return (
    <div
      className={ `Wallop-item Wallop-item--current has-background-image slide-bg-${ slideBg }` }
    >
      <div className='Wallop-overlay' />
      <div className='Wallop-caption-wrapper'>
        <div className='container'>
          <div className='columns is-gapless is-vcentered'>
            <div className='column is-5'>
              <div className='caption-inner'>
                <h1>{heading}</h1>
                <div className='caption-divider' />
                <div className='caption-text'>
                  <span>{detail}</span>
                  <div className='action'>
                    {!isLoggedin && (
                      <CustomLink
                        to='/signup'
                        className='button button-cta primary-btn rounded raised steps-button-color'
                      >
                        {buttonName}
                      </CustomLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Slide.propTypes = {
  heading: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  slideBg: PropTypes.number.isRequired,
}

export default Slide
