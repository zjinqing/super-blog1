/**
 * Created by Administrator on 2017/5/10.
 */
<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const ReplySchema = new Schema({
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
//    回复谁？
    author_id:{
        type:String,
        ref:'User'
    },
//    回复的哪篇文章？
    article_id:{
        type:String,
        ref:'Article'
    },
    //回复时间
    createtime:{
        type:Date,
        default:Date.now
    },
//回复内容
    reply_content:{
        type:String
    }
})
const Reply = mongoose.model('Reply',ReplySchema);
module.exports = Reply;
=======
>>>>>>> a3ef8aa6e0927e803162ce3a25790fd50dbaceab
