require("dotenv").config();
const express = require('express');
const { connect } = require('mongoose');
const tesUser = require('./routes/user');
const auth = require('./routes/auth');

const app = express();

connect(process.env.MONGODB).then(() => console.log('connect to db')).catch(err => console.log(err))

app.use(express.json());
app.use('/auth', auth);





app.listen(5000, () => {
    console.log("server running");
})