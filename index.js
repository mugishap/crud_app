const express = require('express')//import express
const app = express()//create an express app
var bodyParser = require('body-parser')//import body-parser
const users = [{
    id: 1,
    name:'Tresor',
    age:20,
    gender:'Male'
},{
    id:2,
    name:'Mugisha',
    age:16,
    gender:'Male'
}]

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//api to get all users

app.get('/api/users', function (req, res) {
  res.send(users)
})
//api to get user by id

app.get('/api/users/:id',(req,res)=>{
    for (const i in users) {
        if (users[i].id == req.params.id) 
        return res.send(users[i])            
      
    }
    return res.status(404).send(`User with id(${req.params.id}) was not found`)

})
//api to create user
app.post('/api/users',(req,res)=>{
    console.log (typeof(req.body.name))
    //Joi
    let error = !req.body.name?'name is required' : !req.body.age?'age is required':!req.body.gender?'Gender is required':''
    if(error != '')
        return res.status(400).send(error)
        let valid_gender = ['Male','Female']
error = typeof(req.body.name) != "string"?'name must be a string' : typeof req.body.age != 'number' ?'age must be a number':!valid_gender.includes(req.body.gender)?`Gender is must be ${valid_gender.join()}`:''
    if(error != '')
        return res.status(400).send(error)
    
    let user = {
        id: users.length + 1,
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender
    }
    users.push(user)
    return res.status(201).send(user)
})
app.listen(3000,()=>{
    console.log("Yooo Precieux,server is running ...")
})