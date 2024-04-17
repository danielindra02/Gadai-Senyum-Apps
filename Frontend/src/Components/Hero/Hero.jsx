import React from 'react'
import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

function Hero() {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>Pusat barang lelang</h2>
            <div>
            <div className="hero-hand-icon">
                <p>Barang</p>
            </div>
            <p>Second</p>
            <p>Berkualitas</p>
            </div>
            <div className="hero-lastest-btn">
                <div>Barang Baru Masuk</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
    </div>
    </div>
  )
}
 
export default Hero