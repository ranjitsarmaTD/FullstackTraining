// const http = require('http')
// const reqHandler = require('./firstNode')

// const server = http.createServer(reqHandler)

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log("Server Listening");
// })

const express = require('express');
// const http = require('http');

const app = express();
// const server = http.createServer(app);

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log("Server is Listening!!")
// })

// app.use('/',(req, res, next) => {
//     console.log("Request path : ", req.url);
//     next();
// })

// app.use('/',(req, res, next) => {
//     console.log("Request Method : ", req.method);
//     next();
// })

// app.use('/',(req, res, next) => {
//     // res.send('<h1>Here is the Response</h1>');
//     next();
// })

// app.get('/', (req, res, next) => {
//     res.send('<h1>Home Page</h1>')
// })

// app.get('/contact', (req, res, next) => {
//     res.send(`
//         <form action="/contact" method="POST">
//             <label for="name">Name</label>
//             <input type="text" placeholder="enter your name" id="name"/>
//             <button type="submit" >Submit</button>
//         </form>
//     `)
// })

// app.post('/contact', (req, res, next) => {
//     console.log(req);
// })

// app.post('/contact', (req, res, next) => {

// })

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is listening!! : http://localhost:${PORT}`);
// })

const HomeRouter = require('./routes/HomeRouter');
const HomestayRouter = require('./routes/HomestayRouter');
const path = require('path');
const rootDir = require('./utils/rootDir');

app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
})

app.use(express.urlencoded());
app.use(HomeRouter);
app.use("/homestay", HomestayRouter); // /homestay is a commonpath

app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));  // we can use file helper for building root directory for using path in absolute manner
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

const PORT = 3000;
app.listen( PORT, () => {
    console.log("Server is Listening!!");
})