'user strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js')

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),  // momento de creacion del token
        exp: moment().add(14, 'days').unix()// momento en el que va a expirar
    }

    return jwt.encode(payload, config.SECRET_TOKEN);

}

function decoreToken(token) {

    const decoded = new Promise((resolve, reject) => {
        try {

            const payload = jwt.decode(token, config.SECRET_TOKEN)

            // verification if token expirate
            if (payload.exp < moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token expiro'
                })
            }

            resolve(payload.sub)

        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return decoded;

}

module.exports = {
    createToken,
    decoreToken
};