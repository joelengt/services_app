'use strict'

const mongoose = require('mongoose')
const User = require('../models/index.js')
const service = require('../services/index.js')

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName
    })

    user.save((err) => {
        if (err) res.status(500).json({ message: 'Error al mandar el mensaje' })

        res.status(201).json({ token: service.createToken(user) })
    })
}

function singIn(req, res) {
    User.find({ email: req.body.email }, (err, user) => {
        if(err) return res.status(500).send({ message: err })
        if(!user) return res.status(404).send({ message: 'user not found'})

        req.user = user;
        res.status(200).send({
            message: 'Te has logeado correctamente',
            token: service.createToken(user)
        }) 
    })
}

module.exports = {
    signUp,
    singIn
}
