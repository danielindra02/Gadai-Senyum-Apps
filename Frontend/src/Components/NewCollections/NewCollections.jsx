 import React, { useEffect, useState } from 'react'
 import './NewCollections.css'
 import { Item } from '../Item/Item'

 export const NewCollections = () => {
  const [new_collection,setNew_collections]=useState([]);

  useEffect(()=>{
    fetch('https://gadai-senyum-apps.vercel.app/barangbaru')
    .then((response)=>response.json())
    .then((data)=>setNew_collections(data));
  },[])

   return (
     <div className='new-collections'>
        <h1>Barang Baru</h1>
        <hr />
        <div className="collections">
        {new_collection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={`${item.new_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}`} old_price={`${item.old_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}`}/>
        })}
        </div>
     </div>
   )
 }
 