//initials dependencies & Moduls
const port = 4000;//define our port on server running
const express = require("express");//package name "express"
const app = express();//create app using express
const mongoose = require("mongoose");//initials mongoo package
const jwt = require("jsonwebtoken");//initials json web token
const multer = require("multer");//initials multer
const path = require("path"); //include path express server to access backend apps
const cors = require("cors");

app.use(express.json());//app auto pass the json

app.use(cors(
    {
        origin:["https://gadai-senyum-apps-front.vercel.app"],
        methods:["GET","POST","DELETE"],
        credentials:true,
        headers:{
            accessControlAllowOrigin: ["https://gadai-senyum-apps-front.vercel.app"]
        }
    }
));

app.listen(4000, console.log("Server Running"));


//react.js connect to port

//Database connection with mongoDB
mongoose.connect("mongodb+srv://danielindra02:UCNNoBKnac70Qns8@cluster0.zkkkwxf.mongodb.net/")

//API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
    console.log("Express App is Running");
})

// image storage engine

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req, file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});

// Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type: Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})


//Creating API For deleting Products

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("remove");
    res.json({
        success:true,
        name:req.body.name
    })
})

// Creating API For getting all Products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Product Fetched");
    res.send(products);
})


// Shema creating for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true, //any user cannot create a same email id
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating Endpoint for registering User

app.post('/signup',async(req,res)=>{
    //cek email password sudah ada / belum

    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"existing user found with same email address"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

// creating endpoint for user login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
        const token = jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
})

// creating endpoint for newcollection data
app.get('/barangbaru',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// creating endpoint for newcollection data
app.get('/relatedproducts',async(req,res)=>{
    let products = await Product.find({});
    let relatedproducts = products.slice(4).slice(-4);
    console.log("Related Product Fetched");
    res.send(relatedproducts);
})

// creating endpoint for popular in women section
app.get('/populardalamkamera',async(req,res)=>{
    let products = await Product.find({category:"handphone"})
    let popular_in_woman = products.slice(0,4);
    console.log("Popular in handphone fetched");
    res.send(popular_in_woman);
})

// creating middleware to fetch user
// make async arrow function, parameter req,res,next
// take the auth-token dan verify that using jwt and find the user
    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        //cek apakah sudah ada user atau tidak
        if (!token) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
        else{
            try {
                // token will be decoded using 'secret_ecom'
                const data = jwt.verify(token,'secret_ecom');

                //get the access of user data in our request 
                req.user = data.user;
                next();

            } catch (error) {
                res.status(401).send({errors:"please authenticate"})
            }
        }

    }


//creating endpoint for addtocart => create middleware in addtocart
app.post('/addtocart', fetchUser, async(req,res)=>{
    console.log("Added",req.body.itemId);
    
    //we will use the user id to get the user
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

// CREATING END POINT TO REMOVE PRODUCT FROM CART DATA
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

// creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
    console.log("Server Running on Port "+port);
    }
    else{
        console.log("Error : "+error) 
    }
})
 

