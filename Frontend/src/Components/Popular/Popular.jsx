import React, { useEffect, useState } from 'react'
import './Popular.css'
import { Item } from '../Item/Item'

export const Popular = () => {

  const [popularProducts,setPopularProducts]=useState([]);

  useEffect(()=>{
    fetch('https://gadai-senyum-apps.vercel.app/populardalamkamera')
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  },[]);

  return (
    <div className='popular'>
        <h1>Barang Populer Handphone</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={`${item.new_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}`} old_price={` ${item.old_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}`}/>
            })}
        </div>
    </div>
  )
}
