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
    $('.layui-btn-primary').click();
}