/**
 * Created by Administrator on 2017/5/10.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const ArticleSchema = new Schema({
    _id: {
        type: String,
        defalut: shortid.generate,
        unique: true
    },
//    文章的标题
    title: {
        type: String,
        required: true
    },
//文章的内容
    content: {
        type: String,
        required: true
    },
    //创建时间
    createtime: {
        type: Date,
        defalut: Date.now
    },
//    修改时间
    updatetime: {
        type: Date,
        defalut: Date.now
    },
//    标签
    tags: {
        type: [String],//字符串数组
    },
//    点击量
    clickNumber: {
        type: Number,
        defalut: 0,
        min: 0,
        max: 100000
    },
//    回复量
    commentNumber: {
        type: Number,
        defalut: 0,
        min: 0,
        max: 10000
    },
    //留言的作者，它应该是一个User表中的数据
    author: {
        type: String,
        ref: 'User'//文章的作者 关联查询，关联到User表
    },


//文章分类
    category:{
        type:String,
        ref:'Category'//文章的分类
    }
})
const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;