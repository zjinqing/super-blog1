/**
 * Created by Administrator on 2017/5/9.
 */
const  mongoose = require('mongoose');
const setting = require('../setting')
//nodeJS加密模块
const crypto = require('crypto')
const url =require('url')
// mongoose.connect 连接数据库
mongoose.Promise = global.Promise;//这句话说明我们使用的promise对象是ES6中原生的promise对象
mongoose.connect(`mongodb://${setting.host}/${setting.db}`);
//-----通过上面几行代码 可以连接数据库

const DbSet = {
    //新增操作
    addOne:(obj,req,res,logMsg)=>{
        obj = new obj(req.body);
        obj.save().then(result=>{
            res.end(logMsg)
        }).catch(err=>{
            res.end(err);
        })
    },
//    删除
    delOne:(obj,req,res,logMsg)=>{
        let params = url.parse(req.url,true);
        let targetId = params.query.id;
        obj.remove({_id:targetId}).then(result=>{
            res.end(logMsg);
        }).catch(err=>{
            res.end(err);
        })
    },
//    修改
    updateOne:(obj,req,res,logMsg)=>{
        let params = url.parse(req.url,true);
        let targetId = params.query.id;
        req.body.updateDate = new Date();
        let update = {$set:req.body}
        obj.update({_id:targetId}).then(result=>{
            res.end(logMsg);
        }).catch(err=>{
            res.end(err);
        })
    },
//    查询
    findOne:(obj,req,res,logMsg)=>{
        let params = url.parse(req.url,true);
        let targetId = params.query.id;
        obj.findOne({_id:targetId}).then(result=>{
            res.json(logMsg);
        }).catch(err=>{
            res.end(err);
        })
    },
    //查询所有的
    findAll:(obj,req,res,logMsg)=>{
        obj.find({}).then(result=>{
            res.json(result)
        }).catch(err=>{
            res.end(err);
        })
    },
    //    ------------
    encrypt : function(data,key){ // 密码加密
        var cipher = crypto.createCipher("bf",key);
        var newPsd = "";
        newPsd += cipher.update(data,"utf8","hex");
        newPsd += cipher.final("hex");
        return newPsd;
    },
    decrypt : function(data,key){ //密码解密
        var decipher = crypto.createDecipher("bf",key);
        var oldPsd = "";
        oldPsd += decipher.update(data,"hex","utf8");
        oldPsd += decipher.final("utf8");
        return oldPsd;
    }
}

module.exports=DbSet;