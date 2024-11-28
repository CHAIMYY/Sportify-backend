const express = require('express');
const path = require('path');
const router = require('./src/routes/router');
const dbConnect = require('./src/config/config');
const cors = require("cors");


const app = express();
const PORT = 3000;

dbConnect();


app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use("/", router);


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
