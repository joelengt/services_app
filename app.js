'user strinct'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const app = express();

// const routes = require('./routes/index.js');

app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());

app.engine('hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

// app.use('/api', routes);

app.get('/login', (req, res) => {
    res.render('login', {
        message: 'joel',
        list: [
            { name: 'person1', age: 20 },
            { name: 'person2', age: 2 },
            { name: 'person3', age: 40 },
            { name: 'person4', age: 19 },
        ],
        val: false
    })
})


app.post('/api/sigin', (req, res) => {

    res.status(200).send({
        message: 'hello',
        data: req.body,
        age: 20,
        token: 'K1J2SndMSD89fd87FdsfSfdsfsF97D8Ffd7S8fdF8FSDF5aeFnds3daj'
    })
})

module.exports = app;
