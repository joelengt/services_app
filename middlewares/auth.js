'use strict'

const services = require('../services/index.js');

function isAuth(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).json({
            message: 'Not Authorization'
        })
    }

    const token = req.headers.authorization.split(" ")[1]

    services.decoreToken(token)
        .then((response) => {
            res.user = response
            next()
        })
        .catch((response) => {
            res.status(response.status)
        })

}


module.exports = isAuth