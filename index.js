const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Your Tiny Driver is Online')
})
app.listen(port, () => {
    console.log(`Toy Store Server is Running on Port: ${port}`);
})