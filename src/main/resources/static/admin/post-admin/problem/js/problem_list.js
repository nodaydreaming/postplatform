var problem_list;
var question_type;
var problem_address = null;
var problem_title, problem_level, problem_type, problem_description, problem_answer, problem_author, problem_sorce, problem_additional_sorce, problem_sorce_float;
var uploadInst;
var index = 0;
var selected_problem;
layui.use('element', function(){
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    //监听导航点击
    element.on('nav(demo)', function(elem){
        //console.log(elem)
        layer.msg(elem.text());
    });
    //一些事件监听
    element.on('tab(docDemoTabBrief)', function(data){
        // console.log(this); //当前Tab标题所在的原始DOM元素
        // console.log(data.index); //得到当前Tab的所在下标
        // console.log(data.elem); //得到当前的Tab大容器
        // console.log($('.layui-tab-item')[data.index]);
        // console.log(data.index);
        ($('.layui-tab-item')[data.index]).innerHTML = '\n' +
            '<div style="margin: 20px 30px">\n'+
            '<table class="layui-table" style="table-layout: fixed">\n'+
            '<colgroup>\n'+
            '<col width="5%">\n'+
            '<col width="12%">\n'+
            '<col width="12%">\n'+
            '<col width="15%">\n'+
            '<col width="10%">\n'+
            '<col width="5%">\n'+
            '<col width="5%">\n'+
            '<col width="5%">\n'+
            '<col width="10%">\n'+
            '<col width="15%">\n'+
            '</colgroup>\n'+
            '<thead>\n'+
            '<tr>\n'+
            '<th style="text-align: center; word-wrap: break-word;">序号</th>\n'+
            '<th style="text-align: center; word-wrap: break-word;">名称</th>\n'+
            '<th style="text-align: center; word-wrap: break-word;">描述</th>\n'+
            '<th style="text-align: center; word-wrap: break-word;">资源</th>\n'+
            '<th style="text-align: center; word-wrap: break-word;">答案</th>\n'+
            '<th style="text-align: center; word-wrap: break-word;">题目分值</th>\n'+
            '<th style="text-align: center; word-wrap: break-word;">附加分</th>\n'+
            '<th style="text-align: center; word-wrap: break-word;">降分浮动</th>\n'+
            '<th style="text-align: center; word-wrap: break-word;">作者</th>\n'+
            '<th style="text-align: center; word-wrap: break-word;">操作</th>\n'+
            '</tr>\n'+
            '</thead>\n'+
            '<tbody class="layui-text" id="problem'+ data.index +'">\n'+
            '</tbody>\n'+
            '</table>\n'+
            '</div>\n';
        index = data.index;
        fill_problems(data.index);
    });
});

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
    getProblemType();
    get_problems(0);
};

//获得题目列表
function get_problems(num){
    $.ajax({
        url : '../../../Question/listQuestion',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null) {
                problem_list = result.listQuestion;
                // console.log(problem_list);
                fill_problems(num);
            }
            else{
                layer.msg(result.message);
            }

        },
        error : function(){
            layer.msg("请求题目信息失败！");
        }
    });
}

