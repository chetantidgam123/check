const express = require("express");
const { getProd, addToCart } = require("../controller/product.controller");
let productRouter = express.Router();

productRouter.post("/product/:id", addToCart)
productRouter.get("/products", getProd)

  module.exports = productRouter