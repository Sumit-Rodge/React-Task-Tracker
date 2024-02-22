const express = require('express'); 
const cors = require('cors')
const {MongoClient} = require('mongodb')

const app = express(); 

app.use(express.json());
app.use(cors());

//port number 
const port=4001;

// MongoDB connection URL
const url = 'mongodb://localhost:27017';

app.get('/',async(req,res)=>{
    try {
        const client = await MongoClient.connect(url);
        const data = await client.db('todo').collection('todo').find({}).toArray();
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log('error occured' , error)
    }
})

app.listen(port,()=>{
    console.log(`server is running at: http://127.0.0.1:${port}`)
})