var express = require('express');
var router = express.Router();
const user = require('../controllers/user');

// 登录 /users
router.get('/',user.userlogin);
/* 提交登录信息 /users/login */
router.post('/login',user.login);
/* 登出 */
router.get('/logout',user.logout);
/* 修改个人信息 */
router.post('/update',user.update);
/* 修改密码 */
router.post('/updatePassword',user.updatePassword);
/* 创建用户 */
router.post('/save',user.save);


module.exports = router;
