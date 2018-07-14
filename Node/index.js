const express = require('express')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'todo';
const collection = 'tasks';
let db;

app.use(bodyParser.json());
app.use(cors());

MongoClient.connect(url, function(err, client){
    db = client.db(dbName);
});

app.post('/store', function(req, res){
    let t = req.body;
    db.collection(collection).insertOne(t, function(err, r){
        res.json(r);
    });
});

app.post('/remove', function(req, res){
    let t = req.body;
    console.log(t);
    db.collection(collection).deleteOne({task: t.task, status: t.status, priority: t.priority, date: t.date} , function(err, r){
        //console.log(r);
        res.json(r);
    });
});

app.post('/read', function(req, res){
    db.collection(collection).find({}).toArray(function(err, r){
        res.json(r);
    });
});

app.post('/update', function(req, res){
    let t = req.body;
    console.log(t);
    db.collection(collection).updateOne(t.old_data, {$set: t.new_data}, function(err, r){
        res.json(r);
    });
});

app.listen(8080, function(){
    console.log('Server started at 8080');
})