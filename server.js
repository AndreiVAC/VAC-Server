const { error } = require('console');
const express = require('express')
const app = express()
const fs = require('fs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // https://atc-2024-valve-anti-cheat-fe-linux-web-app.azurewebsites.net

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// nodemon server

var users = require('./data.json');

app.get("/users", (req, res) => {
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

function verifyData(data)
{
    for(let i=0; i<users.length; i++)
    {
        if(users[i]['mail'] === data['mail']){
            return false;
        }
        if(users[i]['name'] === data['name']){
            return false;
        }
    }
    let re = /^[a-zA-Z0-9._-]{5,}$/;
    if (re.test(data.name))
    {
        re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
        if(re.test(data.pass))
        {
            re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(re.test(data.mail))
            {
                if ('organization' in data){
                re = /^\w[\w\d\s.,#-]{4,58}\w$/
                if (re.test(data.organization))
                {
                    if (re.test(data.headquarters))
                    {
                        return true;
                    }
                }
            }
            else
            {
                return true;
            }
            }
        }
    }
    return false
}

app.post("/newuser", (req, res) => {
    let newUserData = req.body;
    if (verifyData(newUserData)){
        addNewUser(newUserData);
        res.send(true);
    }
    else{
        res.send(false);
    }
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
