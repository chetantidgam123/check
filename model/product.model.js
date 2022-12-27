const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name:{type:String,required:true}
})

const ProductModel = mongoose.model('products',ProductSchema);
module.exports = {ProductModel}