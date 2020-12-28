require('./src/connection');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', require('./src/routes/jwt'));
app.listen(PORT, () => { console.log(`Running on port ${PORT}`); });