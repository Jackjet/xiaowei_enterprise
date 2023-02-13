/**
 * author: 关宁
 * date: 2019.05.19
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
    // 实例化
    layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });

    GetActivity('', 1, 4);

    $('.search').click(function () {
        $('.templet ul').html('<div data-loader="circle" class="loading training-loading"></div>');

        GetActivity($('#layuisearch').val(), 1, 4)
    })
})


var GetActivity = function (name, page, size) {
    request.url = request.Url + request.userActivityfindAll
    request.method = "GET"

    request.token = {
        'Authorization': 'token ' +  classModule.session().token
    }

    request.data = {
        page: page,
        size: size,
        name: name
    }

    if (request.data.name === '') {
        delete request.data.name
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {

            data.data.content.map(function (index, item) {
                index.logo = request.imagesUrl + index.logo
            })

            // 实例化分页模块
            layui.use('laypage', function(){
                var laypage = layui.laypage;
                /**
                 * @param elem 元素节点
                 * @param count 分页总页数
                 * @param theme 按钮颜色
                 * @param layout 分页组件
                 */
                laypage.render({
                    elem: 'laypage',
                    count: data.data.totalElements,
                    theme: '#c10000',
                    curr: page,
                    limit: 4,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if (!first) {
                            $('.templet ul').html('<div data-loader="circle" class="loading training-loading"></div>');
                            GetActivity('', obj.curr, obj.limit);
                        }
                    }
                })
            })

            var Html = template("user-cell", data.data);
            $('.templet ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

function reedit (event) {
    parent.window.location.href = '../../training/launchEvent/launchEvent.html?id=' + event.getAttribute('data-id')
}

// 查看驳回原因 以模态框形式定义展示
var Checkrejection = function (e) {
    var Data_ID = e.getAttribute('data-id');

    request.url = request.Url + request.userActivityByid
    request.method = "GET"

    request.token = {
        'Authorization': 'token ' +  classModule.session().token
    }

    request.data = {
        id: Data_ID
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {
            /**
             * @param type  弹出层动态样式标识.
             * @param title 是否显示弹出层标题.
             * @param closeBtn  是否显示右上角关闭按钮
             * @param shadeClose  点击空白是否关闭弹出层
             */
            
             parent.layer.open({
                type: 1,
                title: '驳回原因',
                closeBtn: 0,
                skin: 'layui_Popup',
                shadeClose: true,
                content: data.data.remark
            });
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}