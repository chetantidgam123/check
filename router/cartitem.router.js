const express = require("express");
const { addToCart, getCart, getUserCart, updateCartQty } = require("../controller/cartitem.controller");
let cartItemRouter = express.Router();

cartItemRouter.get("/user/addtocart/:id", addToCart)
cartItemRouter.get("/user/cartitem", getUserCart)
cartItemRouter.put("/user/cartitem/:id", updateCartQty)
  module.exports = cartItemRouter