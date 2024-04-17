import React, {useContext} from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
    const {getTotalCartItems,getTotalCartAmount,all_product, cartItems, removeFromCart} = useContext(ShopContext)
    let totalharga=0;
    let barangArray = [];
    let barangObject = {};
    let totalunit = Number(getTotalCartItems());

    const sendMessage = function(){
        const url = "https://api.whatsapp.com/send?phone=6281362626570&text=Halo%20Gadai%20Seyum%2C%20saya%20ingin%20melakukan%20pemesanan%20Barang%20%3A%20%0A%0A*"+ (JSON.stringify(barangArray)) +"*%0A%0Adengan%20total%20unit%20%3A%20*"+ `${totalunit} Unit` +"*%0Atotal%20harga%20%3A%20*"+ `Rp ${totalharga.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}` +"*%0A%0Aharap%20untuk%20segera%20memproses%20pesanan%20saya%2C%20terima%20kasih."
        window.open(url);
    }
  return (
    <div className='cartitems'>
<div className="cartitems-format-main">
    <p>Products</p>
    <p>Title</p>
    <p>Price</p>
    <p>Quantity</p>
    <p>Total</p>
    <p>Remove</p>
    </div>
    <hr />
    {/* compare jika cartItem > 0, maka product.id ini available maka selanjutnya akan kita return isinya  */}
    {all_product.map((e)=>{
        if(cartItems[e.id]>0)
        {
            barangObject = {
                "nama": e.name,
                "unit": cartItems[e.id],
                "harga": e.new_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'}),
                "total": (e.new_price*cartItems[e.id]).toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})
            };
            barangArray.push(barangObject);
            totalharga += e.new_price*cartItems[e.id];
            console.log(barangObject);
            return(
            <div>
            <div className="cartitems-format cartitems-format-main">
            <img src={e.image} alt="" className='carticon-product-icon'/>
            <p>{e.name}</p>
            <p>Rp {e.new_price.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}</p>
            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
            <p>Rp {(e.new_price*cartItems[e.id]).toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}</p>
            <img className='cartitems-remove-icon' src={remove_icon} alt="" onClick={()=>{removeFromCart(e.id)}}/>
            </div>
            <hr />
            </div>
            )
            
        }
        return null;
    })}
    <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div>
                <div className='cartitems-total-item'>
                    <p>Jumlah Unit</p>
                    <p>{getTotalCartItems()} Unit</p>

                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>Rp {totalharga.toLocaleString('id-ID', {styles: 'currency', currency: 'USD'})}</h3>
                </div>
            </div>
            <button onClick={sendMessage}>Proceed To Checkout</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text"  placeholder='promo code' />
                <button>Submit</button>
            </div>
        </div>
    </div>

    </div>
  )
}
