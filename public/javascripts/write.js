//图片上传预览
function viewImg(file) {
    var prevDiv = document.getElementById('view');
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
        }
        reader.readAsDataURL(file.files[0]);
    } else {
        prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
    }
}



var E = window.wangEditor;
var editor = new E('#edit');
// 或者 var editor = new E( document.getElementById('edit') )
//设置图片上传处理路由
//editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
editor.customConfig.uploadImgServer = '/upload';
//设置图片上传文件名
editor.customConfig.uploadFileName = 'img';
var $text1 = $('#content-area');
editor.customConfig.onchange = function (html) {
     // 监控变化，同步更新到 textarea
    $text1.val(html);
}
editor.create();
// 初始化 textarea 的值
$text1.val(editor.txt.html());





