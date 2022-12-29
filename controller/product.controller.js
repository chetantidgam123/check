const { ProductModel } = require("../model/product.model");
const { default: jwtDecode } = require("jwt-decode");
const { UserModel } = require("../model/auth.model");

let decodeToken =(token)=>{
   let splittoken = []
   splittoken = token.split(" ")
   console.log(splittoken);
   var decoded = jwtDecode(splittoken[1]);
   return decoded.email
}

const addToCart = async(req,res)=>{
      let {id}  = req.params;
      let Bearer = req.headers["authorization"]
      let userEmail =  decodeToken(Bearer)
      try {
         let user = await UserModel.findOne({ email:userEmail });
         if(user){
            user.cartItem.push(id)
            return await res.send({
                   message:"Added",
                   data:user
                })
         }
      } catch (error) {
         console.log(error);
         return res.send(error)
      }
  }
  const getProd = async(req,res)=>{
    let products  = await ProductModel.find()
    return res.send(products)
   }

   module.exports = {
    getProd,
    addToCart
   }