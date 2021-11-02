require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = process.env.DB;
const Videos = require("./models/ytvideo")
const cron = require('node-cron');
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

// */10 * * * * for 10 min
// */10 * * * * for 1 min



cron.schedule('*/10 * * * *', async () => {

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBq5YShzBY682pk4PfBqTrH8X56GTBbJII&type=video&part=snippet&q=football&maxResults=20`);
    

    dataObj = response.data.items.map((el)=>{
        return {
        videoId : el.id.videoId ,
        title : el.snippet.title ,
        created_at  : new Date(el.snippet.publishedAt),
        description : el.snippet.description
        }
    })


    Videos.insertMany(dataObj ,  { ordered: false }).then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        if(error.code == 11000){
            console.log("dublication error")
        } // Failure
        else{
            console.log(error)
        }
    });

    
  });


app.use("/", require("./routes/home.routes"));

app.use((req, res, next) => res.render("common/404"));

module.exports = app;