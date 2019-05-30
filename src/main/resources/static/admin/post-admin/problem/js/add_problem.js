var problem_type;
window.onload = function () {
    getProblemType();
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
            console.log("请求失败！");
        }
    });

};
//请求可添加题目的题目类型名称
function getProblemType(){
    $.ajax({
        url : '../../../Questiontype/listQuestiontype',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null) {
                var form = layui.form;
                problem_type = result.listQuestiontype;
                fillProblemTypeSelect();
                form.render();
                form.verify();
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

function fillProblemTypeSelect(){

    var select = document.getElementsByName("modules")[0];
    select.innerHTML = "";
    var option0 = document.createElement("option");
    option0.value = "";
    option0.innerText = "请选择";
    select.appendChild(option0);
    for(var i = 0; i < problem_type.length; ++i){
        var option = document.createElement("option");
        option.value = problem_type[i].questionTypeId;
        option.innerText = problem_type[i].questionType;
        // console.log(problem_type[i].questionType);
        select.appendChild(option);
    }
}

function textarea_fun(){
    $(".tcp_content").val($(".tcp_content").val().substring(0,500));
    $(".t_h i").html($(".tcp_content").val().length);
    if(window.event.keyCode  == 13){
        return false;
    }
}