const express = require('express');
const {spawn}  = require('child_process');
const mongoose  = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./Product.model');
const { type } = require('os');
const DB_String = "mongodb+srv://admin:KaniTBMK%4023@cluster0.nw53mzt.mongodb.net/TechHouse?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
app.use(bodyParser.json());


app.use(cors());
app.use(
    express.json());
mongoose.connect(DB_String).then(() => {
                console.log('Connected to MongoDB');
                app.listen(3000,()=>{
                    console.log('Server is running on port 3000');
                });
                
            }).catch((e) =>{
                console.log("Connection failed");
            }
);

app.get("/api/banner",async(req,res)=>{
    try{
        const banner = await Product.find({"tag ":"Banner"});
        res.status(200).json(banner);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
});

app.get("/api/bestseller",async(req,res)=>{
    try{
        const banner = await Product.find({"tag ":"BS"});
        res.status(200).json(banner);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
});

app.get("/api/newlaunches",async(req,res)=>{
    try{
        const banner = await Product.find({"tag ":"NL"});
        res.status(200).json(banner);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
});

app.get("/api/products/:categoryid",async(req,res)=>{
    try{
        const {categoryid} = req.params;
        const Products = await Product.find({"category_id":categoryid});
        res.status(200).json(Products);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
})

app.get("/api/product/:prodid",async(req,res)=>{
    try{
        const {prodid} = req.params;
        const Productd = await Product.find({"product_id":prodid});
        res.status(200).json(Productd);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
});



app.post("/api/sendotp/:phn",async(req,res)=>{

    try{
        const {data} = req.body;
        script  = data;
        
        const {phn} = req.params;
        const child_py  = spawn('python',["./send_otp.py",script,phn]);
        child_py.stdout.on('data', (data) => { 
            console.log(`stdout:${data}`);
        });
        child_py.stderr.on('data', (data) => {
            console.error("ERROR"  + data);
        });
        child_py.on('close',(code)=>{
            console.log("Child process closed "+code);
            res.status(200).json({message:"Successful"});
        });
    }
    
    
    catch(e){
        res.status(500).json({message:e.message});
    }

});


app.post("/api/checkproductava",async(req,res)=>{
    
    try{
        const arr = [];
        const { data } = req.body;
        await Promise.all(JSON.parse(data).map(async (element) => {
            const val = `types.${element["color"]}.${element["size"]}.qty`;
            const query = { "name ": element["product"] };
            query[val] = { $gte: element["qty"] };
            const d = await Product.find(query);
            if (d.length > 0) {
                element["image"]= d[0]["image"]; 
                arr.push(element); 
            }
        }));
       
        res.status(200).json({ message: arr });
    }
    catch(e){
        res.status(500).json({message:e});
    }
});

app.post("/api/increaseqty/:qty",async(req,res)=>{
    
    try{
        
        let qty = parseInt(req.params.qty, 10);
        const {data} = req.body;
    
        const val = `types.${data["color"]}.${data["size"]}.qty`;
        const query = { "name ": data["product"] };
        query[val] = { $gt: data["qty"] };
       
        const d = await Product.find(query);
        if (d.length > 0) {
            qty += 1;
        }
    
        res.status(200).json({ message: qty });

    }
    catch(e){

    }
})