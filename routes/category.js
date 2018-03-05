const express = require('express');
const router = express.Router();
const category = require('../controllers/category');

/*查询*/
router.get('/',category.index);
/*添加*/
router.post('/add',category.save);
/*更新*/
router.post('/update/:id',category.update);
/*删除*/
router.get('/delete/:id',category.delete);


module.exports = router;