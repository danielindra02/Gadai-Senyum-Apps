import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
// import Product from './Product'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item.jsx'


export const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  
  return (
    <div className='shopcategory'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Menunjukkan 1-12</span> dari semua Produk
        </p>
        <div className="shopcategory-sort">
          Urutkan Dari <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if (props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <button className='shopcategory-loadmore'>Muat Lainnya</button>
    </div>
  )
}
