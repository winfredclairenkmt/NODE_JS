const express = require("express");
const Employee = require("../models/employeeModel");
const router = express.Router();
const ensureLoggedIn = require("connect-ensure-login");

//route for getting the form
router.get("/employeeform", (req, res) => {
    res.render("./pug/emp_form.pug");
})


//route for creating an employee
router.post("/regemployee", async(req, res) => {
    try{
        const person = new Employee(req.body);
        await person.save();
        console.log(req.body);
        res.redirect("/api/employeeform");//redirecting to employee page(a blank form)would be nice to have a home page to back to
        
    }
    catch(error){
        res.status(400).render("employee.pug");
        console.log(error);
    }
});

//route for getting all employees on their list as a table
router.get("/emplist", async (req, res) =>{
        try{
            let items = await Employee.find();
            // agregating our employee ages(carrying out an arithmetic operation)
            let ages = await Employee.aggregate([
                {$group: {_id: "$all",
                totalAge: {$sum: "$age"}
            }}           
        ]);
        //let ages = group{totalAge:{$sum}}
        //here the sum of ages is an object which is an array and it is nested in an object so we have to call it by using the index of 0"[]""

        let genderCount = await Employee.aggregate([ {match:{
            gender: "male"
        }}
            
        ]).count();
            res.render("./pug/emp_list.pug",{employees: items, empAges:ages[0].totalAge,genderCount:ages[0].gender});
        }
        catch(error){
            console.log(error);
            return res.status(400).send({message: "Sorry could not get employees"});
           
        }
    });

//route for deleting an employee
router.post("/employee/delete",async (req,res)=>{
    try{
        await Employee.deleteOne({_id: req.body.id});
        res.redirect("back");
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: "Sorry could not delete employee from database"});
    }
});

//route to edit an employee's details
//it is a two-step process; first we get the id of the employee we want to edit, then we get the employee we want to edit, and finally we edit the employee. 
router.get("/employee/edit/:id",async (req,res)=>{
    try{
        const emp = await Employee.findOne({ _id:req.params.id});
        res.render("./pug/emp_edit.pug",{employee: emp});
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: "Sorry could not find employee in database."});
    }
});

//post route for newly edited data
router.post("/employee/edit", ensureLoggedIn("/api/login"), async (req,res)=>{
    try{
        req.session.user = req.user;
        if(req.session.user.role === "director" || req.session.user.role === "manager" ){
        await Employee.findOneAndUpdate({_id: req.query.id}, req.body);
        res.redirect("/api/emplist");
        }
        else{
            res.render("./pug/landing.pug", {alert:"You are not authorized to access this page."});
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: "Sorry could not edit employee database."});
    }
    
});

module.exports = router;