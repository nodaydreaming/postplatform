var adminList;
var loginAdmin;
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
    // filladmins();
};

function getAdmins() {
    $.ajax({
        url : '../../../admin/listadmin',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
           if(result.adminlist != null){
               filladmins(result.adminlist);
           }
           else{
               layer.msg(result.message);
           }
        },
        error : function () {
            layer.msg("请求管理员列表失败！");
        }
    });
}

function filladmins() {
    adminList = arguments[0];
    var tbody = document.getElementsByTagName('tbody')[0];
    $('tbody').html("");

    for(var i = 0; i < adminList.length; ++i){
        var admin0 = adminList[i];
        var type = "";
        if(admin0.adminState == 1){
            type = "比赛管理员";
        }
        else if(admin0.adminState == 2){
            type = "系统管理员";
        }
        else if(admin0.adminState == 3){
            type = "超级管理员";
        }
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.style.textAlign = "center";
        td1.innerText = i + 1;
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.style.textAlign = "center";
        td2.innerText = admin0.adminUsername;
        td2.style.wordWrap = "break-word";
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.style.textAlign = "center";
        td3.innerText = admin0.adminGender;
        td3.style.wordWrap = "break-word";
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.style.textAlign = "center";
        td4.innerText = admin0.adminNickname;
        td4.style.wordWrap = "break-word";
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.style.textAlign = "center";
        td5.innerText = admin0.adminEmail != null ? admin0.adminEmail != "" ? admin0.adminEmail : "" : "";
        td5.style.wordWrap = "break-word";
        tr.appendChild(td5);

        var td6 = document.createElement('td');
        td6.style.textAlign = "center";
        td6.innerText = admin0.adminTel;
        td6.style.wordWrap = "break-word";
        tr.appendChild(td6);

        var td8 = document.createElement('td');
        td8.style.textAlign = "center";
        td8.innerText = type;
        td8.style.wordWrap = "break-word";
        tr.appendChild(td8);

        var td7 = document.createElement('td');
        if(loginAdmin.adminState == 3){
            var a1 = document.createElement('a');
            a1.id = "editProblem" + (i+1);
            a1.className = "layui-btn layui-btn-normal layui-btn-xs";
            var i1 = document.createElement('i');
            i1.className = "layui-icon layui-icon-edit";
            a1.appendChild(i1);
            a1.innerHTML = a1.innerHTML + "重置密码";
            a1.onclick = reset_pwd;
            td7.appendChild(a1);

            var a2 = document.createElement('a');
            a2.id = "delAdmin" + (i+1);
            a2.className = "layui-btn layui-btn-danger layui-btn-xs";
            var i2 = document.createElement('i');
            i2.className = "layui-icon layui-icon-delete";
            a2.appendChild(i2);
            a2.innerHTML = a2.innerHTML + "删除";
            a2.onclick = delAdmin;
            td7.style.textAlign = "center";
            td7.appendChild(a2);
        }
        else if(loginAdmin.adminState == 2 && admin0.adminState == 1){
            var a1 = document.createElement('a');
            a1.id = "editProblem" + (i+1);
            a1.className = "layui-btn layui-btn-normal layui-btn-xs";
            var i1 = document.createElement('i');
            i1.className = "layui-icon layui-icon-edit";
            a1.appendChild(i1);
            a1.innerHTML = a1.innerHTML + "重置密码";
            a1.onclick = reset_pwd;
            td7.appendChild(a1);

            var a2 = document.createElement('a');
            a2.id = "delAdmin" + (i+1);
            a2.className = "layui-btn layui-btn-danger layui-btn-xs";
            var i2 = document.createElement('i');
            i2.className = "layui-icon layui-icon-delete";
            a2.appendChild(i2);
            a2.innerHTML = a2.innerHTML + "删除";
            a2.onclick = delAdmin;
            td7.style.textAlign = "center";
            td7.appendChild(a2);
        }
        tr.appendChild(td7);
        tbody.appendChild(tr);
    }
}

function reset_pwd(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var admin0 = adminList[num-1];
    layer.open({
        type: 1,
        offset: 'auto', 
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定重置密码为 123456 吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除管理员",
        btn1 : function () {
            resetPwd(admin0);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function resetPwd(){
    var id = arguments[0].adminId;
}

function delAdmin() {
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var admin0 = adminList[num-1];
    layer.open({
        type: 1,
        offset: 'auto', 
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定删除管理员 <b>'" + admin0.username +"'</b> 吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除管理员",
        btn1 : function () {
            deladmin(admin0);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function deladmin() {
    var username = arguments[0].adminUsernaem;
    $.ajax({
        url : '../../../admin/deleteadmin',
        type : 'post',
        data : {"username" : username},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                layer.open({
                    type: 1,
                    offset: 'auto', 
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "删除成功！" + '</div>',
                    btn: '确定',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes : function () {
                        layer.closeAll();
                    }
                });
                getAdmins();
            }
            else {
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("删除失败！");
        }
    });
}