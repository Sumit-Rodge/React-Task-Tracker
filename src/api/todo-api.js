const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/',async (req,res)=>{
    let client;
    try {
        client = await MongoClient.connect(uri);
        const data = await client.db('todo').collection('todo').find({}).toArray();
        res.send(data)
    } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).send('Internal Server Error');
    } finally{
        await client.close()
    }

})

app.get('/task/:id',async (req,res)=>{
    const taskid = parseInt(req.params.id);
    let client;
    try {
        client = await MongoClient.connect(uri);
        const data = await client.db('todo').collection('todo').find({id:taskid}).toArray();
        res.send(data)
    } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).send('Internal Server Error');
    } finally{
        await client.close()
    }

})


app.post('/addtask',async (req,res)=>{
    try {
        const entry = await req.body.task;
        
        const client = await MongoClient.connect(uri);
        const length = (await client.db('todo').collection('todo').find({}).toArray()).length;
        await client.db('todo').collection('todo').insertOne({"id":length + 1,"task":entry,"status":false});
        res.sendStatus(200).end();
    } catch (error) {
        console.log(error);
    }
})



app.put('/updatetask/:taskid',async (req,res)=>{
    try {
        const entry = await req.body.task;
        const taskid = parseInt(req.params.taskid);
        const client = await MongoClient.connect(uri);
        
        await client.db('todo').collection('todo').updateOne({id:taskid},{$set:{task:entry}})
        res.sendStatus(200).end();
    } catch (error) {
        console.log(error);
    }
})


app.delete('/removetask/:taskid',async (req,res)=>{
    let client;
    const taskid = parseInt(req.params.taskid);
    try {
        client= await MongoClient.connect(uri);
        await client.db('todo').collection('todo').deleteOne({id:taskid});
        res.sendStatus(200).end();
    } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.put('/update/:taskid',async (req,res)=>{
    
    const taskid = parseInt(req.params.taskid);
    
    try {
        client= await MongoClient.connect(uri);
        let doc = await client.db('todo').collection('todo').findOne({id:taskid});
        let initialStatus = doc.status;
        await client.db('todo').collection('todo').updateOne({id:taskid},{$set:{status:!initialStatus}});
        res.sendStatus(200).end();
    } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).send('Internal Server Error');
    }
})


const port=4000;
app.listen(port,()=>{
    console.log(`server started at : http://127.0.0.1:${port}`);
})