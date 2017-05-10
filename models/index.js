'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UsuarioSchema = new Schema({
    name:     { type: String },
    picture:  { type: String },
    price:    { type: String, enum:['computers', 'phones', 'accesories'] },
    email:    { type: String , unique: true, lowercase: true},
    price:    { type: Number, default: 0 },
    password: { type: String , select: false }, // con select: false -> cuando hagamos un get no lo muestre
    signupDate: { type: Date, default: Date.now() },
    lastLogin:  { type: Date }
})



// funciones de mongoose, para ejecutar antes o despuesta de meter algo a la db

// antes para encriptar el password
UsuarioSchema.pre('save', (next) => {
    let user = this;
    if(!user.isModified('passwrod')) return next();

    bcrypt.geSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err);

            user.password = hash;
            next()
        })
    })
})

// methods de mongoose
UsuarioSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex');

    return `https://gravatar.com/avatar/${ md5 }?s=200&d=retro`
}

var model = mongoose.model('Product', UsuarioSchema);

module.exports = model;


