const Videos = require("../models/ytvideo")

exports.getHomePage = async (req, res) => {

    Videos.find().then((docVal)=>{
        res.render("index" , {
            doc : docVal
        })
    }).catch(()=>{
        res.render("index" , {
            doc : []
        })
    })
    
};

exports.getYoutubeVideos = async (req,res)=>{
    
    let page = parseInt(req.query.page, 10) || 0;
    let limit = parseInt(req.query.limit, 10) || 10;
     
    Videos.find().sort({created_at: 'ascending'}).limit(limit)
    .skip(page * limit).exec( (err, docs) =>{
        if(err){
           return { 
                status: false,
                videos: docs,
             }
        }
        res.json({ 
            status: true,
            videos: docs,
         })
    })



}