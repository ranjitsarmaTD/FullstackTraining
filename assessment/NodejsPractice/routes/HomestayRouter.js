const express = require('express');
const HomestayRouter = express.Router();
const path = require('path');

HomestayRouter.get('/options', (req, res, next) => {
    console.log("homestay");
    
    // res.send(`
    //     <h1>Fill your preference</h1>
    //     <form action="/homestay/options" method="POST">
    //         <input name="bhk" type="text" placeholder="Enter your Preference"/>
    //         <button type="submit">Submit</button>
    //     </form>
    // `)

    res.sendFile(path.join(__dirname, '../', 'views', 'options.html'));
})

HomestayRouter.post('/options', (req, res, next) => {
    console.log(req.body);
    
})

module.exports = HomestayRouter;