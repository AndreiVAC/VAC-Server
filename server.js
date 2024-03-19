const { error } = require('console');
const express = require('express')
const app = express()
const fs = require('fs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'https://atc-2024-valve-anti-cheat-fe-linux-web-app.azurewebsites.net');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// nodemon server

var users = require('./data.json');

app.get("/api/", (req, res) => {
    res.json(JSON.stringify(users))
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

app.post("/newuser", (req, res) => {
    let newUserData = req.body;
    console.log(newUserData);
    addNewUser(newUserData);
    res.send(true);
})

function tryLogin(data){
    for(let i=0; i<users.length; i++)
    {
        console.log(users[i]['mail']);
        if(users[i]['mail'] === data['mail']){
            if(users[i]['pass'] === data['pass']){
                return true;
            }
        }
    }
    return false;
}

app.post("/login", (req, res) => {
    let loginInfo = req.body;
    if (tryLogin(loginInfo)){
        res.send(true);
    }
    else{
        res.send(false);
    }
})

const port = 8080
app.listen(port, () => {console.log(`Server started on port ${port}.`)})
