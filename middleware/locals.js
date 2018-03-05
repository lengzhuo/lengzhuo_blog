const CategoryModel = require('../models/category');
const Locals = (req,res,next)=>{
    CategoryModel.find({is_nav:1}).then(doc=>{
        //console.log(doc);
        //将数据放在locals中，整个请求都会获取这个数据，这样数据就可以共用了
        res.locals.categoryList = doc;
        res.locals.error = req.flash('error');
        res.locals.loginUser = req.session.loginUser;
        next();
    });
}
module.exports = Locals;