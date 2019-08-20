var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Employee = new Schema({
    id: Number,
    name: String,
    salary: Number,
    age: Number
});

module.exports = mongoose.model("Employee", EmployeeSchema);
