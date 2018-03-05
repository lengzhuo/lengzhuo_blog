const userModel = require('../models/user');
const md5 = require('md5');

const User= {

    userlogin:(req,res,next)=>{
        res.render('login',{title:'登录页面'})
    },

    login:(req,res,next)=>{
        let username = req.body.username;
        let password = req.body.password;
        userModel.findOne({username:username}).then(doc=>{
            if(doc){
                let user = doc;
                if(user.password == md5(password)){
                    req.session.loginUser = user;
                    res.redirect('/');
                }else{
                    req.flash('error','密码错误');
                    res.redirect('/users');
                }
            }else{
                req.flash('error','用户不存在');
                res.redirect('/users');
            }
        })
    },
    logout:(req,res,next)=>{
        req.session.destroy(err=>{
            res.redirect('/users/login');
        })
    },
    update:(req,res,next)=>{
        let username = req.params.username;
        userModel.update({username:username},{
            nickname:req.body.nickname,
            avatar:req.body.avatar,
            signature:req.body.signature,
            position:req.body.position,
            info:req.body.info
        }).then(doc=>{
            res.json(doc);
        })
    },
    updatePassword:(req,res,next)=>{
        let username = req.params.username;
        userModel.update({username:username},{
            password:req.body.password
        }).then(doc=>{
            res.json(doc);
        })
    },
    save:(req,res,next)=>{
        let user = new userModel({
            username:req.body.username,
            password:req.body.password,
            nickname:req.body.nickname,
            avatar:req.body.avatar,
            signature:req.body.signature,
            position:req.body.position,
            info:req.body.info
        });
        user.save();
        res.json('创建用户成功')
    }
}

module.exports = User;