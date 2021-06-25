const express = require('express');

const teacherRoutes = require("./routes/teachers");
const schedulesRoutes = require("./routes/schedules");

const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/schedules",schedulesRoutes);
app.use("/teachers",teacherRoutes);



app.listen(process.env.PORT || 3000, function () {
    console.log(`server is up and running.`);
});