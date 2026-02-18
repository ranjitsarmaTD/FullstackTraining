const fs = require("fs");

fs.writeFile("output.js", "const temp = 'Writing files';", (err) => {
  if (err) console.log("error occured");
  else console.log("File written succcessfully");
});

const reqHandler = ((req, res) => {
  console.log("Request : ", req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");

  if (req.url.toLowerCase() === "/") {
    res.write("<html>");
    res.write("<head><title>NodevPractice</title></head>");
    res.write("<body><h1>Home Dashboard</h1></body>");
    res.write("</html>");
    return res.end(); // after setting end() to res, we can't set anything to res since the res has been send to client so we need to return
  } else if (
    req.url.toLowerCase() === "/submit-employees" &&
    req.method === "POST"
  ) {
    const name = []
    req.on('data', (chunk) => {  // res.on() says whenever there is new data in req then server should know & the callback should get called 
        console.log('Buffer', chunk);
        name.push(chunk);
    })

    req.on('end', () => {
        const nameString = Buffer.concat(name).toString();
        console.log(nameString);

        // parse request
        const params = new URLSearchParams(nameString) // collects parameters & values from it
        console.log(params.entries()); // 
        // const bodyObj = {}
        // for (let [key, value] of params.entries()){
        //     bodyObj[key] = value
        // }
        const bodyObj = Object.fromEntries(params);
        console.log(bodyObj);
        fs.writeFileSync("employees.txt", JSON.stringify(bodyObj)); // if data is in number then to convert string to number for caalculate, we can use Number() which will parse from string to number
    })
    res.setHeader("Location", "/");
    res.statusCode = 302;
    return res.end();
  } else if (req.url.toLowerCase() === "/employees/new") {
    res.write("<html>");
    res.write("<head><title>NodevPractice</title></head>");
    res.write("<body>");
    res.write('<label for="name">Enter Employee Name : </label>');
    res.write('<form action="/submit-employees" method="POST">');
    res.write(
      '<input id="name" type="text" placeholder="Enter Employee Name" name="name" >'
    );
    res.write('<button type="submit">Submit</button>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  // process.exit(); // to exit the event loop & as a result the server stops listening
});

module.exports = reqHandler; // we can pass an object here, which can have multiple data