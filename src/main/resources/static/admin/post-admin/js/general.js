function inputLimit(){
    var input = window.event.target;
    input.value = input.value.substring(0,100); if(window.event.keyCode ==13) return false;
}
//管理员修改自身信息
function openUpdate() {
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['500px', '640px'],
        content:
            '<form class="layui-form" method="post" enctype="multipart/form-data" style="margin-top: 30px;">\n' +
            '    <div class="layui-form-item layui-upload">\n' +
            '        <label class="layui-form-label">照片</label>\n' +
            '        <div class="layui-upload-list">\n' +
            '            <img class="layui-upload-img" id="adminDemo1" style="float:left;max-width: 10%; margin-right: 10px" src="">\n' +
            '            <div style="float:left;">\n' +
            '                <button type="button" class="layui-btn" id="uploadAdmin">上传图片</button>\n' +
            '                <p id="demoText" style="width: 100px; margin-top: 20px"></p>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="layui-form-item">\n' +
            '        <label class="layui-form-label">用户名</label>\n' +
            '        <div class="layui-input-block">\n' +
            '            <input class="layui-input" type="text" id="adminUsername" autocomplete="off" placeholder="请输入用户名" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" value="">\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="layui-form-item adminSex">\n' +
            '        <label class="layui-form-label">性别</label>\n' +
            '        <div class="layui-input-block">\n' +
            '            <input type="radio" name="sex" value="男" title="男">' +
            '            <div class="layui-unselect layui-form-radio">' +
            '                <i class="layui-anim layui-icon"></i>' +
            '                <p>男</p>' +
            '            </div>\n' +
            '            <input type="radio" name="sex" value="女" title="女" checked="">' +
            '            <div class="layui-unselect layui-form-radio layui-form-radioed">' +
            '                <i class="layui-anim layui-icon"></i>' +
            '                <p>女</p>' +
            '            </div>\n' +
            '        </div>' +
            '    </div>\n' +
            '    <div class="layui-form-item">\n' +
            '        <label class="layui-form-label">昵称</label>\n' +
            '        <div class="layui-input-block">\n' +
            '            <input type="text" id="adminNickname"  autocomplete="off" placeholder="请输入昵称" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" value="">\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="layui-form-item">\n' +
            '        <label class="layui-form-label">手机号</label>\n' +
            '        <div class="layui-input-block">\n' +
            '            <input class="layui-input layui-disabled" disabled id="adminTelephone" type="text" name="telephone" placeholder="请输入手机号" autocomplete="off" style="width: 250px;" value="" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="layui-form-item">\n' +
            '        <label class="layui-form-label">邮&nbsp;&nbsp;&nbsp;箱</label>\n' +
            '        <div class="layui-input-block">\n' +
            '            <input type="text" id="email" autocomplete="off" lay-verify="email" placeholder="请输入邮箱" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</form>\n' +
            '<script>\n' +
            'layui.use(\'form\', function(){\n' +
            '  var formAdmin = layui.form;\n' +
            '  formAdmin.render();\n' +
            '});' +
            'layui.use(\'upload\', function() {\n' +
            '    var $ = layui.jquery, upload = layui.upload;\n' +
            '    //普通图片上传使用layui上传图片\n' +
            '    uploadInstAdmin = upload.render({\n' +
            '        elem: \'#uploadAdmin\'\n' +
            '        , url: \'uploadUserImg.action\'\n' +
            '        , accept : \'images\'\n' +
            '        , multiple : false\n' +
            '        , auto : false\n' +
            '        , field : \'upload\'\n' +
            '        , choose: function (obj) {\n' +
            '            //预读本地文件示例，不支持ie8\n' +
            '            obj.preview(function (index, file, result) {\n' +
            '                $(\'.layui-upload\').css("height", "10%");\n' +
            '                $(\'.layui-upload\').css("marginButtom", "10px");\n' +
            '                $(\'#adminDemo1\').attr(\'src\', result); //图片链接（base64）\n' +
            '                $(\'#adminDemo1\').css("maxWidth", "10%");\n' +
            '                $(\'#adminDemo1\').css("marginRight", "10px");\n' +
            '                adminPhoto = result;\n' +
            '            });\n' +
            '        }\n' +
            '        , done: function (res) {\n' +
            '            //如果上传失败\n' +
            '            if (res.code > 0) {\n' +
            '                return layer.msg(\'图片上传失败\');\n' +
            '            }\n' +
            '            //上传成功\n' +
            '            else\n' +
            '            {\n' +
            '                adminPhoto = res.src;\n' +
            '                $(\'#adminDemo1\').attr(\'src\', adminPhoto);\n' +
            '                updateAdmin(adminPhoto, $(\'#adminUsername\').val(), $(\'.adminSex\').find(\'.layui-form-radioed\').find(\'div\').text(), $(\'#adminNickname\').val(), $(\'#adminTelephone\').val());\n' +
            '}\n' +
            '        }\n' +
            '        , error: function () {\n' +
            '            //演示失败状态，并实现重传\n' +
            '            var demoText = $(\'#demoText\');\n' +
            '            demoText.html(\'<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>\');\n' +
            '            demoText.find(\'.demo-reload\').on(\'click\', function () {\n' +
            '                uploadInstAdmin.upload();\n' +
            '            });\n' +
            '        }\n' +
            '    });\n' +
            '});' +
            '</script>',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "修改个人信息",
        btn1 : function () {
            editAdmin(user, adminPhoto);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}
//对输入修改信息的判断
function editAdmin() {
    var user = arguments[0];
    var photo = arguments[1];
    var username = $('#adminUsername').val();
    var nickname = $('#adminNickname').val();
    var telephone = $('#adminTelephone').val();
    var gender = $('.adminSex').find('.layui-form-radioed').find('div').text();

    if(username == "" || username == null){
        layer.msg("用户名不能为空！");
    }
    else if(gender == "" || gender == null){
        layer.msg("请选择性别！");
    }
    else if(nickname == "" || nickname == null){
        layer.msg("昵称不能为空！");
    }
    // console.log({"photo" : photo, "username" : username, "gender" : gender, "nickname" : nickname, "telephone" : user.telephone});
    if(photo == "" || photo == null){
        updateAdmin(user.photo, username, gender, nickname, telephone);
    }
    if(user.photo != photo){
        uploadInstAdmin.upload();
    }
    else{
        updateAdmin(user.photo, username, gender, nickname, telephone);
    }
}
//执行修改操作
function updateAdmin(photo, username, gender, nickname, telephone){
    // console.log({"photo" : photo, "username" : username, "gender" : gender, "nickname" : nickname, "telephone" : telephone});
    $.ajax({
        url : 'user_update.action',
        type : 'post',
        data : {"photo" : photo, "username" : username, "gender" : gender, "nickname" : nickname, "telephone" : telephone},
        scriptType : 'utf-8',
        success : function (result) {
            if(result.message == null){
                $.ajax({
                    url : 'user_getLoginUser.action',
                    type : 'post',
                    scriptCharset : 'utf-8',
                    success : function (result) {
                        var loginUser = result.loginUser;
                        if(loginUser.nickname != null){
                            var li = document.getElementById('showDlLi');
                            li.childNodes[1].childNodes[2].data = loginUser.nickname;
                        }
                        if(loginUser.photo != null){
                            $('.layui-nav-img')[0].src = loginUser.photo;
                        }
                        if(loginUser.status != null && loginUser.status == 1){
                            $('.layui-nav-item')[7].remove();
                        }
                    },
                    error : function () {
                        console.log("请求失败！");
                    }
                });
                layer.open({
                    type: 1,
                    offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "更新成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "信息安全实验室",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            }
            else{
                layer.msg(result.message);
            }
        } ,
        error : function () {
            layer.msg('请求失败，请重试！');
        }
    });
}

//管理员修改密码
function updatePwd() {
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['500px', '300px'],
        content:
            '<form class="layui-form" method="post" enctype="multipart/form-data" style="margin-top: 30px;">\n' +
            '    <div class="layui-form-item">\n' +
            '       <label class="layui-form-label">原密码</label>\n' +
            '       <div class="layui-input-block">\n' +
            '          <input type="password" name="oldPwd" id="oldPwd" placeholder="请输入新密码" autocomplete="off" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '       </div>\n' +
            '    </div>\n' +'    <div class="layui-form-item">\n' +
            '       <label class="layui-form-label">新密码</label>\n' +
            '       <div class="layui-input-block">\n' +
            '          <input type="password" name="newPwd" id="newPwd" placeholder="请输入新密码" autocomplete="off" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '       </div>\n' +
            '    </div>\n' +
            '    <div class="layui-form-item">\n' +
            '      <label class="layui-form-label">确认密码</label>\n' +
            '      <div class="layui-input-block">\n' +
            '        <input type="password" id="newConfPwd" placeholder="请确认密码" autocomplete="off" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" onblur="passwordLimit()">\n' +
            '      </div>\n' +
            '    </div>\n' +
            '</form>',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "修改密码",
        btn1 : function () {
            updatePassword();
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}
//执行更新密码的操作
function updatePassword() {
    var oldPwd = $("#oldPwd").val();
    var newPwd = $("#newPwd").val();
    var newConfPwd = $("#newConfPwd").val();
    console.log(oldPwd,newConfPwd);
    if(oldPwd == null || oldPwd === ""){
        layer.msg("原密码不能为空！");
    }
    else if(newPwd == null || newPwd === ""){
        layer.msg("新密码不能为空！");
    }
    else if(newConfPwd == null || newConfPwd === ""){
        layer.msg("请确认密码！");
    }
    else if(newPwd != newConfPwd){
        layer.msg("两次输入的新密码不一样，请重新输入！");
    }
    else{
        $.ajax({
            url : '../../admin/updatePassword',
            type : 'post',
            data : {"oldPwd" : oldPwd, "newPwd" : newPwd},
            scriptCharset : 'utf-8',
            success : function (result) {
                if(result.message == null){
                    layer.msg("修改成功！")
                    window.setTimeout(function(){window.location.reload();}, 1500);
                }else{
                    layer.msg(result.message);
                }
            },
            error : function () {
                console.log("请求更新密码失败！");
            }
        });
    }
}
//对确认密码的判断
function passwordLimit(){
    var input = window.event.target;
    input.value = input.value.substring(0,100); if(window.event.keyCode ==13) return false;
    var newConfPwd = input.value;
    var newPwd = $('#newPwd').val();
    if(newConfPwd.toString() != newPwd.toString()){
        layer.tips('两次密码不一样', '#newConfPwd');
    }
}

//管理员退出登录
function signOut() {
    $.ajax({
        url: '../../../admin/signout',
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