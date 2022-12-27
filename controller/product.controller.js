const { ProductModel } = require("../model/product.model");


const addProd = async(req,res)=>{
      let {name}  = req.body;
      let prod = await ProductModel.create({name:name})
     return res.send(
        {
            message:"Added",
            data:prod
    }
     )
  }
  const getProd = async(req,res)=>{
    let products  = await ProductModel.find()
    return res.send(products)
   }

   module.exports = {
    getProd,
    addProd
   }