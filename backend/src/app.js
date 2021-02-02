const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./connection/database');
require('./connection/cache');
require('./connection/broker');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth',require('./routes/auth'));
app.use('/cmnd', require('./routes/cmnd'));
app.use('/devices', require('./routes/devices'));
app.use('/logs', require('./routes/log'));
app.use('/users', require('./routes/users'));
app.use('/readings', require('./routes/readings'));

app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`); 
});