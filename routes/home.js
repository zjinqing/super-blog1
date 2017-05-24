/**
 * Created by Administrator on 2017/5/9.
 */
//引入静态
const mapping = require('../static');
//引入表单验证
const validator = require('validator');
//引入User表
const User = require('../model/User')
//引入数据库连接文件
const Dbset = require('../model/db');
//引入setting配置文件
const SETTING = require('../setting');
//引入发送文件的通用方法
const mail = require('../common/mail')

//首页的所有请求都写在这里
exports.index = (req, res, next) => {
    res.render('index', {
        layout: '/views/indexTemplate',
        title: '我的首页'
    })
}
//登陆
exports.login = (req,res,next)=>{
    res.render('login',{
        title:"登录页面--社区问答系统",
        layout:'indexTemplate',
        resource:mapping.login

    })
}
//登陆行为
exports.postLogin = (req,res,next)=>{
    //1.验证
    let error;
    let username = req.body.username;
    let password = req.body.password;
    // 三元运算法
    let getEmail;
    let getName;
    let getUser;
    username.includes('@') ? getEmail = username : getName = username;
    console.log(getEmail);
    console.log(getName);
    if(getName){
        if(!validator.matches(getName,/^[a-zA-Z][a-zA-Z0-9_]{4,11}$/,'g')){
            error='用户名格式不正确'
        }
    }
    if(getEmail){
        if(!validator.isEmail(getEmail)){
            error='邮箱格式不正确';
        }
    }
    //验证密码
    if(!validator.matches(password,/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/,'g')||!validator.isLength(password,6,12)){
        error='密码格式不正确'
    }
    if(error){
        res.end(error);
    }else {
        if(getEmail){
            getUser = User.getUserByEmail
        }else {
            getUser = User.getUserByName
        }
        getUser(username,(err,user)=>{
            console.log(user)
            if(err){
                res.end(err);
            }
            //    你根据邮箱或者是用户名查到的用户信息
            if(!user){
                res.end('用户名/邮箱不存在');
            }
            else {
                //    判断密码是否一样
                let newPSD = Dbset.encrypt(password,SETTING.PSDkey);
                if(user.password !== newPSD){
                    res.end('密码错误，请重新输入')
                }
                //生成cookie
                // auth.gen_session(user,res);
                res.end('success');
            }

        })
    }
}


//注册
exports.reg = (req,res,next)=>{
    res.render('reg',{
        title:'注册页面--社区问答系统',
        layout:'indexTemplate',
        resource:mapping.reg
    })
}
//注册行为
exports.postReg = (req,res,next)=>{
    console.log(req.body)
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let error;
    //validator前端和后端都可以使用的验证方式 ，'g' 开启全局匹配模式
    if(!validator.matches(name,/^[a-zA-Z][a-zA-Z0-9_]{4,11}$/,'g')){
        error = '用户名不合法，5-12位，数字字母下划线'
    }
    if(!validator.matches(password,/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/,'g')||!validator.isLength(password,6,12)){
        error = '密码长度5-12位，非特殊字符'
    }
    if(!validator.matches(email,/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,'g')){
        error = '邮箱的格式不正确'
    }
    if(error){
        res.end(error);
    }else {
        //   2 验证成功之后 判断一下用户名和邮箱是否存在
        let query = User.find().or([{'email':email},{'name':name}]);
        // exec() 方法用于检索字符串中的正则表达式的匹配。
        query.exec().then((user)=>{
            if(user.length>0){
                error='用户名/邮箱已存在';
                res.end(error);
            }else {
                //    发一封邮件 以及密码加密
                let regMsg = {name:name,email:email};
                mail.sendEmail('regMsg',regMsg,(err,info)=>{
                    if(err){
                        res.end(err);
                    }
                });
                let newPSD = Dbset.encrypt(password,SETTING.PSDkey);
                req.body.password = newPSD;
                Dbset.addOne(User,req,res,'success');

            }
        }).catch((err)=>{
            res.end(err);
        })
    }
}

exports.topic = (req, res, next) => {
    res.render('topic', {
        layout: '/views/indexTemplate',
        title: '我的话题'
    })
}
exports.reply = (req, res, next) => {
    res.render('reply', {
        layout: '/views/indexTemplate',
        title: '我的回复'
    })
}
exports.people = (req, res, next) => {
    res.render('people', {
        layout: '/views/indexTemplate',
        title: '用户详情页面'
    })
}
exports.post = (req, res, next) => {
    res.render('post', {
        layout: '/views/indexTemplate',
        title: '用户发表页面'
    })
}
exports.set = (req, res, next) => {
    res.render('set', {
        layout: '/views/indexTemplate',
        title: '用户设置页面'
    })

}

// exports.index=(req,res,next)=> {
//     //ES5新增
//     var whiteCat = new Cat({name: 'whiteCat'});
//     whiteCat.save((err, result)=> {
//         if (err) {
//             res.send(err);
//         }
//             res.send(result);//新增返回的是操作的数据
//     })
//ES6新增
// let whiteCat = new Cat({name: 'whiteCat'});
// whiteCat.save().then((result)=> {
//     res.send(result);//新增返回的是操作的数据
// }).catch((err)=>{
//     res.send(err);
// })

//   ES5删除
//     let where = {
//         "name":"whiteCat"
//     }
//      Cat.remove(where,(err, result)=> {
//         if (err) {
//             res.send(err);
//         }
//         res.send(result);//删除返回的结果：ok是否成功 n影响了行数
//     })

//    ES5修改
//     let update = {name:'redCat'};
// //     Cat.update({name:'whiteCat'},{name:'blackCat'},(err,result)=>{
// // //    修改的数据多的话就用下面这种 推荐
//     Cat.update({name:'whiteCat'},{$set:update},(err,result)=>{
//         if (err) {
//             res.send(err);
//         }
//         res.send(result);
//     })

//ES6修改
//  let update = {name:'redCat'};
// Cat.update({name:'whiteCat'},{$set:update}).then((result)=>{
//     res.send(result);
// }).catch((err) =>{
//     res.send(err);
// })


//    ES5查询
//     Cat.find({name:'redCat'}, ['name'],(err,result)=>{
//         if (err) {
//             res.send(err);
//         }
//         res.send(result);
//     })

// ES6查询
//  Cat.findOne({name:'redCat'}).then(result=>{
//      res.send(result);
//  }).catch(err=>{
//      res.send(err);
//  })


// exports.index=(req,res,next)=>{
//     let whitecat = new kitty({name:'whiteCat'});
//     //原始的写法
//     // whitecat.save(function (err,result) {
//     //     if(err){
//     //         console.log(err);
//     //     }
//     //     console.log(result)
//     // })
//     whitecat.save().then((result)=>{
//     //    保存成功了
//         console.log(result);
//     }).catch((err)=>{
//     //    保存失败了
//         console.log(err);
//     })
//     res.render('index',{
//         title:'我的首页'
//     })
// }