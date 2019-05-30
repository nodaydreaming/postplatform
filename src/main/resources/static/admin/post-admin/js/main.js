window.onload = function () {
    $.ajax({
        url : '../../admin/getAdminMap',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            // console.log(result);
            var loginAdmin = result.loginAdmin;
            //设置登陆用户的昵称
            if(loginAdmin.adminNickname != null){
                ($('.layui-nav-img')[0].parentNode).childNodes[2].data = loginAdmin.adminNickname;
            }
            //设置登陆用户的头像
            if(loginAdmin.adminPhoto != null){
                $('.layui-nav-img').attr("src", loginAdmin.adminPhoto);
            }
            //判断是否是超级管理员
            if(loginAdmin.status != 2){

            }
        },
        error : function () {
            layer.msg("请求失败！");
        }
    });
}

//管理员退出登录
function signOut() {
    $.ajax({
        url: '../../admin/quitAdmin',
        type: 'post',
        scriptType: 'utf-8',
        success: function (result) {
            if (result.message == null) {
                window.location.reload();
            }
            else {
                layer.msg(result.message);
            }
        },
        error: function () {
            layer.msg('请求失败，请重试！');
        }
    });
}