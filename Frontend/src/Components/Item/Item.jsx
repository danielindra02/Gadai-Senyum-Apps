import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

 export const Item = (props) => {
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="items-price-new">
            {`Rp ${props.new_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}`}
            </div>
            <div className="items-price-old">
            {`Rp ${props.old_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}`}
            </div>
        </div>
    </div>
  )
}

export default Item;