function fill_problems(num){
    // console.log(num);
    if(num!=0) {
        id = 'problem' + index;
    }
    else{
        id = "problem0";
    }
    // console.log(id);
    var tbody = document.getElementById(id);
    $('tbody').html("");
    // console.log(tbody);
    var j = 0;
    for(var i = 0; i < problem_list.length; ++i){
        var problem0 = problem_list[i];
        if(problem0.questionTypeId !== question_type[num].questionTypeId){
            continue;
        }
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.style.textAlign = "center";
        td1.innerText = ++j;
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.style.textAlign = "center";
        td2.innerText = problem0.questionTitle;
        td2.style.wordWrap = "break-word";
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.style.textAlign = "center";
        td3.title = problem0.questionBody;
        td3.innerText = problem0.questionBody;
        td3.style.width = "12%";
        td3.style.whiteSpace = "nowrap";
        td3.style.textOverflow = "ellipsis";
        td3.style.overflow = "hidden";
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.style.textAlign = "center";
        td4.innerText = problem0.questionResource.substring((problem0.questionResource).lastIndexOf('/')+21);
        td4.style.wordWrap = "break-word";
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.style.textAlign = "center";
        td5.innerText = problem0.questionAnswer;
        td5.style.width = "12%";
        td5.style.whiteSpace = "nowrap";
        td5.style.textOverflow = "ellipsis";
        td5.style.overflow = "hidden";
        tr.appendChild(td5);

        var td8 = document.createElement('td');
        td8.style.textAlign = "center";
        td8.innerText = problem0.questionPoint;
        td8.style.wordWrap = "break-word";
        tr.appendChild(td8);

        var td9 = document.createElement('td');
        td9.style.textAlign = "center";
        td9.innerText = problem0.questionAdditional;
        td9.style.wordWrap = "break-word";
        tr.appendChild(td9);

        var td10 = document.createElement('td');
        td10.style.textAlign = "center";
        td10.innerText = problem0.questionDecrease;
        td10.style.wordWrap = "break-word";
        tr.appendChild(td10);


        var td6 = document.createElement('td');
        td6.style.textAlign = "center";
        td6.innerText = problem0.questionAuthor;
        td6.style.wordWrap = "break-word";
        tr.appendChild(td6);

        var td7 = document.createElement('td');

        var a1 = document.createElement('a');
        a1.id = "editProblem" + (i+1);
        a1.className = "layui-btn layui-btn-normal layui-btn-xs";
        var i1 = document.createElement('i');
        i1.className = "layui-icon layui-icon-edit";
        a1.appendChild(i1);
        a1.innerHTML = a1.innerHTML + "编辑";
        a1.onclick = edit_problem;
        td7.appendChild(a1);

        var a2 = document.createElement('a');
        a2.id = "delProblem" + (i+1);
        a2.className = "layui-btn layui-btn-danger layui-btn-xs";
        var i2 = document.createElement('i');
        i2.className = "layui-icon layui-icon-delete";
        a2.appendChild(i2);
        a2.innerHTML = a2.innerHTML + "删除";
        a2.onclick = del_problem;
        td7.style.textAlign = "center";
        td7.appendChild(a2);
        tr.appendChild(td7);

        tbody.appendChild(tr);
    }
}

