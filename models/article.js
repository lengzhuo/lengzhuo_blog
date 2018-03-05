const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const moment = require('moment');

const ArticleSchema = new Schema({
    title:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    content:{
        type:String,
        default:''
    },
    author:{
        type:String,
        default:''
    },
    is_jing:{
        type:Number,
        default:0
    },
    view:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:0
    },
    category_id:{
        type:ObjectId
    },
    user_id:{
        type:ObjectId
    },
    create_at:{
        type:Date,
        default:Date.now,
        //提供get方法，可以将数据进行加工
        get:(val)=>moment(val).format('YYYY-MM-DD')
    },
    update_at:{
        type:Date,
        default:Date.now,
        get:(val)=>moment(val).format('YYYY-MM-DD')
    },
    delete_at:{
        type:Date,
        default:null
    }
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;