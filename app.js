const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(require('./router'));

app.listen(3000, () => {
    connection
        .sync({
            logging: console.log,
        })
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(() => {
            console.error('Unable to connect');
        });
    console.log('Server started at port 3000');
});
