import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import SliderComponent from '../../components/LandingPage/slide'
import sliderData from './sliderData'

const Slider = () => {
  const [ currentSlide, setCurrentSlide ] = useState(0)
  let interval
  useEffect(() => {
    interval = setTimeout(() => setCurrentSlide((currentSlide + 1) % 4), 5000)
  }, [ currentSlide ])

  const handlebuttonCLick = (index) => {
    clearTimeout(interval)
    setCurrentSlide(index)
  }
  const dotButton = (name, index) => (
    <button
      type="button"
      className={ classNames('Wallop-dot', index === currentSlide ? 'Wallop-dot--current' : '') }
      onClick={ () => handlebuttonCLick(index) }
    >
      {name}
    </button>
  )

  return (
    <>
      <div className="Wallop-list">
        <SliderComponent { ...sliderData[ currentSlide ] } />
      </div>
      <div className="Wallop-pagination">
        { sliderData.map((element, index) => (dotButton(element.dotName, index)))}
      </div>
    </>
  )
}

export default Slider
