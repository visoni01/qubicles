import React from 'react'

const ThreeDotLoader = () => (
  <div className='three-dot-loader'>
    <div className='dots'>
      {[ ...Array(3).keys() ].map((val) => (
        <span key={ val } />
      ))}
    </div>
  </div>
)

export default ThreeDotLoader
