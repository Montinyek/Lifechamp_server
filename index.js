const express = require('express')
const { ObjectId } = require('mongodb')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const UserModel = require('./user')

app.use(express.json())
app.use(cors())

const connection = process.env.DB_CONNECTION
const PORT = process.env.PORT || 3001

mongoose.connect(connection, {
    useNewUrlParser: true
})

app.get('/', (req, res) => {
    UserModel.find().then(result => res.send(result)).catch(err => console.log(err))
})

app.post(`/createUser`, async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(200).json(user)
    } catch(error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            // Duplicate username
            return res.status(422).json({ message: 'username exists' })
          }
        res.status(500).json({message: error.message})
    }
})

app.post(`/getUser`, async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserModel.findOne({ username, password })
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(422).json({message: "user not found"})
        }
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.put(`/updateUser/:id`, async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findByIdAndUpdate(id, req.body)
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})