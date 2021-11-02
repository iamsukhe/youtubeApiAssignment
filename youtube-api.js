const fs = require("fs");
const http = require("http");
const https = require("https");
const app = require("./app");
const port = 3000;
const uri = "mongodb+srv://singh:newsingh@cluster0.ol5pd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoose = require('mongoose');

const server = http.createServer(app);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  server.listen(port, function () {
    console.log(`server is listening on port ${port} for requests`);
  });
}).catch((err)=>{
  console.log("connection fail", err)
})


