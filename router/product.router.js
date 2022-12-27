const express = require("express");
const { addProd, getProd } = require("../controller/product.controller");
let productRouter = express.Router();

productRouter.post("/product", addProd)
productRouter.get("/products", getProd)

  module.exports = productRouter