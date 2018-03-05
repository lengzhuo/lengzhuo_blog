const ArticleModel = require('../models/article');
const CategoryModel = require('../models/category');
const  Home = {
    index:(req,res,next)=>{
        //获取session并输出
        let user = req.session.loginUser;
        console.log(user);
        //搜索关键字  .where(key);方法 find(中加搜索关键字);
        let key = req.query.key;
        let regex = new RegExp(key);
        let where = {};
        if(key){
            where = {title:{$regex:regex}};
        }
        //分页
        let count = 0;
        let limit = 5;
        let page = req.query.page?req.query.page:1;
        let totalPage = 0;
        ArticleModel.find(where).count().then(doc=>{//获取文章总数量
            count = doc;
            totalPage = Math.ceil(count/limit);
            ArticleModel.find(where).skip((page-1)*limit).limit(5).sort({create_at:'desc'}).then(doc=>{
                res.render('index',{
                    title:"blog_wang",
                    list:doc,
                    count:count,
                    page:page,
                    totalPage:totalPage
                });
            });
        });
    },
    category:(req,res,next)=>{
        let categoryPath = req.params.category;
        CategoryModel.findOne({path:categoryPath}).then(doc=>{
            console.log(doc);
            //搜索关键字  .where(key);方法 find(中加搜索关键字);
            let key = req.query.key;
            let regex = new RegExp(key);
            let where = {
                category_id:doc._id
            };
            if(key){
                where.title = {$regex:regex};
            }
            //分页
            let count = 0;
            let limit = 2;
            let page = req.query.page?req.query.page:1;
            let totalPage = 0;
            ArticleModel.find(where).count().then(doc=>{//获取文章总数量
                count = doc;
                totalPage = Math.ceil(count/limit);
                ArticleModel.find(where).skip((page-1)*limit).limit(2).sort({create_at:'desc'}).then(doc=>{
                    res.render('index',{
                        title:"blog_wang",
                        list:doc,
                        count:count,
                        page:page,
                        totalPage:totalPage
                    });
                });
            });
        });
    }
}
module.exports = Home;