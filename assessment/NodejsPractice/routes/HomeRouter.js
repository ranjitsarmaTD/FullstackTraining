const express = require('express');
const HomeRouter = express.Router();
const path = require('path');

HomeRouter.get('/', (req, res, next) => {
    // res.send(`
    //     <h1>AirBnb</h1>
    //     <a href='/options'>Options</a>
    // `)
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
})

module.exports = HomeRouter;