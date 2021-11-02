const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ytVideosSchema = new Schema({
    videoId : {
        type : String,
        require : true
    },
    title : {
        type : String,
        require : true,
        unique : [true, 'Dublicate title Error']
    },
    created_at  : {
        type : Date,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    
})


const Videos = mongoose.model("Videos" , ytVideosSchema);

module.exports = Videos;