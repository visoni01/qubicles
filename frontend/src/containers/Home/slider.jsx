import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import SliderComponent from './slide'
import { sliderData } from './data'

const Slider = () => {
  const [ currentSlide, setCurrentSlide ] = useState(0)
  const interval = useRef(null)
  useEffect(() => {
    interval.current = setTimeout(() => setCurrentSlide((currentSlide + 1) % 4), 5000)
    return () => clearTimeout(interval.current)
  }, [ currentSlide ])

  const handlebuttonCLick = (index) => {
    clearTimeout(interval.current)
    setCurrentSlide(index)
  }
  const dotButton = (name, index) => (
    <button
      type='button'
      className={ classNames('Wallop-dot', index === currentSlide ? 'Wallop-dot--current bg-color-blue' : '') }
      onClick={ () => handlebuttonCLick(index) }
      key={ name }
    >
      {name}
    </button>
  )

  return (
    <div className='Wallop Wallop--fade'>
      <div className='Wallop-list'>
        <SliderComponent { ...sliderData[ currentSlide ] } slideBg={ currentSlide + 1 } />
      </div>
      <div className='Wallop-pagination'>
        { sliderData.map((element, index) => (dotButton(element.dotName, index)))}
      </div>
    </div>
  )
}

export default Slider
