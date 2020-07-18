const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()

const mongoose = require('mongoose')
const db = 'mongodb://userkarthik:karthik2@ds155582.mlab.com:55582/eventsdb'

mongoose.connect(db, err => {
    if (err) {
        console.log("error" + err);
    } else {

        console.log("sucess");
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('unauthorised request')
    }
    let payload = jwt.verify(token,'secretkey')
    if(!payload){
        return res.status(401).send('unauthorised request')
    }
    req.userId = payload.subject
    next()
}
router.get('/', (req, res) => {
    res.send('from API route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = {subject : registeredUser._id}
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = {subject : user._id}
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).send({token})
                }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
        "_id": "1",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
    },
    {
        "_id": "2",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
    },
    {
        "_id": "3",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
    },
    {
        "_id": "4",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
    },
    {
        "_id": "5",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
    }
    ]
    res.json(events)
 })
 router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
        "_id": "1",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
    },
    {
        "_id": "2",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
    },
    {
        "_id": "3",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
    },
    {
        "_id": "4",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
    },
    {
        "_id": "5",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
    }
    ]
    res.json(events)
 })
module.exports = router