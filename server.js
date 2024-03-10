const express = require('express')
const app = express()
// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// nodemon server
// postman

var users = [];

app.get("/api/", (req, res) => {
    res.json(JSON.stringify(users))
    console.log("SENT")
})

function addNewUser(userData)
{
    users.push(userData);
    console.log(users);
}

app.post("/api/newuser", (req, res) => {
    const newUserData = req.body;
    console.log(newUserData);
    addNewUser(newUserData);
})

const port = 4987
app.listen(port, () => {console.log(`Server started on port ${port}.`)})
