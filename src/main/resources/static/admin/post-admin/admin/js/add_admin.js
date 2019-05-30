window.onload = function () {
    // 此ajax不适用于main.html页面获取管理员信息
    $.ajax({
        url: '../../../admin/getAdminMap',
        type: 'post',
        scriptCharset: 'utf-8',
        success: function (result) {
            // console.log(result);
            var loginAdmin = result.loginAdmin;
            //设置登陆用户的昵称
            if (loginAdmin.adminNickname != null) {
                ($('.layui-nav-img')[0].parentNode).childNodes[2].data = loginAdmin.adminNickname;
            }
            //设置登陆用户的头像
            if (loginAdmin.adminPhoto != null) {
                $('.layui-nav-img').attr("src", loginAdmin.adminPhoto);
            }
            //判断是否是超级管理员
            if (loginAdmin.status != 2) {

            }
        },
        error: function () {
            layer.msg("请求失败！");
        }
    });
}