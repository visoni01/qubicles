import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Slide = ({
  heading, detail, buttonName, slideBg,
}) => (
  <div
    className={ `Wallop-item Wallop-item--current has-background-image slide-bg-${ slideBg }` }
  >
    <div className='Wallop-overlay' />
    <div className='Wallop-caption-wrapper'>
      <div className='container'>
        <div className='columns is-gapless is-vcentered'>
          <div className='column is-5'>
            <div className='caption-inner'>
              <h1>
                {heading}
              </h1>
              <div className='caption-divider' />
              <div className='caption-text'>
                <span>
                  {detail}
                </span>
                <div className='action'>
                  <Link
                    to='/signup'
                    className='button button-cta primary-btn rounded steps-button-color'
                  >
                    {buttonName}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

Slide.propTypes = {
  heading: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  slideBg: PropTypes.number.isRequired,
}

export default Slide
