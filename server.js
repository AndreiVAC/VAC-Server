const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]})
})

const port = 4987
app.listen(port, () => {console.log(`Server started on port ${port}.`)})
