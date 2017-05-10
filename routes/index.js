'use strict'

const express = require('express');
const route = express.Router();
const ProductController = require('../controllers/products.js');
const UserController = require('../controllers/user.js');

const auth = require('../middlewares/auth.js');

route.get('/product/:id', ProductController.getProduct);
route.get('/products', ProductController.getProducts);
route.post('/product', ProductController.createProducts);
route.update('/product/:id', ProductController.updateProducts);
route.delete('/product/:id', ProductController.deleteProducts);


route.post('/signup', UserController.signUp);

route.post('/signin', UserController.singIn);


route.get('/auth', auth, (req, res) => {
    res.status(200).send({
        message: 'tienes acceso'
    })
})

module.exports = route;