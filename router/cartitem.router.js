const express = require("express");
const { addToCart, getCart, getUserCart } = require("../controller/cartitem.controller");
let cartItemRouter = express.Router();

cartItemRouter.get("/user/addtocart/:id", addToCart)
cartItemRouter.get("/user/cartitem", getUserCart)
  module.exports = cartItemRouter