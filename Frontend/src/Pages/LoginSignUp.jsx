import React, {useState} from 'react'
import './CSS/LoginSignUp.css'

export const LoginSignUp = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async ()=>{
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch('https://gadai-senyum-apps.vercel.app/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    
    //if respon data sukses maka username dan password akan digenerated setelah itu kita akan menambahkan auth token di local storage
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/"); 
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async ()=>{
    console.log("Sign Up Function Executed",formData);
    let responseData;
    await fetch('https://gadai-senyum-apps.vercel.app/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    
    //if respon data sukses maka username dan password akan digenerated setelah itu kita akan menambahkan auth token di local storage
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/"); 
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='password' />
        </div>
        
        <button onClick={()=>{state==="Login"?login():signup()}}>Lanjutkan</button>

        {state==="Sign Up"?
        <p className='loginsignup-login'>Sudah Punya Akun? <span onClick={()=>{setState("Login")}}>Login</span></p>
        :<p className='loginsignup-login'>Buat Akun Baru <span onClick={()=>{setState("Sign Up")}}>Register</span></p>}

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Saya setuju dengan aturan yang berlaku</p>
        </div>
      </div>
    </div>
  )
}