function edit_problem(){
    problem_address = null;
    var tr = this.parentNode.parentNode;
    var title = tr.childNodes[1].innerText;
    // console.log(title);

    for(var i = 0; i < problem_list.length; ++i){
        if(problem_list[i].questionTitle === title){
            selected_problem = problem_list[i];
            break;
        }
    }
    var filename = selected_problem.questionResource.substring((selected_problem.questionResource).lastIndexOf('/')+21);
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['600px', '600px'],
        content:'<form class="layui-form" action="" style="margin:50px 0 0 5%; font-size:15px">\n' +
        '     <div class="layui-form-item">\n' +
        '         <label class="layui-form-label">题目名称</label>\n' +
        '         <div class="layui-input-block">\n' +
        '         <input type="text" id="problem_title" autocomplete="off" placeholder="请输入题目名称" required class="layui-input layui-disabled" disabled style="width: 50%;" value="'+ selected_problem.questionTitle +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
        '         </div>\n' +
        '     </div>\n' +
        '     <div class="layui-inline layui-form-item" style="margin-top:1%">\n' +
        '         <label class="layui-form-label">题目类型</label>\n' +
        '         <div class="layui-input-inline">\n' +
        '             <select name="modules">\n' +
        '                 <option value="">请选择</option>\n' +
        '             </select>\n' +
        '         </div>\n' +
        '     </div>\n' +
        '     <div class="layui-form-item" style="margin-top:1%">\n' +
        '         <label class="layui-form-label">题目描述</label>\n' +
        '         <div class="layui-input-block">\n' +
        '             <textarea class="tcp_content layui-textarea" placeholder="请输入题目描述，500字以内" style="width: 70%;" maxlength="500" \n' +
        '             onchange="textarea_fun()" onkeydown="textarea_fun()" onkeyup="textarea_fun()">'+selected_problem.questionBody+'</textarea>\n' +
        '             <span class="t_h" style="float: left; margin-left: 60%"><i>'+selected_problem.questionBody.length+'</i>/500</span>\n' +
        '         </div>\n' +
        '     </div>\n' +
        '     <div class="layui-form-item layui-upload" style="margin-top:1%">\n' +
        '         <label class="layui-form-label">题目资源</label>\n' +
        '         <button type="button" class="layui-btn layui-btn-normal" id="upload">\n' +
        '         <i class="layui-icon layui-icon-upload"></i>选择文件</button>\n' +
        '         <input class="layui-upload-file" type="file" accept="undefined" name="file">\n' +
        '         <span class="layui-inline layui-upload-choose">'+ filename +'</span>\n' +
        '     </div>\n' +
        '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
        '         <label class="layui-form-label">题目答案</label>\n' +
        '         <div class="layui-input-block">\n' +
        '         <input type="text" id="problem_answer" autocomplete="off" placeholder="请输入题目答案" required value="'+ selected_problem.questionAnswer +'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
        '         </div>\n' +
        '     </div>\n' +
        '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
        '         <label class="layui-form-label">题目作者</label>\n' +
        '         <div class="layui-input-block">\n' +
        '         <input type="text" id="problem_author" autocomplete="off" placeholder="请输入题目作者" required value="'+ selected_problem.questionAuthor +'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
        '         </div>\n' +
        '     </div>\n' +
        '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
        '        <label class="layui-form-label">题目难度</label>\n' +
        '        <div class="layui-input-block" style="width:30%">\n' +
        '           <input type="number" id="problem_level" autocomplete="off" required value="'+ selected_problem.questionLevel+'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
        '        </div>\n' +
        '     </div>\n' +
        '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
        '        <label class="layui-form-label">题目分值</label>\n' +
        '        <div class="layui-input-block" style="width:30%">\n' +
        '           <input type="number" id="problem_sorce" autocomplete="off" required value="'+ selected_problem.questionPoint+'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
        '        </div>\n' +
        '     </div>\n' +
        '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
        '        <label class="layui-form-label">附加分</label>\n' +
        '        <div class="layui-input-block" style="width:30%">\n' +
        '           <input type="number" id="problem_additional_sorce" autocomplete="off" required value="'+ selected_problem.questionAdditional +'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
        '        </div>\n' +
        '     </div>\n' +
        '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
        '        <label class="layui-form-label">降分幅度</label>\n' +
        '        <div class="layui-input-block" style="width:30%">\n' +
        '           <input type="number" id="problem_sorce_float" autocomplete="off" required value="'+ selected_problem.questionDecrease +'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
        '        </div>\n' +
        '     </div>\n' +
        '</form>' +
        '<script>\n' +
        '    layui.use(\'upload\', function() {\n' +
        '        var $ = layui.jquery, upload = layui.upload;\n' +
        '        //普通图片上传使用layui上传图片\n' +
        '        uploadInst = upload.render({\n' +
        '            elem: \'#upload\'\n' +
        '            , url: \'../../../file/upload\'\n' +
        '            , accept : \'file\'\n' +
        '            , multiple : false\n' +
        '            , auto : false\n' +
        '            , field : \'file\'\n' +
        '            , choose: function (obj) { +\n' +
        '                //预读本地文件示例，不支持ie8 +\n' +
        '                obj.preview(function (index, file, result) {\n' +
        '                    problem_address = file.name;\n' +
        '                    var span = document.createElement("span");\n' +
        '                    span.className = "layui-inline layui-upload-choose";\n' +
        '                    span.innerText=file.name;\n' +
        '                    document.getElementsByClassName("layui-upload")[0].appendChild(span);\n' +
        '                });\n' +
        '            }\n' +
        '            , done: function (res) {\n' +
        '                //如果上传失败\n' +
        '                if (res.code > 0) {\n' +
        '                    return layer.msg(\'上传失败\');\n' +
        '                }\n' +
        '                //上传成功\n' +
        '                else\n' +
        '                {\n' +
        '                    problem_address = res.src;\n' +
        '                    update_Problem(selected_problem, problem_type, problem_level, problem_description, problem_address, problem_answer, problem_author, problem_sorce, problem_additional_sorce, problem_sorce_float);\n' +
        '                }\n' +
        '            }\n' +
        '            , error: function () {\n' +
        '                //演示失败状态，并实现重传\n' +
        '                var demoText = $(\'#demoText\');\n' +
        '                demoText.html(\'<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>\');\n' +
        '                demoText.find(\'.demo-reload\').on(\'click\', function () {\n' +
        '                    uploadInst.upload();\n' +
        '                });\n' +
        '        }\n' +
        '        });\n' +
        '    });\n' +
        '    layui.use(\'form\', function(){\n' +
        '                var form = layui.form;\n' +
        '                fillProblemTypeSelect('+selected_problem.questionTypeId+');\n' +
        '                form.render();\n' +
        '                form.verify();\n' +
        '            });\n' +
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
        title: "更新题目信息",
        btn1 : function () {
            check_problem(selected_problem);
            return false;
        },
        btn2 : function () {
            problem_address = null;
            layer.closeAll();
        }
    });
}
//请求可添加题目的题目类型名称
function getProblemType(){
    $.ajax({
        url : '../../../Questiontype/listQuestiontype',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.message == null) {
                question_type = result.listQuestiontype;
                // console.log(problem_type);
                fillTab();
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
function fillTab() {
    $('.layui-tab-title')[0].children[0].innerText = question_type[0].questionType;
    for(var i=1;i<question_type.length;++i){
        var li = document.createElement("li");
        li.innerText = question_type[i].questionType;
        $('.layui-tab-title')[0].append(li);
        var div = document.createElement('div');
        div.className = "layui-tab-item";
        $('.layui-tab-content')[0].append(div);
    }

}
function fillProblemTypeSelect(id){
    // getProblemType();
    var select = document.getElementsByName("modules")[0];
    select.innerHTML = "";
    var option0 = document.createElement("option");
    option0.value = "";
    option0.innerText = "请选择";
    select.appendChild(option0);
    // console.log(id);
    for(var i = 0; i < question_type.length; ++i){
        var option = document.createElement("option");
        option.value = question_type[i].questionTypeId;
        option.innerText = question_type[i].questionType;

        select.appendChild(option);if(id === question_type[i].questionTypeId){
            option.selected = true;
        }
    }
}
function check_problem(selected_problem){
    problem_title = $("#problem_title").val();
    problem_type = $('.layui-input.layui-unselect').val();
    problem_description = $(".tcp_content").val();
    problem_answer = $("#problem_answer").val();
    problem_author = $("#problem_author").val();
    problem_sorce = $("#problem_sorce").val();
    problem_level = $("#problem_level").val();
    problem_additional_sorce = $("#problem_additional_sorce").val();
    problem_sorce_float = $("#problem_sorce_float").val();
    //将题目类型的中文说明转换为对应的数字
    for(var k = 0; k < question_type.length; ++k){
        if(question_type[k].questionType === problem_type){
            problem_type = question_type[k].questionTypeId;
        }
    }
    if(problem_title === "" || problem_title == null){
        layer.tips("题目名称不能为空！", "#problem_title");
    }
    else if(problem_type === "" || problem_type == null || problem_type === 0){
        layer.tips("题目类型不能为空！", ".layui-select-title");
    }
    else if(problem_description === "" || problem_description == null){
        layer.tips("题目描述不能为空！", ".tcp_content ");
    }
    else if(problem_answer === "" || problem_answer == null){
        layer.tips("题目答案不能为空！", "#problem_answer");
    }
    else if(problem_author === "" || problem_author == null){
        layer.tips("题目作者不能为空！", "#problem_author");
    }
    else if(problem_address != null && problem_address !== ""){
        uploadInst.upload();
    }
    else{
        update_Problem(selected_problem, problem_type, problem_level, problem_description, selected_problem.questionResource, problem_answer, problem_author, problem_sorce, problem_additional_sorce, problem_sorce_float);
    }
}

function update_Problem(selected_problem, problem_type, problem_level, problem_description, problem_address, problem_answer, problem_author, problem_sorce, problem_additional_sorce, problem_sorce_float){
    var mydata = {"questionId":selected_problem.questionId, "questionTitle" : selected_problem.questionTitle, "questionTypeId" : parseInt(problem_type), "questionBody" : problem_description, "questionResource" : problem_address,
        "questionAnswer" : problem_answer,  "questionAuthor" : problem_author, "questionPoint" : parseInt(problem_sorce),
        "questionAdditional" : parseInt(problem_additional_sorce),
        "questionDecrease" : parseFloat(problem_sorce_float),"questionLevel" : parseInt(problem_level)};
    // console.log(mydata);
    $.ajax({
        url : '../../../Question/updateQuestion',
        data : mydata,
        type : 'post',
        scriptCharset : 'utf-8',
        success : function(result){
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
                });
                get_problems(index);
            }
            else {
                layer.msg(result.message);
            }
        },
        error : function(){
            layer.msg("请求更新题目接口接口失败");
        }
    });
}

function del_problem(){
    var tr = this.parentNode.parentNode;
    var title = tr.childNodes[1].innerText;
    // console.log(title);
    var selected_problem;
    for(var i = 0; i < problem_list.length; ++i){
        if(problem_list[i].questionTitle == title){
            selected_problem = problem_list[i];
            // console.log(selected_problem);
            break;
        }
    }
    layer.open({
        type: 1,
        offset: 'auto', 
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定删除题目吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除题目",
        btn1 : function () {
            delProblem(selected_problem);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delProblem(obj){
    $.ajax({
        url : '../../../Question/deleteQuestion',
        data : obj,
        scriptCharset : "utf-8",
        type : "post",
        success : function(result){
            if(result.message == null){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "删除成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                get_problems(index);
            }
            else {
                layer.msg(result.message);
            }
        },
        error : function(){
            layer.msg("请求接口失败");
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