/**
 * Created by Administrator on 2017/5/10.
 */
<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const CategorySchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    // 分类的父级ID
    parentId: {
        type: Number,
        default:0
    },
//    分类名称
    name:String
})
const Category = mongoose.model('Category',CategorySchema);
module.exports = Category;
=======
>>>>>>> a3ef8aa6e0927e803162ce3a25790fd50dbaceab
