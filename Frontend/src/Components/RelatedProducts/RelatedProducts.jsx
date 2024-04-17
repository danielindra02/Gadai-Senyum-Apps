import React, { useEffect } from 'react'
import './RelatedProducts.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'
import { useState } from 'react'

export const RelatedProducts = () => {

  const [relatedProducts,setRelatedProducts]=useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/relatedproducts')
    .then((response)=>response.json())
    .then((data)=>setRelatedProducts(data));
  },[]);


  return (
    <div className='relatedproducts'>
      <h1>Produk Lainnya</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}
