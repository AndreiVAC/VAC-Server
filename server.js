const { error } = require('console');
const express = require('express')
const app = express()
const fs = require('fs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// nodemon server

var users = require('./data.json');


app.get("/api/", (req, res) => {
    res.json(JSON.stringify(users))///cu ce vrei sa trimiti 
    console.log("SENT")
})

function addNewUser(userData)
{
    users.push(userData);
    fs.writeFile("data.json", JSON.stringify(users), function(err) {
        if (err){
            console.log(err);
        }
    })
    console.log(users);
}
///GET POST
app.post("/api/newuser", (req, res) => {
    let newUserData = req.body;
    console.log(newUserData);
    addNewUser(newUserData);
    res.send("trimis");
})

const port = 4987
app.listen(port, () => {console.log(`Server started on port ${port}.`)})
