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

    request.url = request.Url + request.userServe
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
                index.charge = changeMoney(index.charge)
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

            var Html = template("item-cell", data.data);
            $('.templet ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

function PutInfo (event) {
    parent.window.location.href = '../../application/pubService/pubService.html?id=' + event.getAttribute('data-id')
}


function Reject (date) {

    request.url = request.Url + request.userServe
    request.method = "GET"

    request.data = {
       id: classModule.session().id
    }

    request.token = {
        'Authorization': 'token ' +  classModule.session().token
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            data.data.content.map(function (item, index) {
                if (item.id === date.getAttribute('data-id')) {
                    parent.layer.open({
                        type: 1,
                        title: '驳回原因',
                        closeBtn: 0,
                        skin: 'layui_Popup',
                        shadeClose: true,
                        content: item.remark
                    });
                }
            })
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}