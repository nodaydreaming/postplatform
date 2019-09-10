window.onload = function () {
    // 此ajax不适用于main.html页面获取管理员信息
    $.ajax({
        url : '../../../admin/getLoginAdmin',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.loginAdmin != null){
                var loginAdmin = result.loginAdmin;
                //设置登陆用户的昵称
                if(loginAdmin.adminName != null){
                    ($('.layui-nav-img')[0].parentNode).childNodes[2].data = loginAdmin.adminName;
                }
                //设置登陆用户的头像
                if(loginAdmin.adminPhoto != null && loginAdmin.adminPhoto != ""){
                    $('.layui-nav-img').attr("src", loginAdmin.adminPhoto);
                }
                //判断是否是超级管理员
                if(loginAdmin.adminLevel != 2){
                    $('.layui-nav-item')[5].remove();
                }
            }

        },
        error : function () {
            layer.msg("请求失败！");
        }
    });
};

function delPost(){
    var post = arguments[0];
    var postId = post.postId;
    $.ajax({
        url : '../../../post/deletePost',
        type : 'post',
        scriptCharset : 'utf-8',
        data : {"postId":postId},
        success : function (result) {
            if(result.message == null){
                layer.msg("删除成功");
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求删除失败");
        }
    });
}

Date.prototype.Format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}