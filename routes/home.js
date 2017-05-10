/**
 * Created by Administrator on 2017/5/9.
 */
//首页的所有请求都写在这里

exports.index=(req,res,next)=> {
    //ES5新增
    var whiteCat = new Cat({name: 'whiteCat'});
    whiteCat.save((err, result)=> {
        if (err) {
            res.send(err);
        }
            res.send(result);//新增返回的是操作的数据
    })
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

}




















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