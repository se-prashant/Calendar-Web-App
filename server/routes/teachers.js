const express = require('express');

const router = express.Router();

const sqlConnection  = require('../connection');

router.get("/",(req,res)=>{
    sqlConnection.query("SELECT * from teachers",(err,rows,fields)=>{
        if(!err){
           
            res.json(rows);
        }
        else{
            console.log(err);
        }
    })
});

router.post("/add",function(req,res){
    const sqlQuery = "INSERT INTO teachers (name,department) VALUES ?";
    var value = [[req.body.name,req.body.department]];
    sqlConnection.query(sqlQuery,[value],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});
module.exports = router;