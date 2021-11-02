const router = require("express").Router();
const path = require("path");
const Home = require("../controllers/home.controller");


router.get("/", Home.getHomePage);

router.get("/get-videos", Home.getYoutubeVideos);


module.exports = router;