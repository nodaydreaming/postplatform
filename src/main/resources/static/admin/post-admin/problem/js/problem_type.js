var problem_type_list=[{"id":1,"title":"web","introduction":"web类型题目的简介"},
                       {"id":2,"title":"Pwn","introduction":"Pwn类型题目的简介"},
                       {"id":3,"title":"逆向","introduction":"逆向类型题目的简介"}];
var problem_type_title, problem_type_introduction;
window.onload = function () {
    // 此ajax不适用于main.html页面获取管理员信息
    $.ajax({
        url : '../../../admin/getAdminMap',
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
    get_problem_type_list();
};

function get_problem_type_list(){
    $.ajax({
        url : '../../../Questiontype/listQuestiontype',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            // console.log(result);
            if(result.message == null){
                problem_type_list = result.listQuestiontype;
                fillProblemTypeList(result.listQuestiontype);
            }
        },
        error : function () {
            layer.msg("请求失败！");
        }

    });
}

function fillProblemTypeList(){
    problem_type_list = arguments[0];
    var tbody = document.getElementsByTagName('tbody')[0];
    $('tbody').html("");

    for (var i = 0; i < problem_type_list.length; ++i){
        var problem_type = problem_type_list[i];
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.style.textAlign = "center";
        td1.innerText = i + 1;
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.innerText = problem_type.questionType;
        td2.style.wordWrap = "break-word";
        tr.appendChild(td2);

        var td4 = document.createElement('td');

        td4.innerText = problem_type.questionTypeIntroduction == null ? "" : problem_type.questionTypeIntroduction;
        td4.title = problem_type.questionTypeIntroduction == null ? "" : problem_type.questionTypeIntroduction;
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
        a1.onclick = editProblemType;

        var a2 = document.createElement('a');
        a2.id = "delPaper" + (i+1);
        a2.className = "layui-btn layui-btn-danger layui-btn-xs";
        var i2 = document.createElement('i');
        i2.className = "layui-icon layui-icon-delete";
        a2.appendChild(i2);
        a2.innerHTML = a2.innerHTML + "删除";
        a2.onclick = delProblemType;

        td3.appendChild(a1);
        td3.appendChild(a2);

        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
}

function open_add_problem_type(){
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
            '            <input type="text" id="problem_type_title" autocomplete="off" placeholder="请输入类型名称" required class="layui-input" style="width: 80%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
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
        title: "添加题目类型",
        btn1 : function () {
            add_problem_type();
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function add_problem_type(){
    problem_type_introduction = $('.tcp_content').val();
    problem_type_title = $("#problem_type_title").val();
    if(problem_type_title == "" || problem_type_title == null){
        layer.tips("类型名称不能为空！", "#problem_type_title");
    }
    else if(problem_type_introduction == null || problem_type_introduction == ""){
        layer.tips("简介不能为空！", ".tcp_content");
    }
    else{
        add_ProblemType(problem_type_title, problem_type_introduction);
    }
}

function add_ProblemType(problem_type_title, problem_type_introduction){
    $.ajax({
        url : '../../../Questiontype/insertQuestiontype',
        type : 'post',
        data :{"questionType" : problem_type_title, "questionTypeIntroduction" : problem_type_introduction},
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
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                get_problem_type_list();
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

function editProblemType(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var problem_type0 = problem_type_list[num-1];
    var intro = problem_type0.questionTypeIntroduction == null ? "" : problem_type0.questionTypeIntroduction;
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
        '            <input type="text" id="problem_type_title" autocomplete="off" placeholder="请输入类型名称" required class="layui-input layui-disabled" disabled value="'+ problem_type0.questionType +'"style="width: 80%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
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
        title: "更新题目类型信息",
        btn1 : function () {
            edit_problem_type(problem_type0);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function edit_problem_type(){
    var problem_type = arguments[0];
    problem_type_introduction = $('.tcp_content').val();

    if(problem_type_introduction == null || problem_type_introduction == ""){
        layer.tips("简介不能为空！", ".tcp_content");
    }
    else{
        updateProblemType(problem_type.questionTypeId, problem_type.questionType, problem_type_introduction);
    }
}

function updateProblemType(questionTypeId, title, introduction) {
    $.ajax({
        url : '../../../Questiontype/updateQuestiontype',
        type : 'post',
        data : {"questionTypeId" : questionTypeId, "questionType" : title, "questionTypeIntroduction" : introduction},
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
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                get_problem_type_list();
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


function delProblemType(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var problem_type = problem_type_list[num-1];
    layer.open({
        type: 1,
        offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定删除  "+ problem_type.questionType +"  类型吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除题目类型",
        btn1 : function () {
            delproblemType(problem_type);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delproblemType() {
    // console.log(arguments[0]);
    var id = arguments[0].questionTypeId;
    // console.log(id);
    $.ajax({
        url : '../../../Questiontype/deleteQuestiontype',
        type : 'post',
        data : {"questiontypeId" : id},
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
                    title: "HZNUCTF",
                    yes : function () {
                        layer.closeAll();
                    }
                });
                get_problem_type_list();
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