var contest_title, contest_number, contest_organizer, contest_description, contest_starttime, contest_endtime, contest_type, contest_admins, contest_problems;
var contest_ip, contest_port, contest_account, contest_password;
var admin_list;
var problem_type_list;
var problem_list;
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
function fillSelects(form){
    getAdmins();
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
function getAdmins() {
    $.ajax({
        url : '../../../admin/listadmin',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                admin_list = result.adminlist;
                // console.log(admin_list);
                fillAdminSelect();
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
function fillAdminSelect(){
    var adminSelect = $("#selected_admins");
    for(var i=0;i<admin_list.length;++i){
        var option = document.createElement("option");
        option.value = admin_list[i].adminId;
        option.innerText = admin_list[i].adminUsername;
        adminSelect.append(option);
    }
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
        div2.style.width = "50%";

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
        $("#buttons").before(div1);
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
    formSelects.selects({
        name: 'select0',
        el: 'select[name=admins]',
        model: 'select',
        filter: 'admin',
        left: '【',		//显示的符号left
        right: '】',
        separator: '',
        reset: true
    });
}

function add_contest(){
    contest_title = $("#contest_title").val();
    contest_number = $('#contest_number').val();
    contest_organizer = $('#contest_organizer').val();
    // contest_description = $(".tcp_content").val();
    contest_starttime = $("#contest_starttime").val();
    contest_endtime = $("#contest_endtime").val();
    contest_ip = $('#contest_ip').val();
    contest_port = $("#contest_port").val();
    contest_account = $("#contest_account").val();
    contest_password = $("#contest_password").val();
    contest_type = ((document.getElementsByClassName('layui-form-radioed'))[0]).childNodes[1].innerText;
    var contest_admins_arr = formSelects.array('select0');
    //非空判断
    if(contest_title === "" || contest_title == null){
        layer.msg("比赛名称不能为空！");
    }
    else if(contest_number === "" || contest_number == null){
        layer.msg("比赛编号不能为空！");
    }
    else if(contest_organizer === "" || contest_organizer == null){
        layer.msg("比赛主办方不能为空！");
    }
    // else if(contest_description === "" || contest_description == null){
    //     layer.msg("比赛简介不能为空！");
    // }
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
    else if(contest_admins_arr === "" || contest_admins_arr == null || contest_admins_arr.length == 0){
        layer.msg("请选择比赛管理员！");
    }
    else {
        if (contest_type === "团队赛") {
            contest_type = 1;
        }
        else {
            contest_type = 0;
        }
        //获得这场比赛管理员的id串，以 , 为间隔
        contest_admins = contest_admins_arr[0].val;
        for (var j = 1; j < contest_admins_arr.length; ++j) {
            contest_admins += ',' + contest_admins_arr[j].val;
        }
        // console.log(contest_admins);

        //获得这场比赛题目的id串，以 , 为间隔
        contest_problems = "";
        for (var k = 0; k < problem_type_list.length; ++k) {
            var problem_arr = formSelects.array('select' + (k + 1));
            for (var i = 0; problem_arr != null && i < problem_arr.length; ++i) {
                contest_problems += problem_arr[i].val + ",";
            }
        }
        // console.log(contest_problems);
        // console.log(contest_title, contest_number, contest_organizer, contest_description, contest_starttime, contest_endtime, contest_type, contest_admins, contest_problems);
        if (contest_problems === "") {
            layer.msg("请选择题目！");
        }
        else {
            add_Contest(contest_title, contest_number, contest_organizer, contest_description, contest_starttime, contest_endtime, contest_type, contest_admins, contest_problems, contest_ip, contest_port, contest_account, contest_password);
        }
    }
}
function add_Contest(contest_title, contest_number, contest_organizer, contest_description, contest_starttime, contest_endtime, contest_type, contest_admins, contest_problems, contest_ip, contest_port, contest_account, contest_password){
    var mydata={"competitionTitle": contest_title,"competitionStart": contest_starttime,
        "competitionEnd": contest_endtime,"competitionCanregister": parseInt(0),
        "competitionIsteam": parseInt(contest_type),"competitionNumber": contest_number,
        "competitionHolder": contest_organizer};
    // console.log(mydata);
    $.ajax({
        url : '../../../competition/insertCompetition',
        type:'post',
        data : mydata,
        scriptCharset : 'utf-8',
        success : function(result){
            if(result.message == null) {
                if (result.competitionId != null) {
                    var competitionId = result.competitionId;
                    // console.log(competitionId);
                    addAdminProblem(competitionId, contest_admins, contest_problems, contest_ip, contest_port, contest_account, contest_password);

                }
            }
            else{
                layer.msg(result.message)
            }
        },
        error : function(){
            layer.msg('请求添加比赛失败');
        }
    });
}

function addAdminProblem(competitionId, admins, problems, ip, port, account, password) {
    $.ajax({
        url : '../../../CompetitionAdmin/insert',
        type : 'post',
        data : {"competitionId":competitionId, "adminAdminList":admins,"questionList":problems},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "添加成功！" + '</div>',
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
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg('比赛添加管理员和题目失败');
        }
    });
    //添加比赛管理端相关信息
    $.ajax({
        url : '../../../CompetitionMessage/insert',
        type : 'post',
        data : {"competitionId":competitionId, "sendIp": ip,"sendPort": port,"account": account,"password": password},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                $('.layui-btn-primary')[0].click();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg('比赛端信息添加失败');
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