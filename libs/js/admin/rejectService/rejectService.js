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
                if (item.id == QueryString('id')) {
                    $('.templet span').html(item.remark);
                }
            })
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
})