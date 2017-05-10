/**
 * Created by Administrator on 2017/5/9.
 */
const  mongoose = require('mongoose');
const setting = require('../setting')
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
    findAll:(obj,req,res,logMsg)=>{
        obj.find({}).then(result=>{
            res.json(result)
        }).catch(err=>{
            res.end(err);
        })
    }
}
module.exports=DbSet;