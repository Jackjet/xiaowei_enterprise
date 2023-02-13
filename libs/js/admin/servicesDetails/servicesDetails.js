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
    
    request.url = request.Url + request.userServeByid
    request.method = "GET"

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.data = {
        id: QueryString('id')
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {
            data.data.logo = request.imagesUrl + data.data.logo
            data.data.charge = changeMoney(data.data.charge)

            var Html = template("user-cell", data.data);
            $('.templet').html(Html);

            $('.introduce_info').html(data.data.content);

            findRecordsById(1, 10);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
})

var findRecordsById = function (page, size) {
    request.url = request.Url + request.findRecordsById
    request.method = "GET"

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.data = {
        id: QueryString('id'),
        page: page,
        size: size,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {
            var Html = template("tab-cell", data.data);
            $('.tabas ul').html(Html);

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
                    limit: 10,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if (!first) {
                            $('.tabas ul').html('<div data-loader="circle" class="loading training-loading"></div>');
                            findRecordsById(obj.curr, obj.limit);
                        }
                    }
                })
            })

        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

function PreviousPage () {
    if (QueryString('type') === '0') {
        window.location.href = '../pubService/service.html'
    } else {
        window.location.href = '../myService/service.html'
    }
}