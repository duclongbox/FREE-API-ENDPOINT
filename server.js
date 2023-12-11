const express = require('express');
const path = require('path');
const app = express()
const HTTP_PORT = process.env.PORT || 8080


//req.body
app.use(express.urlencoded({extended:true}))

// ejs
app.set("view engine", "ejs");
app.use(express.static("public"))

//mongo
const mongoose = require('mongoose')
const CONNECTION_STRING 
    = "mongodb+srv://duclongbox:hoangduclong@cluster0.k0roye6.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING)
const db = mongoose.connection
db.on("error", console.error.bind(console, "Error connecting to database: "));
db.once("open", () => {
 console.log("Mongo DB connected successfully.");
});

// Schema
const Schema = mongoose.Schema
const ProductSchema = new Schema(
   {
    title:String,
    description:String,
    price:Number,
    thumbnail:String
   }
)

const Products = mongoose.model("products",ProductSchema)

app.get("/", async (req,res)=>{
    res.render('index')
})

// app.get("/api/products", async (req,res)=>{
//     try{
//         const results = await Products.find({ price: { $gte: 0 } }).lean().exec();
//         return res.status(200).json(results)
//     }catch(err){
//         const errObj = {message:err}
//         return res.status(500).json(errObj)
//     }
// })
app.get("/api/products/price/:priceToFind?",async(req,res)=>{
    const price = req.params.priceToFind
    
    try{
        if(price === undefined){
            const results = await Products.find({ price: { $gte: 0 } }).lean().exec();
            return res.status(200).json(results)
            
        }
        else{
            const results = await Products.find({price: {$gte: price}}).lean().exec();
            return res.status(200).json(results)

        }
    }
    catch(err){
        const errObj = {message:err}
        return res.status(500).json(errObj)
    }
})
app.post("/api/products/get",async (req,res)=>{
    console.log('received')
   console.log(req.body)
   
})
const onListenServer =()=>{
    console.log("Express http server listening on: " + HTTP_PORT);
    console.log(`http://localhost:${HTTP_PORT}`);
}
app.listen(HTTP_PORT,onListenServer)