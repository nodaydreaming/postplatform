var post_name, post_type, post_employer, post_starttime, post_endtime, post_interview_date, post_number, post_salary, post_description, post_demand;
var employer_list;
var description, demand;
layui.use('layedit', function(){
    var layedit = layui.layedit;
    description = layedit.build('description', {
        tool: [
            'strong' //加粗
            ,'italic' //斜体
            ,'underline' //下划线
            ,'del' //删除线
            ,'|' //分割线
            ,'left' //左对齐
            ,'center' //居中对齐
            ,'right' //右对齐
        ],
        height: 180
    }); //建立编辑器
    demand = layedit.build('demand', {
        tool: [
            'strong' //加粗
            ,'italic' //斜体
            ,'underline' //下划线
            ,'del' //删除线
            ,'|' //分割线
            ,'left' //左对齐
            ,'center' //居中对齐
            ,'right' //右对齐
        ],
        height: 180
    }); //建立编辑器
});
//使用layui的模块拓展功能
layui.use('form', function(){
    var form = layui.form;
    getEmployers(form);
});
//日期选择输入框的渲染
layui.use('laydate', function(){
    var laydate = layui.laydate;
    laydate.render({
        elem : "#post_starttime"
        ,type: 'datetime'
    });
    laydate.render({
        elem : "#post_endtime"
        ,type: 'datetime'
    });
    laydate.render({
        elem : "#post_interview_date"
        ,type: 'datetime'
    });
});

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
}
function getEmployers(form){
    $.ajax({
        url : '../../../employer/findAllEmployers',
        scriptCharset : 'utf-8',
        type:'get',
        success : function(result){
            if(result.message == null){
                if(result.employerList != null){
                    // console.log(result.listQuestiontype);
                    employer_list = result.employerList;
                    fill_employer_block(form);
                }
                else{
                    layer.msg('请求招聘方列表失败');
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
function fill_employer_block(form){

    for(var i = 0; i < employer_list.length; ++i){
        var employer0 = employer_list[i];

        var option = document.createElement("option");
        option.value = employer0.employerId;
        option.innerText = employer0.employerName+"(" + employer0.employerContact + ") ";
        $("#employer").append(option);
    }
    form.render();
    form.verify();
}

function add_post(){
    var layedit = layui.layedit;
    post_name = $("#post_name").val();
    post_type = $('#type').find("option:selected").text();
    post_employer = $('#employer').find("option:selected").val();
    post_starttime = $("#post_starttime").val();
    post_endtime = $("#post_endtime").val();
    post_interview_date = $('#post_interview_date').val();
    post_number = $('#post_number').val();
    post_salary = $('#post_salary').val();
    post_description = layedit.getContent(description);
    post_demand = layedit.getContent(demand);
    
    //非空判断
    if(post_name == null || post_name === ""){
        layer.tips("名称不能为空！", "#post_name");
    }
    else if(post_type == null || post_type === "" || post_type === "请选择"){
        layer.tips("请选择岗位类型！", "#type")
    }
    // else if(post_employer == null || post_employer === "" || post_employer === "请选择"){
    //     layer.tips("请选择招聘方！", "#employer")
    // }
    else if(post_starttime == null || post_starttime === "" ){
        layer.tips("请选择开始时间！", "#post_starttime");
    }
    else if(post_endtime == null || post_endtime === ""){
        layer.tips("请选择结束时间！", "#post_endtime");
    }
    else if(post_interview_date == null || post_interview_date === "" ){
        layer.tips("请选择面试时间！", "#post_starttime");
    }
    else if(post_number == null || post_number == ""){
        layer.tips("请填写需求人数！", "#post_number");
    }
    else if(post_salary == null || post_salary == ""){
        layer.tips("请填写薪资待遇！", "#post_salary");
    }
    else if(post_demand == null || post_demand == ""){
        layer.tips("请填写岗位要求！", "#demand");
    }
    else if(post_description == null || post_description == ""){
        layer.tips("请填写岗位简介！", "#description");
    }
    else{
        addPost(post_name, post_type, post_employer, post_starttime, post_endtime, post_interview_date, post_number, post_salary, post_description, post_demand);
    }
}
function addPost(post_name, post_type, post_employer, post_starttime, post_endtime, post_interview_date, post_number, post_salary, post_description, post_demand){
    var mydata={"postName": post_name,"postType": post_type,
        "postEmployer": post_employer,"postStarttime": new Date(post_starttime),
        "postEndtime": new Date(post_endtime),"postInterviewDate": new Date(post_interview_date),
        "postNumber": post_number, "postSalary": post_salary,
        "postDescription": post_description,"postDemand": post_demand}
    // console.log(mydata);
    $.ajax({
        url : '../../../post/savePost',
        type:'post',
        data : mydata,
        scriptCharset : 'utf-8',
        success : function(result){
            if(result.message == null) {
                if (result.newPost != null) {
                    layer.open({
                        type: 1,
                        offset: 'auto',
                        id: 'layerDemo2', //防止重复弹出
                        content: '<div style="padding: 20px 100px;">' + "添加成功！" + '</div>',
                        btn: '关闭',
                        btnAlign: 'c', //按钮居中
                        shade: 0.5, //不显示遮罩
                        title: "HZNUPOST",
                        yes: function () {
                            layer.closeAll();
                        }
                        // title: '在线调试'
                        // ,content: '可以填写任意的layer代码'
                    });
                }
            }
            else{
                layer.msg(result.message)
            }
        },
        error : function(){
            layer.msg('请求添加岗位失败');
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