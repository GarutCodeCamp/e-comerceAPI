require("dotenv").config();
const express = require('express');
const { connect } = require('mongoose');
const userUpdate = require('./routes/user');
const auth = require('./routes/auth');
const product = require('./routes/product');
const app = express();

connect(process.env.MONGODB).then(() => console.log('connect to db')).catch(err => console.log(err))

app.use(express.json());
app.use('/auth', auth);
app.use('/users', userUpdate);
app.use('/product', product);



app.listen(5000, () => {
    console.log("server running");
})