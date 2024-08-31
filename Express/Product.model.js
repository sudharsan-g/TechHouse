
const  mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        product_id:{
            type: String,
            required: true
        },
        category_id:{
            type: Number,
            required:true
        },
        name:{
            type :String,
            required: true
        },
        mprice:{
            type:Number,
            request: true
        },
        oprice:{
            type:Number,
            request: true
        },
        tag:{
            type:String,
            request: true
        },
        desc:{
            type:String,
            request: true
        },
        image:{
            type:String,
            request: true
        },
        types:{
            type:Object,
            request: true
        },
        PhoneCondition:{
            type:String,
            request: true
        },
        Category:{
            type:String,
            request: true
        },
        SubCategory:{
            type:String,
            request: true
        },
        
    }
);

const Product = mongoose.model("product",ProductSchema);
module.exports = Product;