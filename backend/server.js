const express = require('express');
const db = require('./config/db');
const dotenv = require('dotenv');
const routes = require('./routes/route');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require("path");

dotenv.config();
const app = express();

 const allowedOrigins = [
  'http://localhost:5173',
  'https://agromateweb.netlify.app'
];

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/images', express.static(path.join(__dirname,'public/images')));

app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }));


app.use('/api', routes)

const PORT = process.env.PORT || 5500;

app.listen(PORT, ()=>{
    console.log(`Server is running at :http://localhost:${PORT}`);
})