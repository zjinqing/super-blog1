/**
 * Created by Administrator on 2017/5/10.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const MessageSchema = new Schema({
    _id: {
        type: String,
        defalut: shortid.generate,
        unique: true
    },
//    留言的内容
    content: {
        type: String,
        required: true
    },
//    留言的时间
    createtime: {
        type: Date,
        defalut: Date.now
    },
    //留言的作者
    author:{
        type:String,
        ref:'User'//关联用户表
    },
    //回复
    replyId:{
        type:String,
        ref:'Reply'
    },
//留言的对应的文章
    articleId:{
        type:String,
        ref:'Article'
    },
//是否已读
    has_read:{
        type:Boolean,
        default:false
    }
})
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;