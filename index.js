
const express = require('express');
const cors = require('cors');
const productRouter = require('./router/product.router');
const connect = require('./db/connect');
const app = express()
app.use(cors())


app.use('/',productRouter)


connect()
.then(() => {
    app.listen(3066, () => {
        console.log('Server listening at http://localhost:3066')
    });
})