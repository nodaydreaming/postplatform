var post_type_list=[{"id":1,"type_name":"校内岗","type_introduction":"校内岗"},
                       {"id":2,"type_name":"校外岗","type_introduction":"校外岗"},
                       {"id":3,"type_name":"家教","type_introduction":"家教"}];
var post_type_title, post_type_introduction;

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
    get_post_type_list();
};

function get_post_type_list(){
    $.ajax({
        url : '../../../type/findAllTypes',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            // console.log(result);
            if(result.message == null){
                if(result.typeList != null){
                    post_type_list = result.typeList;
                    fillpostTypeList();
                }
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求失败！");
        }

    });
}

function fillpostTypeList(){
    var tbody = document.getElementsByTagName('tbody')[0];
    $('tbody').html("");

    for (var i = 0; i < post_type_list.length; ++i){
        var post_type = post_type_list[i];
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.style.textAlign = "center";
        td1.innerText = i + 1;
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.innerText = post_type.typeName;
        td2.style.wordWrap = "break-word";
        tr.appendChild(td2);

        var td4 = document.createElement('td');

        td4.innerText = post_type.typeDescription == null ? "" : post_type.typeDescription;
        td4.title = post_type.typeDescription == null ? "" : post_type.typeDescription;
        td4.style.maxWidth = "50%";
        td4.style.whiteSpace = "nowrap";
        td4.style.textOverflow = "ellipsis";
        td4.style.overflow = "hidden";
        tr.appendChild(td4);

        var td3 = document.createElement('td');
        td3.style.textAlign = "center";
        td3.style.padding = "0px";

        var a1 = document.createElement('a');
        a1.id = "editPaper" + (i+1);
        a1.className = "layui-btn layui-btn-normal layui-btn-xs";
        var i1 = document.createElement('i');
        i1.className = "layui-icon layui-icon-edit";
        a1.appendChild(i1);
        a1.innerHTML = a1.innerHTML + "编辑";
        a1.onclick = editpostType;

        var a2 = document.createElement('a');
        a2.id = "delPaper" + (i+1);
        a2.className = "layui-btn layui-btn-danger layui-btn-xs";
        var i2 = document.createElement('i');
        i2.className = "layui-icon layui-icon-delete";
        a2.appendChild(i2);
        a2.innerHTML = a2.innerHTML + "删除";
        a2.onclick = delPostType;

        td3.appendChild(a1);
        td3.appendChild(a2);

        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
}

function open_add_post_type(){
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['600px', '400px'],
        content:
            '<form class="layui-form" action="" style="margin:50px 0 0 2%; font-size:15px">\n' +
            '    <div class="layui-form-item">\n' +
            '        <label class="layui-form-label">类型名称</label>\n' +
            '        <div class="layui-input-block">\n' +
            '            <input type="text" id="post_type_title" autocomplete="off" placeholder="请输入类型名称" required class="layui-input" style="width: 80%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '        </div>\n' +   
            '    </div>\n' +
            '    <div class="layui-form-item">\n' +
            '        <label class="layui-form-label">类型简介</label>\n' +
            '        <div class="layui-input-block">\n' +
            '           <textarea class="tcp_content layui-textarea" placeholder="请输入类型简介"\n' +
            '                     style="width: 80%; height: 130px; resize:none" maxlength="300"\n' +
            '                     onchange="textarea_fun()" onkeydown="textarea_fun()" onkeyup="textarea_fun()"></textarea>\n' +
            '           <span class="t_h" style="float: right; margin-right: 20%"><i>0</i>/300</span>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</form>\n' +
            '<script>\n' +
            'layui.use(\'form\', function(){\n' +
            '  var form = layui.form;\n' +
            '  form.render();\n' +
            '});' +
            '</script>',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "添加岗位类型",
        btn1 : function () {
            add_post_type();
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function add_post_type(){
    post_type_introduction = $('.tcp_content').val();
    post_type_title = $("#post_type_title").val();

    if(post_type_title == "" || post_type_title == null){
        layer.tips("类型名称不能为空！", "#post_type_title");
    }
    else if(post_type_introduction == null || post_type_introduction == ""){
        layer.tips("简介不能为空！", ".tcp_content");
    }
    else{
        add_postType(post_type_title, post_type_introduction);
    }
}

function add_postType(post_type_title, post_type_introduction){
    $.ajax({
        url : '../../../type/saveType',
        type : 'post',
        data :{"typeName" : post_type_title, "typeDescription" : post_type_introduction},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null) {
                layer.open({
                    type: 1,
                    offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "添加成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUPOST",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                get_post_type_list();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg('请求添加失败！');
        }
    });
}

function editpostType(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var post_type0 = post_type_list[num-1];
    var intro = post_type0.typeDescription == null ? "" : post_type0.typeDescription;

    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['600px', '400px'],
        content:
        '<form class="layui-form" action="" style="margin:50px 0 0 5%; font-size:15px">\n' +
        '    <div class="layui-form-item">\n' +
        '        <label class="layui-form-label">类型名称</label>\n' +
        '        <div class="layui-input-block">\n' +
        '            <input type="text" id="post_type_title" autocomplete="off" placeholder="请输入类型名称" required class="layui-input" value="'+ post_type0.typeName +'"style="width: 80%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
        '        </div>\n' +   
        '    </div>\n' +
        '    <div class="layui-form-item">\n' +
        '        <label class="layui-form-label">类型简介</label>\n' +
        '        <div class="layui-input-block">\n' +
        '           <textarea class="tcp_content layui-textarea" placeholder="请输入类型简介"\n' +
        '                     style="width: 80%; height: 130px; resize:none" maxlength="300"\n' +
        '                     onchange="textarea_fun()" onkeydown="textarea_fun()" onkeyup="textarea_fun()">'+ intro +'</textarea>\n' +
        '           <span class="t_h" style="float: right; margin-right: 20%"><i>'+ intro.length +'</i>/300</span>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</form>\n' +
        '<script>\n' +
        'layui.use(\'form\', function(){\n' +
        '  var form = layui.form;\n' +
        '  form.render();\n' +
        '});' +
        '</script>',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "更新岗位类型信息",
        btn1 : function () {
            edit_post_type(post_type0);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function edit_post_type(){
    var post_type = arguments[0];
    post_type_introduction = $('.tcp_content').val();
    post_type_title = $("#post_type_title").val();

    if(post_type_title == "" || post_type_title == null){
        layer.tips("类型名称不能为空！", "#post_type_title");
    }
    else if(post_type_introduction == null || post_type_introduction == ""){
        layer.tips("简介不能为空！", ".tcp_content");
    }
    else{
        updatepostType(post_type.typeId, post_type_title, post_type_introduction);
    }
}

function updatepostType(typeId, title, introduction) {
    $.ajax({
        url : '../../../type/updateType',
        type : 'post',
        data : {"typeId" : typeId, "typeName" : title, "typeDescription" : introduction},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null) {
                layer.open({
                    type: 1,
                    offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "更新成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUPOST",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                get_post_type_list();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg('请求更新失败！');
        }
    });
}

function delPostType(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var post_type = post_type_list[num-1];
    layer.open({
        type: 1,
        offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定删除  "+ post_type.typeName +"  类型吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除岗位类型",
        btn1 : function () {
            delpostType(post_type);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delpostType() {
    // console.log(arguments[0]);
    var id = arguments[0].typeId;
    // console.log(id);
    $.ajax({
        url : '../../../type/deleteType',
        type : 'post',
        data : {"typeId" : id},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                layer.open({
                    type: 1,
                    offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "删除成功！" + '</div>',
                    btn: '确定',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUPOST",
                    yes : function () {
                        layer.closeAll();
                    }
                });
                get_post_type_list();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求删除失败！");
        }
    });
}

function textarea_fun(){
    $(".tcp_content").val($(".tcp_content").val().substring(0,500));
    $(".t_h i").html($(".tcp_content").val().length);
    if(window.event.keyCode  == 13){
        return false;
    }
}