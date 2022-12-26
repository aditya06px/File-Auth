const express = require('express');
const app = express();
const createDB  = require('./config/db');
const userRoutes = require('./routes/user');

// middlewares 
app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({extended: false}));

const connectDB = () => {
    createDB.sync().then(()=>{
        console.log('connected to DB');
    })
    .catch((e)=>{
        console.log('DB connection failed',e);
    })
}

const PORT = 3001;

app.use('/api/v1/user',userRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
    connectDB();
})