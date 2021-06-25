const express = require('express');
const router = express.Router();

const sqlConnection = require('../connection');


router.get("/:id", (req, res) => {
    const sqlQuery = "SELECT * FROM schedules where teachers_id =" + (req.params.id);
    // console.log(sqlQuery);
    sqlConnection.query(sqlQuery, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        }
        else {
            console.log(err);
        }
    })
})

router.post("/delete/:id", (req, res) => {
    // console.log(req.body.date);
    const sqlQuery = "DELETE  FROM schedules where teachers_id =" + (req.params.id) +" and date = '"+ req.body.date +"'";

    // console.log(sqlQuery);
    sqlConnection.query(sqlQuery, (err, rows, fields) => {
        if (!err) {
            console.log("deleted",rows);
            res.json("deleted") 
        }
        else {
            
            console.log(err);
            res.json(err);
        }
    })
})

router.post("/:id", (req, res) => {

    const sqlQuery = "INSERT INTO schedules (task_name,date,time,teachers_id) VALUES ?";
    const task_name = req.body.task_name;
    const date = req.body.date;
    const teachers_id = req.params.id;
    const time = req.body.time;
    const isUniqueQuery = "SELECT * FROM schedules WHERE teachers_id = " + teachers_id + " and date= '" + date.toString() + "'";
    var value = [[task_name, date, time, teachers_id]];
    sqlConnection.query(isUniqueQuery, (err, rows, fields) => {
        if (!err) {
            // console.log(rows)
               
            if(rows.length==0){
               pushData();
            }
            else{
                res.json("Schedule busy");
            }
        }else{
            console.log(err);
        }
    })

    function pushData() {
        // console.log(sqlQuery);
        sqlConnection.query(sqlQuery, [value], (err, rows, fields) => {
            if (!err) {
                res.json("Success");
            } else {
                res.json(err)
            }
        })
    }
});

module.exports = router;