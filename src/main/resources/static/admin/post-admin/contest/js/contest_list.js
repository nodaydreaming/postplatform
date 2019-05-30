var contest_list;
var contest_title, contest_number, contest_organizer, contest_starttime, contest_endtime, contest_type, contest_admins, contest_problems;
var contest_ip, contest_port, contest_account, contest_password;
var admin_list, selected_admins;
var problem_type_list;
var problem_list,selected_problems;
var competitionId,competitionIsteam;
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
    getContests();
};
//填充赛事列表的表格
function getContests() {
    $.ajax({
        url : '../../../competition/listcompetition',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
           if(result.message == null){
               contest_list = result.competitionlist;
               fillContests();
           }
           else{
               layer.msg(result.message);
           }
        },
        error : function () {
            layer.msg("请求赛事列表失败！");
        }
    });
}
function fillContests(){
    var tbody = document.getElementsByTagName('tbody')[0];
    $('tbody').html("");
    for(var i = 0; i < contest_list.length; ++i){
        var contest0 = contest_list[i];
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.style.textAlign = "center";
        td1.innerText = i+1;
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.style.textAlign = "left";
        td2.innerText = contest0.competitionTitle;
        td2.style.wordWrap = "break-word";
        tr.appendChild(td2);

        // var td3 = document.createElement('td');
        // td3.style.textAlign = "center";
        // td3.title = "";
        // td3.innerText = "";
        // td3.style.width = "25%";
        // td3.style.whiteSpace = "nowrap";
        // td3.style.textOverflow = "ellipsis";
        // td3.style.overflow = "hidden";
        // tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.innerText = new Date(contest0.competitionStart).Format("yyyy-MM-dd hh:mm:ss") +
            "  至\n" + new Date(contest0.competitionEnd).Format("yyyy-MM-dd hh:mm:ss");
        td4.style.wordWrap = "break-word";
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.style.textAlign = "center";
        td5.innerText = contest0.competitionIsteam == 1? "团队赛":"个人赛";
        td5.style.wordWrap = "break-word";
        tr.appendChild(td5);

        var td8 = document.createElement('td');
        td8.style.textAlign = "center";
        var a11 = document.createElement('a');
        a11.className = "layui-btn layui-btn-primary layui-btn-xs";
        var i11 = document.createElement('i');
        i11.className = "layui-icon layui-icon-friends";
        a11.appendChild(i11);
        a11.innerHTML = a11.innerHTML + "管理员";
        a11.onclick = editAdmins;
        td8.appendChild(a11);
        var a12 = document.createElement('a');
        a12.className = "layui-btn layui-btn layui-btn-xs";
        var i12 = document.createElement('i');
        i12.className = "layui-icon layui-icon-form";
        a12.appendChild(i12);
        a12.innerHTML = a12.innerHTML + "赛题";
        a12.onclick = editProblems;
        td8.appendChild(a12);
        tr.appendChild(td8);

        var td6 = document.createElement('td');
        var a6 = document.createElement('a');
        a6.className = "layui-btn layui-btn-normal layui-btn-xs";
        var i6 = document.createElement('i');
        i6.className = "layui-icon layui-icon-release";
        a6.appendChild(i6);
        a6.onclick = sendData;
        td6.style.textAlign = "center";
        td6.style.wordWrap = "break-word";
        td6.appendChild(a6);
        tr.appendChild(td6);

        var td7 = document.createElement('td');
        var a = document.createElement('a');
        a.className = "layui-btn layui-btn-primary layui-btn-xs";
        var ii = document.createElement('i');
        ii.className = "layui-icon layui-icon-group";
        a.appendChild(ii);
        a.innerHTML = a.innerHTML + "报名表";
        a.onclick = get_registration;
        td7.appendChild(a);

        var a0 = document.createElement('a');
        a0.className = "layui-btn layui-btn layui-btn-xs";
        var i0 = document.createElement('i');
        //判断比赛的状态
        if(contest0.competitionCanregister == 0 || contest0.competitionCanregister == 2){
            i0.className = "layui-icon layui-icon-date";
            a0.appendChild(i0);
            a0.innerHTML = a0.innerHTML + "开启报名";
            a0.onclick = open_registration;
        }
        else{
            i0.className = "layui-icon layui-icon-close";
            a0.appendChild(i0);
            a0.style.backgroundColor = "#FF3030	";
            a0.innerHTML = a0.innerHTML + "截止报名";
            a0.onclick = close_registration;
        }
        td7.appendChild(a0);

        var a1 = document.createElement('a');
        a1.className = "layui-btn layui-btn-normal layui-btn-xs";
        var i1 = document.createElement('i');
        i1.className = "layui-icon layui-icon-edit";
        a1.appendChild(i1);
        a1.innerHTML = a1.innerHTML + "编辑";
        a1.onclick = edit_contest;
        td7.appendChild(a1);

        var a2 = document.createElement('a');
        a2.className = "layui-btn layui-btn-danger layui-btn-xs";
        var i2 = document.createElement('i');
        i2.className = "layui-icon layui-icon-delete";
        a2.appendChild(i2);
        a2.innerHTML = a2.innerHTML + "删除";
        a2.onclick = del_contest;
        td7.style.textAlign = "center";
        td7.appendChild(a2);
        tr.appendChild(td7);

        tbody.appendChild(tr);
    }
}
//更新某场比赛的管理员
function editAdmins() {
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var competition = contest_list[num-1];
    competitionId = competition.competitionId;
    $.ajax({
        url : '../../../CompetitionAdmin/listCompetitionAdminId',
        type : 'post',
        data : {"competitionId":competitionId},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.listCompetitionAdminId != null){
                selected_admins = result.listCompetitionAdminId;
                var adminStr = "";
                if(selected_admins != null || selected_admins.length != 0) {
                    adminStr = selected_admins[0];
                    for(var m=1;m<selected_admins.length;++m){
                        adminStr += "，" + selected_admins[m];
                    }
                }
                layer.open({
                    type: 1,
                    offset: 'auto',
                    skin: 'layui-layer-lan',
                    id: 'layerDemo1', //防止重复弹出
                    area: ['800px', '600px'],
                    content:'<form class="layui-form" action="" id="updateAdmins" style="margin:30px 0 0 2%; font-size:15px">\n' +
                        '<div class="layui-form-item" style="padding-left: 20px">'+
                        '    <p>这场比赛已选择的管理员ID为：'+adminStr+'</p>'+
                        '    <p>如需更改，请重新选择。</p>'+
                        '</div>'+
                        '<div class="layui-form-item" id="admin_select">\n' +
                        '    <label class="layui-form-label">比赛管理员（可多选）</label>\n' +
                        '    <div class="layui-input-block" style="max-width: 80%; padding-top: 1%">\n' +
                        '        <select id="selected_admins" name="admins" lay-filter="admin">\n' +
                        '            <option value="">请选择比赛管理员</option>\n' +
                        '        </select>\n' +
                        '    </div>\n' +
                        '</div>' +
                        '</form>' +
                        '<script>\n' +
                        '    layui.use(\'form\', function(){\n' +
                        '    var form = layui.form;\n' +
                        '        fillAdmins(form)' +
                        '    });\n' +
                        '    layui.use(\'element\', function(){\n' +
                        '        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块\n' +
                        '        //监听导航点击\n' +
                        '        element.on(\'nav(demo)\', function(elem){\n' +
                        '            //console.log(elem)\n' +
                        '            layer.msg(elem.text());\n' +
                        '        });\n' +
                        '    });\n' +
                        '</script>',
                    btn: ['确定', '取消'],
                    btnAlign: 'c',
                    shade: 0.5,
                    title: "更新比赛管理员信息",
                    btn1 : function () {
                        check_admins(competition);
                        return false;
                    },
                    btn2 : function () {
                        layer.closeAll();
                    }
                });
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求赛事管理员信息失败！");
        }
    });

}
function fillAdmins(form) {
    getAdmins(form);
}
function getAdmins(form) {
    $.ajax({
        url : '../../../admin/listadmin',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.adminlist != null){
                admin_list = result.adminlist;
                // console.log(admin_list);
                fillAdminSelect(form);
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
function fillAdminSelect(form){
    var adminSelect = $("#selected_admins");
    for(var i=0;i<admin_list.length;++i){
        var option = document.createElement("option");
        option.value = admin_list[i].adminId;
        option.innerText = "(" + admin_list[i].adminId + ")" + admin_list[i].adminUsername;
        adminSelect.append(option);
    }
    form.render();
    form.verify();
    formSelects.selects({
        name: 'select0',
        el: 'select[name=admins]',
        model: 'select',
        filter: 'admin',
        left: '【',
        right: '】',
        separator: '',
        reset: true
    });
}
function check_admins(competition) {
    var contest_admins_arr = formSelects.array('select0');
    if(contest_admins_arr.length > 0) {
        //获得这场比赛管理员的id串，以 , 为间隔
        contest_admins = contest_admins_arr[0].val;
        for (var j = 1; j < contest_admins_arr.length; ++j) {
            contest_admins += ',' + contest_admins_arr[j].val;
        }
        updateAdmins(competition.competitionId, contest_admins);
    }
}
function updateAdmins(id, admins) {
    // console.log({"competitionId":id, "adminAdminList":admins});
    $.ajax({
        url : '../../../CompetitionAdmin/update',
        type : 'post',
        data : {"competitionId":id, "adminAdminList":admins},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "更新赛事管理员成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            }
        },
        error : function () {
            layer.msg('赛事管理员更新失败');
        }
    });
}
//更新某场比赛的题目信息
function editProblems() {
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var competition = contest_list[num-1];
    competitionId = competition.competitionId;
    $.ajax({
        url : '../../../CompetitionQuestion/listCompetitionQuestionId',
        type : 'post',
        data : {"competitionId": competitionId},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.listCompetitionQuestionId!=null) {
                selected_problems = result.listCompetitionQuestionId;
                var problemStr = "";
                if(selected_problems != null || selected_problems.length != 0) {
                    problemStr = selected_problems[0];
                    for(var m=1;m<selected_problems.length;++m){
                        problemStr += "，" + selected_problems[m];
                    }
                }
                layer.open({
                    type: 1,
                    offset: 'auto',
                    skin: 'layui-layer-lan',
                    id: 'layerDemo1', //防止重复弹出
                    area: ['830px', '600px'],
                    content:'<form class="layui-form" action="" id="updateProblems" style="margin:30px 0 0 2%; font-size:15px">\n' +
                        '<div class="layui-form-item" style="padding-left: 70px">'+
                        '    <p>这场比赛已选择的题目ID为：'+problemStr+'</p>'+
                        '    <p>如需更改，请重新选择。</p>'+
                        '</div>'+
                        '</form>' +
                        '<script>\n' +
                        '    layui.use(\'form\', function(){\n' +
                        '    var form = layui.form;\n' +
                        '        fillProblems(form);' +
                        '    });\n' +
                        '    layui.use(\'element\', function(){\n' +
                        '        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块\n' +
                        '        //监听导航点击\n' +
                        '        element.on(\'nav(demo)\', function(elem){\n' +
                        '            //console.log(elem)\n' +
                        '            layer.msg(elem.text());\n' +
                        '        });\n' +
                        '    });\n' +
                        '</script>',
                    btn: ['确定', '取消'],
                    btnAlign: 'c',
                    shade: 0.5,
                    title: "更新比赛赛题信息",
                    btn1 : function () {
                        check_problems(competition);
                        return false;
                    },
                    btn2 : function () {
                        layer.closeAll();
                    }
                });
            }
            else if(result.message != null){
                console.log(result.message);
            }
        },
        error : function () {
            console.log('请求已选择题目失败！');
        }
    });

}
function fillProblems(form) {
    getProblem(form);
}
function getProblemType(form){
    $.ajax({
        url : '../../../Questiontype/listQuestiontype',
        scriptCharset : 'utf-8',
        type:'post',
        success : function(result){
            if(result.message == null){
                if(result.listQuestiontype != null){
                    // console.log(result.listQuestiontype);
                    problem_type_list = result.listQuestiontype;
                    fill_problem_block(form);
                }
                else{
                    layer.msg('请求题目类型失败');
                }
            }else{
                layer.msg(result.message);
            }
        },
        error : function(){
            layer.msg('请求题目类型失败');
        }
    });
}
function getProblem(form) {
    $.ajax({
        url : '../../../Question/listQuestion',
        scriptCharset : 'utf-8',
        type:'post',
        success : function(result){
            if(result.message == null){
                if(result.listQuestion != null){
                    // console.log(result.listQuestion);
                    problem_list = result.listQuestion;
                    getProblemType(form);
                }
                else{
                    layer.msg('请求题目失败');
                }
            }else{
                layer.msg(result.message);
            }
        },
        error : function(){
            layer.msg('请求题目失败');
        }
    });
}
function fill_problem_block(form){
    for(var i = 0; i < problem_type_list.length; ++i){
        var type0 = problem_type_list[i];
        var div1 = document.createElement("div");
        div1.className = "layui-form-item";
        //给这一块添加标题
        if(i == 0){
            var label = document.createElement("label");
            label.className = "layui-form-label";
            label.innerText = "赛题";
            div1.append(label);
        }

        var div2 = document.createElement("div");
        div2.className = "layui-input-block";
        div2.style.width = "80%";

        var select = document.createElement("select");
        select.name = type0.questionType;
        select.id = "problems" + type0.questionTypeId;
        $(select).attr("lay-filter", type0.questionType);

        var option0 = document.createElement("option");
        option0.value = "";
        option0.innerText = "请选择" + type0.questionType + "类型的题目";
        select.appendChild(option0);

        div2.append(select);
        div1.append(div2);
        $("#updateProblems").append(div1);
    }

    for(var j = 0; j<problem_list.length; ++j){
        var problem0 = problem_list[j];
        // console.log(problem0);
        var option = document.createElement("option");
        option.value = problem0.questionId;
        option.innerText = "(" + problem0.questionId + ") " + problem0.questionTitle;
        $("#problems"+problem0.questionTypeId).append(option);
    }
    form.render();
    form.verify();
    open_selects();
}
function open_selects(){
    // console.log(problem_type_list);
    for(var i = 0; i<problem_type_list.length; ++i){
        var type0 = problem_type_list[i];
        formSelects.selects({
            name: "select" + (i+1),
            el: 'select[name='+type0.questionType+']',
            model: 'select',
            filter: type0.questionType,
            left: '',
            right: '',
            separator: ',',
            reset: true
        });
    }
}
function check_problems(competition) {
    //获得这场比赛题目的id串，以 , 为间隔
    contest_problems = "";
    for (var k = 0; k < problem_type_list.length; ++k) {
        var problem_arr = formSelects.array('select' + (k + 1));
        for (var i = 0; problem_arr != null && i < problem_arr.length; ++i) {
            contest_problems += problem_arr[i].val + ",";
        }
    }
    if(contest_problems != ""){
        updateProblems(competition.competitionId, contest_problems);
    }
}
function updateProblems(id,problems) {
    // console.log({"competitionId":id, "questionList":problems});
    $.ajax({
        url : '../../../CompetitionAdmin/update',
        type : 'post',
        data : {"competitionId":id, "questionList":problems},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "更新赛题信息成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                    // title: '在线调试'
                    // ,content: '可以填写任意的layer代码'
                });
            }
        },
        error : function () {
            layer.msg('赛题信息更新失败');
        }
    });
}
//获得这场比赛的报名列表
function get_registration(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var competition = contest_list[num-1];
    var id = competition.competitionId;
    var number = competition.competitionNumber;
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo_users', //防止重复弹出
        area: ['1200px', '650px'],
        content: '<table class="layui-hide" id="test" lay-filter="test"></table>\n' +
            '<script type="text/html" id="barDemo">\n          ' +
                '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>\n        ' +
            '</script>\n         \n        ' +
            '<script>\n        ' +
                'layui.use(\'table\', function(){\n          ' +
                    'var table = layui.table;\n          \n          ' +
                    'table.render({\n            ' +
                        'elem: \'#test\'\n            ' +
                        ',url:\'../../../send/getRegistration?competitionId='+id+'\'\n            ' +
                        ',toolbar: \'#toolbarDemo\'\n            ' +
                        ',title: \'已报名列表\'\n            ' +
                        ',cols: [[\n              ' +
                        ',{field: \'id\', title: \'ID\', style:"width:70px" , minWidth:70, width:70, sort: true, fixed: \'left\', unresize: true}\n              ' +
                        ',{field:\'username\', style:"padding-left:15px", title:\'用户名\', width:100,sort: true}\n              ' +
                        ',{field:\'name\', title:\'姓名\', width:100,sort: true}\n              ' +
                        ',{field:\'gender\', title:\'性别\', width:70,sort: true}\n              ' +
                        ',{field:\'college\', title:\'学院\', width:190,sort: true}\n              ' +
                        ',{field:\'professional\', title:\'班级\', width:110,sort: true}\n              ' +
                        ',{field:\'number\', title:\'学号\', width:150,sort: true}\n              ' +
                        ',{field:\'date\', title:\'报名时间\', width:190,sort: true}\n              ' +
                        ',{field:\'teamName\', title:\'队伍名\', width:130,sort: true}\n              ' +
                        ',{title:\'操作\', toolbar: \'#barDemo\', width:80}\n            ' +
                        ']]\n            ' +
                        ',page: true\n          ' +
                    '});\n          \n          ' +
                    'table.on(\'toolbar(test)\', function(obj){\n            ' +
                    'var checkStatus = table.checkStatus(obj.config.id);\n            ' +
                    'switch(obj.event){\n              ' +
                    'case \'getCheckData\':\n                ' +
                    'var data = checkStatus.data;\n                ' +
                    'layer.alert(JSON.stringify(data));\n              ' +
                    'break;\n              ' +
                    'case \'getCheckLength\':\n                ' +
                    'var data = checkStatus.data;\n                ' +
                    'layer.msg(\'选中了：\'+ data.length + \' 个\');\n              ' +
                    'break;\n              ' +
                    'case \'isAll\':\n                ' +
                    'layer.msg(checkStatus.isAll ? \'全选\': \'未全选\');\n              ' +
                    'break;\n            ' +
                    '};\n          ' +
                    '});\n          \n          ' +
                    '//监听行工具事件\n          ' +
                    'table.on(\'tool(test)\', function(obj){\n            ' +
                        'var data = obj.data;\n            ' +
                        '//console.log(obj)\n            ' +
                        'if(obj.event === \'del\'){\n              ' +
                        'layer.confirm(\'真的删除此条数据吗\', function(index){\n                ' +
                            'cancelRegistration("'+number+'", obj.data.username);' +
                            'obj.del();\n                ' +
                            'layer.close(index);\n              ' +
                        '});\n            ' +
                        '} else if(obj.event === \'edit\'){\n              ' +
                            'layer.prompt({\n                ' +
                            'formType: 2\n                ' +
                            ',value: data.email\n              ' +
                        '}, function(value, index){\n                ' +
                        'obj.update({\n                  ' +
                            'email: value\n                ' +
                        '});\n' +
                        'layer.close(index);\n' +
                        '});\n ' +
                    '}\n          ' +
                    '});\n        ' +
                '});\n        ' +
            '</script>',
        btn: ['关闭'],
        btnAlign: 'c',
        shade: 0.5,
        title: "已报名选手列表",
        btn1 : function () {
            layer.closeAll();
        }
    });
}
//取消用户报名
function cancelRegistration(competitionNumber, username) {
    $.ajax({
        url : '../../../CompetitionUser/adminCancelRegistration',
        type : 'post',
        data : {"number": competitionNumber, "username":username},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "取消报名成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function (index) {
                        layer.close(index);
                    }
                });
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            console.log('请求失败！');
        }
    });
}
//开启报名
function open_registration(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var competition = contest_list[num-1];
    competition.competitionStart = new Date(competition.competitionStart).Format("yyyy-MM-dd hh:mm:ss");
    competition.competitionEnd = new Date(competition.competitionEnd).Format("yyyy-MM-dd hh:mm:ss");
    competition.competitionCreatetime = new Date(competition.competitionCreatetime).Format("yyyy-MM-dd hh:mm:ss");
    competition.competitionCanregister = 1;
    $.ajax({
        url : '../../../competition/updateCompetition',
        type : 'post',
        data : competition,
        scriptCharset : '',
        success : function (result) {
            if(result.message == null){
                getContests();
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
//截至报名
function close_registration(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var competition = contest_list[num-1];
    competition.competitionStart = new Date(competition.competitionStart).Format("yyyy-MM-dd hh:mm:ss");
    competition.competitionEnd = new Date(competition.competitionEnd).Format("yyyy-MM-dd hh:mm:ss");
    competition.competitionCreatetime = new Date(competition.competitionCreatetime).Format("yyyy-MM-dd hh:mm:ss");
    competition.competitionCanregister = 2;
    $.ajax({
        url : '../../../competition/updateCompetition',
        type : 'post',
        data : competition,
        scriptCharset : '',
        success : function (result) {
            if(result.message == null){
                getContests();
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
//修改比赛基本信息
function edit_contest(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var competition = contest_list[num-1];
    competitionId = competition.competitionId;
    competitionIsteam = competition.competitionIsteam;
    var sendData={"sendIp":"","sendPort":"","account":"","password":""};
    $.ajax({
        url : '../../../CompetitionMessage/queryByCompetitionId',
        type : 'post',
        data : {"competitionId" : competition.competitionId},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null) {
                if (result.CompetitionData != null) {
                    sendData = result.CompetitionData;
                }
                if(competitionIsteam == 1){
                    layer.open({
                        type: 1,
                        offset: 'auto',
                        skin: 'layui-layer-lan',
                        id: 'layerDemo1', //防止重复弹出
                        area: ['750px', '600px'],
                        content:'<form class="layui-form" action="" id="updateContest" style="margin:50px 0 0 5%; font-size:15px">\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">比赛名称</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '    <input type="text" id="contest_title" autocomplete="off" placeholder="请输入比赛名称" required class="layui-input" style="width: 80%;" value="'+ competition.competitionTitle +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">比赛编号</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '    <input type="text" id="contest_number" autocomplete="off" placeholder="请输入比赛编号" required class="layui-input layui-disabled" disabled style="width: 80%;"value="'+ competition.competitionNumber +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">主办方</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '    <input type="text" id="contest_organizer" autocomplete="off" placeholder="请输入主办方" required class="layui-input" style="width: 80%;" value="'+ competition.competitionHolder +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">开始时间</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '        <input type="text" id="contest_starttime" autocomplete="off" placeholder="yyyy-MM-dd HH:mm:ss" class="layui-input" style="width:200px" \n' +
                            '        onkeypress="inputLimit()" value="'+new Date(competition.competitionStart).Format("yyyy-MM-dd hh:mm:ss")+'">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">结束时间</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '        <input type="text" id="contest_endtime" autocomplete="off" placeholder="yyyy-MM-dd HH:mm:ss" class="layui-input" style="width:200px" \n' +
                            '        onkeypress="inputLimit()" value="'+new Date(competition.competitionEnd).Format("yyyy-MM-dd hh:mm:ss")+'">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item" id="contest_type">\n' +
                            '    <label class="layui-form-label">比赛类型</label>\n' +
                            '    <input name="contest_type" title="团队赛" type="radio" checked value="team" id="teamInput">\n' +
                            '    <div class="layui-unselect layui-form-radio layui-form-radiod">\n' +
                            '        <i class="layui-anim layui-icon"></i>\n' +
                            '        <div>团队赛</div>\n' +
                            '    </div>\n' +
                            '    <input name="contest_type" title="个人赛" type="radio" value="individual" id="individualInput">\n' +
                            '    <div class="layui-unselect layui-form-radio">\n' +
                            '        <i class="layui-anim layui-icon"></i>\n' +
                            '        <div>个人赛</div>\n' +
                            '    </div>\n' +
                            '</div> \n' +
                            '<div class="layui-form-item" style="margin-top:2.5%">\n' +
                            '    <div class="layui-input-inline" style="width:40%">\n' +
                            '        <label class="layui-form-label">比赛端IP</label>\n' +
                            '        <input type="text" id="contest_ip" autocomplete="off" required class="layui-input" style="width: 50%;" value="'+ sendData.sendIp +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '    <div class="layui-input-inline" style="width:40%">\n' +
                            '        <label class="layui-form-label">端口</label>\n' +
                            '        <input type="text" id="contest_port" autocomplete="off" required class="layui-input" style="width: 50%;" value="'+ sendData.sendPort +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item" style="margin-top:2.5%">\n' +
                            '    <div class="layui-input-inline" style="width:40%">\n' +
                            '        <label class="layui-form-label">账号</label>\n' +
                            '        <input type="text" id="contest_account" autocomplete="off" required class="layui-input" style="width: 50%;" value="'+ sendData.account +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '    <div class="layui-input-inline" style="width:40%">\n' +
                            '        <label class="layui-form-label">密码</label>\n' +
                            '        <input type="password" id="contest_password" autocomplete="off" required class="layui-input" style="width: 50%;" value="'+ sendData.password +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>'+
                            '</form>' +
                            '<script>\n' +
                            '    layui.use(\'form\', function(){\n' +
                            '    var form = layui.form;\n' +
                            '        form.render();\n' +
                            '        form.verify();' +
                            '    });\n' +
                            'layui.use(\'laydate\', function(){\n' +
                            '     var laydate = layui.laydate;\n' +
                            '     laydate.render({\n' +
                            '         elem : "#contest_starttime"\n' +
                            '         ,type: \'datetime\'\n' +
                            '     });\n' +
                            ' });\n' +
                            ' layui.use(\'laydate\', function(){\n' +
                            '     var laydate = layui.laydate;\n' +
                            '     laydate.render({\n' +
                            '         elem : "#contest_endtime"\n' +
                            '         ,type: \'datetime\'\n' +
                            '     });\n' +
                            ' });' +
                            '    layui.use(\'element\', function(){\n' +
                            '        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块\n' +
                            '        //监听导航点击\n' +
                            '        element.on(\'nav(demo)\', function(elem){\n' +
                            '            //console.log(elem)\n' +
                            '            layer.msg(elem.text());\n' +
                            '        });\n' +
                            '    });\n' +
                            '</script>',
                        btn: ['确定', '取消'],
                        btnAlign: 'c',
                        shade: 0.5,
                        title: "更新比赛基本信息",
                        btn1 : function () {
                            check_contest(competition);
                            return false;
                        },
                        btn2 : function () {
                            layer.closeAll();
                        }
                    });
                }
                else{
                    layer.open({
                        type: 1,
                        offset: 'auto',
                        skin: 'layui-layer-lan',
                        id: 'layerDemo1', //防止重复弹出
                        area: ['750px', '600px'],
                        content:'<form class="layui-form" action="" id="updateContest" style="margin:50px 0 0 5%; font-size:15px">\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">比赛名称</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '    <input type="text" id="contest_title" autocomplete="off" placeholder="请输入比赛名称" required class="layui-input" style="width: 80%;" value="'+ competition.competitionTitle +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">比赛编号</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '    <input type="text" id="contest_number" autocomplete="off" placeholder="请输入比赛编号" required class="layui-input layui-disabled" disabled style="width: 80%;"value="'+ competition.competitionNumber +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">主办方</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '    <input type="text" id="contest_organizer" autocomplete="off" placeholder="请输入主办方" required class="layui-input" style="width: 80%;" value="'+ competition.competitionHolder +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">开始时间</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '        <input type="text" id="contest_starttime" autocomplete="off" placeholder="yyyy-MM-dd HH:mm:ss" class="layui-input" style="width:200px" \n' +
                            '        onkeypress="inputLimit()" value="'+new Date(competition.competitionStart).Format("yyyy-MM-dd hh:mm:ss")+'">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item">\n' +
                            '    <label class="layui-form-label">结束时间</label>\n' +
                            '    <div class="layui-input-block">\n' +
                            '        <input type="text" id="contest_endtime" autocomplete="off" placeholder="yyyy-MM-dd HH:mm:ss" class="layui-input" style="width:200px" \n' +
                            '        onkeypress="inputLimit()" value="'+new Date(competition.competitionEnd).Format("yyyy-MM-dd hh:mm:ss")+'">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item" id="contest_type">\n' +
                            '    <label class="layui-form-label">比赛类型</label>\n' +
                            '    <input name="contest_type" title="团队赛" type="radio" value="team" id="teamInput">\n' +
                            '    <div class="layui-unselect layui-form-radio">\n' +
                            '        <i class="layui-anim layui-icon"></i>\n' +
                            '        <div>团队赛</div>\n' +
                            '    </div>\n' +
                            '    <input name="contest_type" title="个人赛" type="radio" checked value="individual" id="individualInput">\n' +
                            '    <div class="layui-unselect layui-form-radio layui-form-radiod">\n' +
                            '        <i class="layui-anim layui-icon"></i>\n' +
                            '        <div>个人赛</div>\n' +
                            '    </div>\n' +
                            '</div> \n' +
                            '<div class="layui-form-item" style="margin-top:2.5%">\n' +
                            '    <div class="layui-input-inline" style="width:40%">\n' +
                            '        <label class="layui-form-label">比赛端IP</label>\n' +
                            '        <input type="text" id="contest_ip" autocomplete="off" required class="layui-input" style="width: 50%;" value="'+ sendData.sendIp +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '    <div class="layui-input-inline" style="width:40%">\n' +
                            '        <label class="layui-form-label">端口</label>\n' +
                            '        <input type="text" id="contest_port" autocomplete="off" required class="layui-input" style="width: 50%;" value="'+ sendData.sendPort +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>\n' +
                            '<div class="layui-form-item" style="margin-top:2.5%">\n' +
                            '    <div class="layui-input-inline" style="width:40%">\n' +
                            '        <label class="layui-form-label">账号</label>\n' +
                            '        <input type="text" id="contest_account" autocomplete="off" required class="layui-input" style="width: 50%;" value="'+ sendData.account +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '    <div class="layui-input-inline" style="width:40%">\n' +
                            '        <label class="layui-form-label">密码</label>\n' +
                            '        <input type="password" id="contest_password" autocomplete="off" required class="layui-input" style="width: 50%;" value="'+ sendData.password +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                            '    </div>\n' +
                            '</div>'+
                            '</form>' +
                            '<script>\n' +
                            '    layui.use(\'form\', function(){\n' +
                            '    var form = layui.form;\n' +
                            '        form.render();\n' +
                            '        form.verify();' +
                            '    });\n' +
                            'layui.use(\'laydate\', function(){\n' +
                            '     var laydate = layui.laydate;\n' +
                            '     laydate.render({\n' +
                            '         elem : "#contest_starttime"\n' +
                            '         ,type: \'datetime\'\n' +
                            '     });\n' +
                            ' });\n' +
                            ' layui.use(\'laydate\', function(){\n' +
                            '     var laydate = layui.laydate;\n' +
                            '     laydate.render({\n' +
                            '         elem : "#contest_endtime"\n' +
                            '         ,type: \'datetime\'\n' +
                            '     });\n' +
                            ' });' +
                            '    layui.use(\'element\', function(){\n' +
                            '        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块\n' +
                            '        //监听导航点击\n' +
                            '        element.on(\'nav(demo)\', function(elem){\n' +
                            '            //console.log(elem)\n' +
                            '            layer.msg(elem.text());\n' +
                            '        });\n' +
                            '    });\n' +
                            '</script>',
                        btn: ['确定', '取消'],
                        btnAlign: 'c',
                        shade: 0.5,
                        title: "更新比赛基本信息",
                        btn1 : function () {
                            check_contest(competition);
                            return false;
                        },
                        btn2 : function () {
                            layer.closeAll();
                        }
                    });
                }
            }
            else{
                console.log(result.message);
            }
        },
        error : function () {
            console.log('请求获得比赛端地址信息失败');
        }
    });
}
//检查输入
function check_contest(competition) {
    contest_title = $("#contest_title").val();
    contest_organizer = $('#contest_organizer').val();
    contest_starttime = $("#contest_starttime").val();
    contest_endtime = $("#contest_endtime").val();
    contest_ip = $('#contest_ip').val();
    contest_port = $("#contest_port").val();
    contest_account = $("#contest_account").val();
    contest_password = $("#contest_password").val();
    contest_type = ((document.getElementsByClassName('layui-form-radioed'))[0]).childNodes[1].innerText;
    //非空判断
    if(contest_title === "" || contest_title == null){
        layer.msg("比赛名称不能为空！");
    }
    else if(contest_organizer === "" || contest_organizer == null){
        layer.msg("比赛主办方不能为空！");
    }
    else if(contest_type === "" || contest_type == null){
        layer.msg("请选择比赛类型！");
    }
    else if(contest_starttime === "" || contest_starttime == null){
        layer.msg("时间不能为空！");
    }
    else if(contest_endtime === "" || contest_endtime == null){
        layer.msg("时间不能为空！");
    }
    else if(contest_ip === "" || contest_ip == null){
        layer.msg("IP不能为空！");
    }
    else if(contest_port === "" || contest_port == null){
        layer.msg("端口号不能为空！");
    }
    else if(contest_account === "" || contest_account == null){
        layer.msg("账号不能为空！");
    }
    else if(contest_password === "" || contest_password == null){
        layer.msg("密码不能为空！");
    }
    else {
        if (contest_type === "团队赛") {
            contest_type = 1;
        }
        else {
            contest_type = 0;
        }
        updateContest(competition, contest_title, contest_organizer, contest_starttime, contest_endtime, contest_type, contest_ip, contest_port, contest_account, contest_password);

    }
}
//发送更新赛事基本信息请求
function updateContest(competition, contest_title, contest_organizer, contest_starttime, contest_endtime, contest_type, contest_ip, contest_port, contest_account, contest_password) {
    var mydata={"competitionId":competition.competitionId,"competitionTitle": contest_title,"competitionStart": contest_starttime,
        "competitionEnd": contest_endtime, "competitionIsteam": parseInt(contest_type),
        "competitionHolder":contest_organizer};
    // console.log(mydata);
    $.ajax({
        url : '../../../competition/updateCompetition',
        type:'post',
        data : mydata,
        scriptCharset : 'utf-8',
        success : function(result){
            if(result.message == null){
                updateCompetitionMessage(competition.competitionId, contest_ip, contest_port, contest_account, contest_password);
                // updateAdminProblem(competition.competitionId, contest_admins, contest_problems);
            }
        },
        error : function(){
            layer.msg('请求添加比赛失败');
        }
    });
}
function updateCompetitionMessage(competitionId, contest_ip, contest_port, contest_account, contest_password) {
    $.ajax({
        url : '../../../CompetitionAdmin/update',
        type : 'post',
        data : {"competitionId":competitionId, "sendIp":contest_ip,"sendPort":contest_port,"account":contest_account,"password":contest_password},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "更新成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                    // title: '在线调试'
                    // ,content: '可以填写任意的layer代码'
                });
                getContests();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg('比赛端信息更新失败');
        }
    });
}
//删除比赛
function del_contest(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var competition = contest_list[num-1];
    layer.open({
        type: 1,
        offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定删除此场比赛吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除比赛",
        btn1 : function () {
            delCompetition(competition);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}
function delCompetition(){
    var id = arguments[0].competitionId;
    $.ajax({
        url : '../../../competition/deleteCompetition',
        type : 'post',
        data : {"competitionId" : id},
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
                getContests();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("删除失败！");
        }
    });
}
//发送数据到比赛端
var competitionId;
function sendData() {
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    competitionId = contest_list[num-1].competitionId;
    var sendIP, sendPort, sendAccount, sendPassword;
    $.ajax({
        url: '../../../CompetitionMessage/queryByCompetitionId',
        type: 'post',
        data: {"competitionId": competitionId},
        scriptCharset: 'utf-8',
        success: function (result) {
            // console.log(result);
            if (result.CompetitionData != null) {
                sendIP = result.CompetitionData.sendIp;
                sendPort = result.CompetitionData.sendPort;
                sendAccount = result.CompetitionData.account;
                sendPassword = result.CompetitionData.password;
                $.ajax({
                    url: '../../../send/sendData',
                    type: 'post',
                    data: {"competitionId": competitionId},
                    scriptCharset: 'utf-8',
                    success: function (result) {
                        // console.log(result);
                        if (result.message == null) {
                            console.log(result);
                            sendDataToCompetition(result, sendIP, sendPort, sendAccount, sendPassword);
                        }
                    }
                });
            }
            else{
                console.log(result.message);
            }
        }
    });
}
var dataMessage;
function sendDataToCompetition(result, ip, port, account, password) {
    var address = "ws://"+ip+":"+port+"?account="+account+"&password="+password;
    // address = "ws://"+"192.168.3.56"+":"+port+"?account="+account+"&password="+password;
    dataMessage={"address":address,"result":result};
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['750px', '300px'],
        content:'<form class="layui-form" action="" id="updateContest" style="margin:20px 0 0 5%; font-size:15px">\n' +
            '<a class="layui-btn layui-btn-primary layui-btn-xs" onclick="sendCompetition()">' +
            '<i class="layui-icon layui-icon-release"></i>' +
            '发送比赛基本信息' +
            '</a>'+
            '<br>'+
            '<a style="margin-top: 10px" class="layui-btn layui-btn-primary layui-btn-xs" onclick="sendProblems()">' +
            '<i class="layui-icon layui-icon-release"></i>' +
            '发送比赛题目信息' +
            '</a>'+
            '<br>'+
            '<a style="margin-top: 10px" class="layui-btn layui-btn-primary layui-btn-xs" onclick="sendAdmins()">' +
            '<i class="layui-icon layui-icon-release"></i>' +
            '发送比赛管理员信息' +
            '</a>'+
            '<br>'+
            '<a style="margin-top: 10px" class="layui-btn layui-btn-primary layui-btn-xs" onclick="sendCompetitors()">' +
            '<i class="layui-icon layui-icon-release"></i>' +
            '发送比赛选手信息' +
            '</a>'+
            '<br>'+
            '<a style="margin-top: 10px" class="layui-btn layui-btn-primary layui-btn-xs" onclick="sendTeams()">' +
            '<i class="layui-icon layui-icon-release"></i>' +
            '发送比赛队伍信息' +
            '</a>'+
            '</form>' +
            '<script>\n' +
            '    layui.use(\'form\', function(){\n' +
            '    var form = layui.form;\n' +
            '        form.render();\n' +
            '        form.verify();' +
            '    });\n' +
            '</script>',
        btn: ['取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "发送比赛信息",
        btn1 : function () {
            layer.closeAll();
        }
    });
}

function sendCompetition() {
    var address  = dataMessage.address;
    var result = dataMessage.result;
    var ws = new WebSocket(address);
    ws.onopen = function () {
        ws.send(JSON.stringify({
            key: 'requestAddCompetitions',
            params: {
                competitions: result.competitions
            }
        }));
        // ws.send(JSON.stringify({
        //     key: 'requestAddCompetitors',
        //     params: {
        //         competitors: result.competitors,
        //         replace : true
        //     }
        // }));
        // ws.send(JSON.stringify({
        //     key: 'requestAddTeams',
        //     params: {
        //         teams: result.teams,
        //         replace : true
        //     }
        // }));
        // ws.send(JSON.stringify({
        //     key:'requestAddAdmins',
        //     params:{
        //         admins:result.admins
        //     }
        // }));
        // ws.send(JSON.stringify({
        //     key:'requestAddProblems',
        //     params:{
        //         problems:result.problems
        //     }
        // }));
        layer.open({
            type: 1,
            offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            id: 'layerDemo2', //防止重复弹出
            content: '<div style="padding: 20px 20px;">' + "发送比赛基本信息成功！" + '</div>',
            btn: '确定',
            btnAlign: 'c', //按钮居中
            shade: 0.5, //不显示遮罩
            title: "HZNUCTF",
            yes : function (index) {
                ws.close();
                layer.close(index);
            }
        });
    }
}
function sendProblems(){
    var address  = dataMessage.address;
    var result = dataMessage.result;
    var sendProblems = result.problems;
    if(sendProblems != null && sendProblems.length > 0){
        var ws = new WebSocket(address);
        var problemIds = "", orders = "";
        for(var i = 0; i < sendProblems.length; ++i){
            problemIds += sendProblems[i].id + " ";
            orders += sendProblems[i].problemId + " ";
        }

        ws.onopen = function () {
            ws.send(JSON.stringify({
                key:'requestAddProblems',
                params:{
                    problems:result.problems
                }
            }));
            layer.open({
                type: 1,
                offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                id: 'layerDemo2', //防止重复弹出
                content: '<div style="padding: 20px 20px;">' + "发送比赛题目信息成功！" + '</div>',
                btn: '确定',
                btnAlign: 'c', //按钮居中
                shade: 0.5, //不显示遮罩
                title: "HZNUCTF",
                yes : function (index) {
                    $.ajax({
                        url: '../../../send/saveSendedProblems',
                        type: 'post',
                        data: {"problemIds": problemIds, "orders" : orders, "competitionId" : competitionId},
                        scriptCharset: 'utf-8',
                        success: function (result) {
                            if(result.message != null){
                                layer.msg(result.message);
                            }
                        }

                    });
                    ws.close();
                    layer.close(index);
                }
            });
        }
    }

}
function sendAdmins(){
    var address  = dataMessage.address;
    var result = dataMessage.result;
    var ws = new WebSocket(address);
    ws.onopen = function () {
        // ws.send(JSON.stringify({
        //     key: 'requestAddCompetitions',
        //     params: {
        //         competitions: result.competitions
        //     }
        // }));
        // ws.send(JSON.stringify({
        //     key: 'requestAddCompetitors',
        //     params: {
        //         competitors: result.competitors,
        //         replace : true
        //     }
        // }));
        // ws.send(JSON.stringify({
        //     key: 'requestAddTeams',
        //     params: {
        //         teams: result.teams,
        //         replace : true
        //     }
        // }));
        ws.send(JSON.stringify({
            key:'requestAddAdmins',
            params:{
                admins:result.admins,
                replace : true
            }
        }));
        // ws.send(JSON.stringify({
        //     key:'requestAddProblems',
        //     params:{
        //         problems:result.problems
        //     }
        // }));
        layer.open({
            type: 1,
            offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            id: 'layerDemo2', //防止重复弹出
            content: '<div style="padding: 20px 20px;">' + "发送比赛管理员信息成功！" + '</div>',
            btn: '确定',
            btnAlign: 'c', //按钮居中
            shade: 0.5, //不显示遮罩
            title: "HZNUCTF",
            yes : function (index) {
                ws.close();
                layer.close(index);
            }
        });
    }
}
function sendCompetitors(){
    var address  = dataMessage.address;
    var result = dataMessage.result;
    var ws = new WebSocket(address);
    ws.onopen = function () {
        // ws.send(JSON.stringify({
        //     key: 'requestAddCompetitions',
        //     params: {
        //         competitions: result.competitions
        //     }
        // }));
        ws.send(JSON.stringify({
            key: 'requestAddCompetitors',
            params: {
                competitors: result.competitors,
                replace : true
            }
        }));
        // ws.send(JSON.stringify({
        //     key: 'requestAddTeams',
        //     params: {
        //         teams: result.teams,
        //         replace : true
        //     }
        // }));
        // ws.send(JSON.stringify({
        //     key:'requestAddAdmins',
        //     params:{
        //         admins:result.admins
        //     }
        // }));
        // ws.send(JSON.stringify({
        //     key:'requestAddProblems',
        //     params:{
        //         problems:result.problems
        //     }
        // }));
        layer.open({
            type: 1,
            offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            id: 'layerDemo2', //防止重复弹出
            content: '<div style="padding: 20px 20px;">' + "发送比赛选手信息成功！" + '</div>',
            btn: '确定',
            btnAlign: 'c', //按钮居中
            shade: 0.5, //不显示遮罩
            title: "HZNUCTF",
            yes : function (index) {
                ws.close();
                layer.close(index);
            }
        });
    }
}
function sendTeams(){
    var address  = dataMessage.address;
    var result = dataMessage.result;
    var ws = new WebSocket(address);
    ws.onopen = function () {
        // ws.send(JSON.stringify({
        //     key: 'requestAddCompetitions',
        //     params: {
        //         competitions: result.competitions
        //     }
        // }));
        // ws.send(JSON.stringify({
        //     key: 'requestAddCompetitors',
        //     params: {
        //         competitors: result.competitors,
        //         replace : true
        //     }
        // }));
        ws.send(JSON.stringify({
            key: 'requestAddTeams',
            params: {
                teams: result.teams,
                replace : true
            }
        }));
        // ws.send(JSON.stringify({
        //     key:'requestAddAdmins',
        //     params:{
        //         admins:result.admins
        //     }
        // }));
        // ws.send(JSON.stringify({
        //     key:'requestAddProblems',
        //     params:{
        //         problems:result.problems
        //     }
        // }));
        layer.open({
            type: 1,
            offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            id: 'layerDemo2', //防止重复弹出
            content: '<div style="padding: 20px 20px;">' + "发送比赛队伍信息成功！" + '</div>',
            btn: '确定',
            btnAlign: 'c', //按钮居中
            shade: 0.5, //不显示遮罩
            title: "HZNUCTF",
            yes : function (index) {
                ws.close();
                layer.close(index);
            }
        });
    }

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