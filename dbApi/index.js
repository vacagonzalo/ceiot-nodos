const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/readings', require('./routes/readings'));

app.get('/', (req, res) => {
    res.send('working');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});