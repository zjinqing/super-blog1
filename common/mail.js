/**
 * Created by Administrator on 2017/5/17.
 */
const SETTING = require('../setting');
const nodemailer = require('nodemailer');
const mail={
    sendEmail:(type,regMsg,callback)=>{
        const name = regMsg.name;
        const email = regMsg.email;
        const transporter = nodemailer.createTransport({
            service:'163',
            auth:{
                user:SETTING.mail_opts.auth.user,
                pass:SETTING.mail_opts.auth.pass
            }
        })
        const mailOptions = {
            from:SETTING.mail_opts.auth.user,
            to:email,
            subject:`${SETTING.name}注册成功`,
            text:`${name}你好`,
            html:`<b>恭喜${name}注册成功，请登录</b> `
        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                callback(error);
            }
            callback(info);
        })
    }
}
module.exports = mail;

