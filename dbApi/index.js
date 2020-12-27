const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./connection');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/readings', require('./routes/readings'));
app.use('/devices', require('./routes/devices'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});