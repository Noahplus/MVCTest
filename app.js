const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/accounts', (req, res) => fs.readFile('./data.json','utf-8',(err, data )=>{
    if (err) {
        res.status(500).send()
    }
    else{
        res.send(data)
    }
}))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))