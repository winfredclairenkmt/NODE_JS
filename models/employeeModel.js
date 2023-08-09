const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        trim:true,//removes unnecessary whitespace after putting in information,improves UIX
    },
    lastname:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        unique: true//this attribute does not allow repeated values(in this case emails)
    },
    telephone:{
        type:String,
        required: true,
        unique: true
    },

})

module.exports = mongoose.model("Employee", EmployeeSchema);



//schemas are named in singular
