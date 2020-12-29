const DB_URL = process.env.DB_URL || 'mongodb://mongo:27017/gador';
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(err => console.log(err));

db.once('open', _ => {
    console.log(`${DB_URL} is connected`);
});