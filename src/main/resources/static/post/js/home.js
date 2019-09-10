window.onload = function () {
    $.ajax({
        url : '../user/getLoginUser',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.loginUser != null){
                var loginUser = result.loginUser;
                $('#btns').attr("hidden", "hidden");
                $('#nameDiv').removeAttr("hidden");
                $("#username").text(loginUser.userName);
            }

        },
        error : function () {
            layer.msg("请求失败！");
        }
    });
    getPosts();
}

function getPosts(){
    $.ajax({
        url : '../post/findAllByPostType?postType=1',
        type : 'get',
        scriptCharset : 'utf-8',
        success : function(result){
            fillPosts(result.postList, 1);
        },
        error : function(){
            layer.msg('请求获得校内岗失败');
        }
    });
    $.ajax({
        url : '../post/findAllByPostType?postType=2',
        type : 'get',
        scriptCharset : 'utf-8',
        success : function(result){
            fillPosts(result.postList, 2);
        },
        error : function(){
            layer.msg('请求获得校外岗失败');
        }
    });
    $.ajax({
        url : '../post/findAllByPostType?postType=3',
        type : 'get',
        scriptCharset : 'utf-8',
        success : function(result){
            fillPosts(result.postList, 3);
        },
        error : function(){
            layer.msg('请求获得家教岗位失败');
        }
    });
}

function fillPosts(postList, id){
    var tableId = "post"+ id;
    var tbody = $("#"+tableId);
    for(var i = 0; i < 5 && i < postList.length; ++i){
        var post = postList[i];
        var postId = post.postId;
        var td1 = $("<td>" + post.postName + "</td>")
        var state = "已结束";
        if(parseInt(post.postState) == 1){
            state = "招聘中";
        }
        else {
            state = "已结束";
        }
        var td2 = $("<td>" + state + "</td>")

        var tr = $("<tr></tr>");

        tr.append(td1);
        tr.append(td2);
        tr.css("cursor", "pointer");
        tr.click(function(){
            window.location.href = "post.html?"+postId;
        });

        tbody.append(tr);
    }
}

var noticeList;
function getNotices(element){
    $.ajax({
        url : '../notice/showNotice',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function(result){
            noticeList = result.noticeList;
            fillNotices(element);
        },
        error : function(){
            layer.msg('请求获得公告失败');
        }
    });
}

function fillNotices(element){
    $("#notice").html("");
    for(var i = 0; i < 6 && i < noticeList.length; ++i){
        var notice = noticeList[i];
        var div1 = $('<div class="layui-colla-item"></div>');
        var h2 = $('<h2 clsss="layui-colla-title"></h2>');
        var span = $('<span style="float:right;"></span>');
        var div2 = $('<div class="layui-colla-content"></div>');

        div2.text(notice.noticeContent);
        h2.text(notice.noticeTitle);
        span.text("【"+(new Date(notice.noticeDate).Format("yyyy-MM-dd"))+"】");

        h2.append(span);
        div1.append(h2);
        div1.append(div2);

        $("#notice").append(div1);
    }

    element.init();
    element.render('collapse', 'notice0');
    layui.element.render('collapse');
}

function signOut(){
    $.ajax({
        url : '../user/signout',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function(result){
            if(result.message == null){
                $('#nameDiv').attr("hidden", "hidden");
                $('#btns').removeAttr("hidden");
                layer.msg('推出成功');
            }
            else {
                layer.msg(result.message);
            }
        },
        error : function(){
            layer.msg('请求获得公告失败');
        }
    });
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