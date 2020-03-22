
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
app.use(express.json())

app.get('/accounts', (req, res) => fs.readFile('./data.json','utf-8',(err, data )=>{
    if (err) {
        res.status(500).send()
    }
    else{
        res.json(JSON.parse(data))
    }
}))

asyncReadFile =function(path)
{
    return new Promise(
        function(resolve,reject){
            fs.readFile(path,'utf-8',function(err,data){
                if(err){
                    reject(err)
                }
                resolve(data)
            })
        }
        )
    }
const asyncWriteFile =function (string,path){
    return new Promise(function(resolve,reject){
        fs.writeFile(path,string,function(err,data){
            if(err){
                reject(err)
            }
            resolve(data)
        })
    }).catch(err=>{
        return err
    })

}
const createAccount = async (req,res) =>{
    const newAccount =req.body
    const file = await asyncReadFile('./data.json') 
    const account = JSON.parse(file)
    if(account.filter(v=>v.email===newAccount.email).length!=0){
        res.status(400).send
    }
    else{
        account.push(newAccount)
        await asyncReadFile('./data.json',JSON.stringify(account))
        await asyncWriteFile(JSON.stringify(account),'./data.json')
        res.status(201).send(account)
    }

}

app.post('/accounts', createAccount)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
exports.app =app