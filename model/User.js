/**
 * Created by Administrator on 2017/5/10.
 */
<<<<<<< HEAD
//保存用户的信息
const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    //用户名的ID
    _id:{
        type:String,
        default:shortid.generate,
        unique:true//id经常会被查询，所有 把ID作为索引
    },
    //用户名
    name:{
        type:String,
        require:true
    },
//    密码
    passwrod:{
        type:Number,
        require:true
    },
//    邮箱
    email:{
        type:String
    },
//    个人简介 格言
    motto:{
        type:Number,
        default:'<--- 箭头指向处，又懒又肥'
    },
//    个人头像
    avatar:{
        type:String,
        default:'public/images/avatar.jpg'
    },
//    注册时间
    createtime:{
        type:Date,
        default:Date.now//默认是当前时间
    }
})
const User = mongoose.model('User',UserSchema);
module.exports=User;
=======
>>>>>>> a3ef8aa6e0927e803162ce3a25790fd50dbaceab
