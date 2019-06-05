/**
 * 公告页面的js文件
 * 主要包含 以下函数
 * 添加公告、修改公告、删除公告
 */
var notice_list = [{"title":"第一条公告，测试使用！","content":"这是第一条公告的内容，测试使用数据这是第一条公告的内容，测试使用数据这是第一条公告的内容，测试使用数据这是第一条公告的内容，测试使用数据！"},
                         {"title":"第er条公告，测试使用！","content":"这是第er条公告的内容，测试使用数据！"},
                         {"title":"第san条公告，测试使用！","content":"这是第san条公告的内容，测试使用数据！"}];
var notice_title, notice_content;
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
    getNotices();
};

function getNotices() {
    $.ajax({
        url : '../../../notice/findAllNotices',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null){
                if(result.noticeList != null){
                    fillNotice(result.noticeList);
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

function fillNotice() {
    notice_list = arguments[0];
    var tbody = document.getElementsByTagName('tbody')[0];
    $('tbody').html("");

    for (var i = 0; i < notice_list.length; ++i){
        var notice = notice_list[i];
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.style.textAlign = "center";
        td1.innerText = i + 1;
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.innerText = notice.noticeTitle;
        td2.style.wordWrap = "break-word";
        tr.appendChild(td2);

        var td4 = document.createElement('td');
        td4.innerText = notice.noticeContent;
        td4.title = notice.noticeContent;
        td4.style.maxWidth = "50%";
        td4.style.whiteSpace = "nowrap";
        td4.style.textOverflow = "ellipsis";
        td4.style.overflow = "hidden";
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.innerText = new Date(notice.noticeDate).Format("yyyy-MM-dd hh:mm:ss");
        td5.style.wordWrap = "break-word";
        tr.appendChild(td5);

        var td6 = document.createElement('td');
        td6.innerText = notice.noticeAuthor;
        td6.style.wordWrap = "break-word";
        tr.appendChild(td6);

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
        a1.onclick = editnotice;

        var a2 = document.createElement('a');
        a2.id = "delPaper" + (i+1);
        a2.className = "layui-btn layui-btn-danger layui-btn-xs";
        var i2 = document.createElement('i');
        i2.className = "layui-icon layui-icon-delete";
        a2.appendChild(i2);
        a2.innerHTML = a2.innerHTML + "删除";
        a2.onclick = delnotice;

        td3.appendChild(a1);
        td3.appendChild(a2);

        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
}

function open_add_notice() {
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['600px', '400px'],
        content:
            '<form class="layui-form" action="" style="margin:50px 0 0 5%; font-size:15px">\n' +
            '    <div class="layui-form-item">\n' +
            '        <label class="layui-form-label">公告标题</label>\n' +
            '        <div class="layui-input-block">\n' +
            '            <input type="text" id="notice_title" autocomplete="off" placeholder="请输入公告标题" required class="layui-input" style="width: 80%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '        </div>\n' +   
            '    </div>\n' +
            '    <div class="layui-form-item">\n' +
            '        <label class="layui-form-label">公告内容</label>\n' +
            '        <div class="layui-input-block">\n' +
            '           <textarea class="tcp_content layui-textarea" placeholder="请输入公告内容"\n' +
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
        title: "添加公告",
        btn1 : function () {
            add_notice();
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function add_notice() {
    notice_content = $('.tcp_content').val();
    notice_title = $("#notice_title").val();
    if(notice_title === "" || notice_title == null){
        layer.tips("标题不能为空！", "#notice_title");
    }
    else if(notice_content == null || notice_content === ""){
        layer.tips("内容不能为空！", ".tcp_content");
    }
    else{
        add_Notice(notice_title, notice_content);
    }
}

function add_Notice(notice_title, notice_content) {
    $.ajax({
        url : '../../../notice/saveNotice',
        type : 'post',
        data : {"noticeTitle" : notice_title, "noticeContent" : notice_content},
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
                getNotices();
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

function editnotice() {
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var notice = notice_list[num-1];
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['600px', '400px'],
        content:
        '<form class="layui-form" action="" style="margin:50px 0 0 5%; font-size:15px">\n' +
        '    <div class="layui-form-item">\n' +
        '        <label class="layui-form-label">公告标题</label>\n' +
        '        <div class="layui-input-block">\n' +
        '            <input type="text" id="notice_title" autocomplete="off" placeholder="请输入公告标题" required class="layui-input" value="'+ notice.noticeTitle +'"style="width: 80%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
        '        </div>\n' +   
        '    </div>\n' +
        '    <div class="layui-form-item">\n' +
        '        <label class="layui-form-label">公告内容</label>\n' +
        '        <div class="layui-input-block">\n' +
        '           <textarea class="tcp_content layui-textarea" placeholder="请输入公告内容"\n' +
        '                     style="width: 80%; height: 130px; resize:none" maxlength="300"\n' +
        '                     onchange="textarea_fun()" onkeydown="textarea_fun()" onkeyup="textarea_fun()">'+ notice.noticeContent +'</textarea>\n' +
        '           <span class="t_h" style="float: right; margin-right: 20%"><i>'+ notice.noticeContent.length +'</i>/300</span>\n' +
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
        title: "更新公告信息",
        btn1 : function () {
            edit_notice(notice);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function edit_notice() {
    var notice = arguments[0];
    notice_content = $('.tcp_content').val();
    notice_title = $("#notice_title").val();
    if(notice_title === "" || notice_title == null){
        layer.tips("标题不能为空！", "#notice_title");
    }
    else if(notice_content == null || notice_content === ""){
        layer.tips("内容不能为空！", ".tcp_content");
    }
    else{
        updatenotice(notice.noticeId, notice_title, notice_content);
    }

}

function updatenotice(id, title, content) {
    $.ajax({
        url : '../../../notice/updateNotice',
        type : 'post',
        data : {"noticeId":id, "noticeTitle" : title, "noticeContent" : content},
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
                getNotices();
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

function delnotice() {
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var notice = notice_list[num-1];
    layer.open({
        type: 1,
        offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定删除此条公告吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除公告",
        btn1 : function () {
            delNotice(notice);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delNotice() {
    var id = arguments[0].noticeId;
    $.ajax({
        url : '../../../notice/deleteNotice',
        type : 'post',
        data : {"noticeId" : id},
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
                getNotices();
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

function textarea_fun(){
    $(".tcp_content").val($(".tcp_content").val().substring(0,500));
    $(".t_h i").html($(".tcp_content").val().length);
    if(window.event.keyCode  == 13){
        return false;
    }
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