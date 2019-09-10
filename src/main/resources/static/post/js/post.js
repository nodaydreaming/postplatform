var  userId;
window.onload = function () {
    $.ajax({
        url : '../user/getLoginUser',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.loginUser != null){
                var loginUser = result.loginUser;
                userId = loginUser.userId;
                $('#btns').attr("hidden", "hidden");
                $('#nameDiv').removeAttr("hidden");
                $("#username").text(loginUser.userName);
            }

        },
        error : function () {
            layer.msg("请求失败！");
        }
    });
    var index = window.location.href.indexOf('?');
    var postId = window.location.href.substr(index+1);
    getPosts(postId);
}

function getPosts(postId){
    $.ajax({
        url : '../post/findPostById',
        type : 'post',
        data : {"postId":postId},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.postEntity != null){
                var post = result.postEntity;
                fillPost(post);
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

function fillPost(post){
    var tbody = $("#post");

    var td1 = $("<td>" + "名称" + "</td>")
    var td2 = $("<td>" + post.postName + "</td>")
    var tr1 = $("<tr></tr>");
    tr1.append(td1);
    tr1.append(td2);
    tbody.append(tr1);

    var td3 = $("<td>" + "招聘方" + "</td>")
    var td4 = $("<td>" + post.postEmployer + "</td>")
    var tr2 = $("<tr></tr>");
    tr2.append(td3);
    tr2.append(td4);
    tbody.append(tr2);

    var td5 = $("<td>" + "开始时间" + "</td>")
    var td6 = $("<td>" + new Date(post.postStarttime).Format("yyyy-MM-dd hh:mm:ss") + "</td>")
    var tr3 = $("<tr></tr>");
    tr3.append(td5);
    tr3.append(td6);
    tbody.append(tr3);

    var td7 = $("<td>" + "结束时间" + "</td>")
    var td8 = $("<td>" + new Date(post.postEndtime).Format("yyyy-MM-dd hh:mm:ss") + "</td>")
    var tr4 = $("<tr></tr>");
    tr4.append(td7);
    tr4.append(td8);
    tbody.append(tr4);

    var td9 = $("<td>" + "面试时间" + "</td>")
    var td10 = $("<td>" + new Date(post.postInterviewDate).Format("yyyy-MM-dd hh:mm:ss") + "</td>")
    var tr5 = $("<tr></tr>");
    tr5.append(td9);
    tr5.append(td10);
    tbody.append(tr5);

    var td11 = $("<td>" + "需求人数" + "</td>")
    var td12 = $("<td>" + post.postNumber + "</td>")
    var tr6 = $("<tr></tr>");
    tr6.append(td12);
    tr6.append(td11);
    tbody.append(tr6);

    var td13 = $("<td>" + "要求" + "</td>")
    var td14 = $("<td>" + post.postDemand + "</td>")
    var tr7 = $("<tr></tr>");
    tr7.append(td13);
    tr7.append(td14);
    tbody.append(tr7);

    var td15 = $("<td>" + "要求" + "</td>")
    var td16 = $("<td>" + post.postDescription + "</td>")
    var tr8 = $("<tr></tr>");
    tr8.append(td15);
    tr8.append(td16);
    tbody.append(tr8);

}

Date.prototype.Format = function(fmt)
{
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