const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const home = require('./routes/home.js');


// app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use("/upload", express.static("./upload"));

app.use(cookieParser()); 

app.use(home);



app.listen(4000, ()=>{
    console.log("listening on http://localhost/4000");
})

