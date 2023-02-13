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
})


var GetUesradmin = function () {
    request.url = request.Url + request.userOrderiD
    request.method = "GET"

    request.data = {
        id: window.parent.document.getElementById("iframe").getAttribute('src').split('=')[1],
    }

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            data.data.prodLogo = request.imagesUrl + data.data.prodLogo
            data.data.money = changeMoney(data.data.money)

            var Html = template("user-cell", data.data);
            $('.status').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}; 

addLoadEvent(GetUesradmin);

function returnPage () {
    var Parent = window.parent.document.getElementById("iframe");
    Parent.setAttribute('src', 'myorder/order.html');
}