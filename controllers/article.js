const ArticleModel = require('../models/article');
const CategoryModel = require('../models/category');

const Article = {
    index:(req,res,next)=>{
        //搜索关键字  .where(key);方法 find(中加搜索关键字);
        let key = req.query.key;
        let regex = new RegExp(key);
        let where = {};
        if(key){
            where = {title:{$regex:regex}};
        }
        //分页
        let count = 0;
        let limit = 2;
        let page = req.query.page;
        let totalPage = 0;
        ArticleModel.find(where).count().then(doc=>{//获取文章总数量
            count = doc;
            totalPage = Math.ceil(count/limit);
            ArticleModel.find(where).skip((page-1)*limit).limit(2).sort({create_at:'desc'}).then(doc=>{
                res.json(doc);
            });
        });


    },
    add:(req,res,next)=>{
        CategoryModel.find({is_sys:1}).then(doc=>{
           res.render('add',{category:doc,title:'发布文章'});
        })
    },
    save:(req,res,next)=>{
        let articleModel = new ArticleModel({
            title:req.body.title,
            content:req.body.content,
            author:req.body.author,
            is_jing:req.body.is_jing,
            status:req.body.status,
            img:req.file.filename,
            //category_id:req.body.category_id
            //user_id:req.body.user_id,
        });
        console.log(articleModel);
        articleModel.save();
        res.redirect('/');

    },
    upload:(req,res,next)=>{
        let id = req.params.id;
        ArticleModel.update({_id:id},{
            title:req.body.title,
            content:req.body.content,
            author:req.body.author,
            is_jing:req.body.is_jing,
            status:req.body.status,
            img:''
        }).then(doc=>{
            res.json(doc);
        })
    },
    del:(req,res,next)=>{
        let id = req.params.id;
        ArticleModel.remove({_id:id}).then(doc=>{
            res.json(doc);
        })
    },
}
module.exports = Article;