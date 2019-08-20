"use strict"

var express     = require('express');
var app         = express();
var body_parser = require('body-parser');
var mysql       = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : "localhost",
    user     : "james",
    password : "password",
    database : "bjss_tutorial"
});

connection.connect(function(err) {
    if (err) throw err;
});

// configure app to use body_parser()
// this will let us get the data from a POST
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

var port = process.env.PORT || 8080;

// =================
// == API ROUTING ==
// =================
var router = express.Router();

// Create a new employee and add it to the list 
router.route("/create")
    .post(function(req, res)  {
        connection.query("INSERT INTO employees SET ?", req.body, function(err, result) {
            if (err) {
                if (err.errno == 1062) {
                    connection.query("SELECT * FROM employees WHERE name=?", req.body.name, function(err2, result2) {
                        if (err2) throw err2;
                        res.status(409).send(result2[0]);
                    });
                }
                else {
                    throw err;
                }
            }
            else {
                connection.query("SELECT * FROM employees WHERE name=?", req.body.name, function(err2, result2) {
                    if (err2) throw err2;
                    res.status(201).send(result2[0]);
                });
            }
        });
    });

// Return a list of all employees
router.route("/employees")
    .get(function(req, res) {
       connection.query("SELECT * FROM employees", function(err, result) {
            if (err) throw err;
            res.status(200).send(result);
        });
    });


// Return a single employee by id
router.route("/employee/:employee_id")
    .get(function(req, res) {
        connection.query("SELECT * FROM employees WHERE id=?", req.params.employee_id, function(err, result) {
            if (err) throw err;

            if (result.length == 0) {
                res.status(200).send("No employee found with this ID");
            } else {
                res.status(200).send(result[0]);
            }
        });
    });

// Update an employee's information by id
router.route("/update/:employee_id")
    .put(function(req, res) {
        connection.query("UPDATE employees SET ? WHERE id=?", [req.body, req.params.employee_id], function(err, result) {
            if (err) throw err;
            res.status(200).send("Record updated!")
        });
    });

// Delete an employee's information by id
router.route("/delete/:employee_id")
    .delete(function(req, res) {
        connection.query("DELETE FROM employees WHERE id=?", req.params.employee_id, function(err, result) {
            if (err) throw err;
            res.status(200).send("Employee deleted!")
        });
    });


app.use("/api", router);

// Start server
app.listen(port);
console.log("App started on port " + port);
