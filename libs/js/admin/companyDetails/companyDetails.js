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
        element.render();
    });

    GetActivity('', 1, 5);

    $('.search').click(function () {
        $('.templet ul').html('<div data-loader="circle" class="loading training-loading"></div>');

        GetActivity($('#layuisearch').val(), 1, 5)
    })
})


var GetActivity = function (name, page, size) {

    request.url = request.Url + request.userDemandfindPlayer
    request.method = "GET"

    request.token = {
        'Authorization': 'token ' +  classModule.session().token
    }

    if (QueryString('index') === '1') {
        request.data = {
            page: page,
            size: size,
            userName: name,
            isBid: '1',
            relateId: QueryString('id')
        }    
    } else {
        request.data = {
            page: page,
            size: size,
            userName: name,
            relateId: QueryString('id')
        }    
    }

    if (request.data.name === '') {
        delete request.data.name
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {

            data.data.content.map(function (index, item) {
                index.userLog = request.imagesUrl + index.userLog
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
                    limit: 5,
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

            var Html = template("item-cell", data.data);
            $('.templet ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 指定企业
var enterprise = function (e) {
    request.url = request.Url + request.remove
    request.method = "PUT"

    request.token = {
        'Authorization': 'token ' +  classModule.session().token
    }

    request.data = JSON.stringify({
        isBid: '1',
        id: e.getAttribute('data-id')
    })

    request.redata = function (data) {
        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {
            parent.layer.msg(data.msg);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

var enterpriseRemove = function (e) {
    request.url = request.Url + request.remove
    request.method = "PUT"

    request.token = {
        'Authorization': 'token ' +  classModule.session().token
    }

    request.data = JSON.stringify({
        isBid: '0',
        id: e.getAttribute('data-id')
    })

    request.redata = function (data) {
        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {
            parent.layer.msg(data.msg);
            $(e).parent().parent().remove()
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}


function PreviousPage () {
    if (QueryString('type') === '0') {
        window.location.href = '../companyDetails/companyDetails.html'
    } else {
        window.location.href = '../companyDetails1/companyDetails.html'
    }
}