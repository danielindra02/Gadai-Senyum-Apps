import React from 'react'
import './NewsLetters.css'

export const NewsLetters = () => {
  return (
    <div className='newsletters'>
        <h1>Dapatkan penawaran terbaik di email anda</h1>
        <p>Subcribe newsletter untuk tetap updated</p>
        <div>
            <input type="email" placeholder='Email anda'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}
