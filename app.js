const express = require('express')
const Datastore = require('nedb-promise')
const app = express()

const db = new Datastore({filename:'mydata.db', autoload: true})

app.use(express.urlencoded())
app.use(express.json())

app.get('/users', async (req,res) => {
    const users = await db.find({})
    res.json(users)
})

app.get('/users/:id', async (req,res) => {
    const user = await db.findOne({_id: req.params.id})
    if(user){
        res.json(user)
    }else{
        res.status(404).send()
    }
})

app.post('/users', async (req,res) => {
    const newUser = {
        name: {
            title: req.body.name.title,
            first: req.body.name.first,
            last: req.body.name.last,
        },
        email: req.body.email,
        nat: req.body.nat,
    }
    await db.insert(newUser)
    res.status(201).json({message:"User created!"})
})


app.patch('/users/:id', async (req,res) => {
    const updateUser = {
        email: req.body.email,
        nat: req.body.nat,
    }
    if(req.body.name){
        updateUser.name = {
            title: req.body.name.title,
            first: req.body.name.first,
            last: req.body.name.last,
        }
    }
    const id = req.params.id
    const numUpdated = await db.update({_id:id}, updateUser)
    if(numUpdated == 1){
        res.json({message:"User updated!"})
    }else{
        res.status(404).json({message:"User not found"})
    }
    
})

app.delete('/users/:id', async (req,res) => {
    const id = req.params.id
    const numRemoved = await db.remove({_id: id})
    if(numRemoved == 1){
        res.json({message:"User deleted!"})
    }else{
        res.status(404).json({message:"User not found"})
    }
})

app.listen(5000, () => console.log("AAAW YEAH!"))