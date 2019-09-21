const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => { res.sendFile(path.resolve(__dirname, '../index.html'))})

app.listen(3000, () => console.log('server listening on port 3000'));

module.exports = app 