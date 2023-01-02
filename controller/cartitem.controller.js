const { ProductModel } = require("../model/product.model");
const { UserModel } = require("../model/auth.model");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { default: jwtDecode } = require("jwt-decode");
const { CartItemmodel } = require("../model/cartitem.model");
const token_secret = process.env.TOKEN_KEY;

const addToCart = async (req, res) => {
    let {id} = req.params;
    // let item_id = item._id.toString()
    let Bearer = req.headers["authorization"]
    let splittoken = Bearer.split(" ")
    let token = splittoken[1].replace('"', '');
    try {
        var decode = jwt.verify(token, token_secret)
        if (decode) {
            let userEmail = decode.email
            let user = await UserModel.findOne({ email: userEmail });
            let product = await ProductModel.findOne({ _id: id });
            let b = user._id.toString()
            let a = b.replace('"', "");
            let checkuser = await CartItemmodel.findOne({ userId: a })
            if (checkuser) {
                let existing_prod = await CartItemmodel.findOne({ "cartItem.cartId": id });
                if (existing_prod) {
                    return res.send({
                        message: "Item Already in Cart"
                    })
                } else {
                    let cart = await CartItemmodel.findOneAndUpdate(
                        { userId: checkuser.userId },
                        {
                            $push: {
                                cartItem: {
                                    cartId: id,
                                    name: product.name,
                                    image_1: product.image_1,
                                    image_2: product.image_2,
                                    image_3: product.image_3,
                                    image_4: product.image_4,
                                    image_5: product.image_5,
                                    price: product.price,
                                    sold: product.sold,
                                    manufacture_date: product.manufacture_date,
                                    color: product.color,
                                    size: product.size,
                                    stock: product.stock,
                                    Qty:1
                                }
                            }
                        },
                        { new: true }
                    )
                    return res.send({
                        message: "Item Added in cart",
                        data: cart
                    })
                }

            } else {
                let cart = await CartItemmodel.create({
                    userId: a,
                     cartItem: [
                        {
                            cartId: id,
                            name: product.name,
                            image_1: product.image_1,
                            image_2: product.image_2,
                            image_3: product.image_3,
                            image_4: product.image_4,
                            image_5: product.image_5,
                            price: product.price,
                            sold: product.sold,
                            manufacture_date: product.manufacture_date,
                            color: product.color,
                            size: product.size,
                            stock: product.stock,
                            Qty:1
                        }
                    ]
                })
                return res.send({
                    message: "User Item Added in cart",
                    data: cart
                })

            }
        }
    }
    catch (err) {
        console.log(err);
        res.send({
            err
        })
    }
}

const getUserCart = async (req, res) => {
    let Bearer = req.headers["authorization"]
    let splittoken = Bearer.split(" ")
    let token = splittoken[1].replace('"', '');
    try {
        var decode = jwt.verify(token, token_secret)
        if (decode) {
            let userId = decode.userId.toString()
            let userCart = await CartItemmodel.findOne({ userId: userId });
            let cartItem = userCart.cartItem
            res.send({cartItem})
        }
    }
    catch (err) {
        console.log(err);
        res.send({
            err
        })
    }
}
const getCart = async (req, res) => {
    let data = await CartItemmodel.find()
    return res.send({
        data
    })
}
module.exports = {
    addToCart,
    getCart,
    getUserCart
}