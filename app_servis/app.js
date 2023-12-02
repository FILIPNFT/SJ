const express = require('express');
const path = require('path');
const Joi = require('joi');
const app = express();
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'), { encoding: 'utf8' });
});

app.listen(8000, () => {
    console.log('Server APP running on http://localhost:8000');
});
