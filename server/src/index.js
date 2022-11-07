const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');


dotenv.config();

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(cors());
app.use(morgan('tiny'));

app.use('/user', require('./routes/userRoute'));
app.use('/exercise', require('./routes/exerciseRoute'));


mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(5000);
    console.log('Server is running on port 5000');
});

