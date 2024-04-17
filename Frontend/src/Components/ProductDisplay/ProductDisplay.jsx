import {React, useContext} from 'react'
import './ProductDisplay.css'
import star_dull_icon from '../Assets/star_dull_icon.png'
import star_icon from '../Assets/star_icon.png'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className='productdisplay-right-star'>
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">
                Rp {product.old_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}
                </div>
                <div className="productdisplay-right-price-new">
                    Rp {product.new_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}
                </div>
            </div>
            <div className="productdisplay-right-description">
            barang yang tersedia dalam kondisi bagus dan tidak ada rusak, untuk info selengkapnya anda dapat langsung untuk menghubungi kami
            </div>
      
            <button onClick={()=>{addToCart(product.id)}}>Masukkan Keranjang</button>
            <p className='productdisplay-right-category'>
                <span>Kategory :</span> Kamera, Electronic
            </p>
            <p className='productdisplay-right-category'>
                <span>Tag :</span> Electronic, Lastest
            </p>
        </div>
    </div>
  )
}
