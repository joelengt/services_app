'user strinct'

const mongoose = require('mongoose');
const app = require('./app.js');
const config = require('./config.js');

const port = config.port;


app.listen(port, () => {
    console.log('Server start on last', port);
})
