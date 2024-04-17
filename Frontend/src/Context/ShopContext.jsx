import { React, createContext, useEffect, useState} from "react";

export const ShopContext = createContext(null);

// membuat cart kosong sesuai dengan jumlah product yang ada berasarkan index
const getDefaultCart = () =>{
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => { 

    const [all_product,setAll_Product]=useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    useEffect(()=>{
        fetch('https://gadai-senyum-apps.vercel.app/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('https://gadai-senyum-apps.vercel.app/getcart',{
                method:'POST',
                headers:{
                    Accept:'aplication/form-data',
                   'auth-token':`${localStorage.getItem('auth-token')}`,
                   'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])

        //cek jika total cart lebih dari 0
        const getTotalCartItems = () =>{
            let totalItem = 0;
            for(const item in cartItems){
                if(cartItems[item]>0)
                {
                    totalItem += cartItems[item];
                }
            }
            return totalItem;
        }
    

    const addToCart = (itemId) => {
        // send the prev value, use spread operator '...', itemId Value akan menghasilkan nilai dari key tersebut 
         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('https://gadai-senyum-apps.vercel.app/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        // send the prev value, use spread operator '...', itemId Value akan menghasilkan nilai dari key tersebut 
         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
         if(localStorage.getItem('auth-token')){
            fetch('https://gadai-senyum-apps.vercel.app/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
         }
    }

    // for loop to parse our cart items from our cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
            return totalAmount;
        }
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;