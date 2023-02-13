/**
 * author: 关宁
 * date: 2019.05.16
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });
    
    GeneralPart(2);
})


var webUser = function () {
    request.url = request.Url + request.recommend

    request.data = {
        page:1,
        size: 8,
        recommendId: iD.Hot().rmth
    }

    request.method = "GET"

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            data.data.content.map(function (item, value) {
                item.logo = request.imagesUrl + item.logo
            })

            var latest = template('list-cell', data.data);
            $('.DetailsMain_right').html(latest);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(webUser);

var expertfindByid = function () {
    request.url = request.Url + request.expertfindByid

    request.data = {
        id: QueryString('id')
    }

    request.method = "GET"

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            data.data.icon = request.imagesUrl + data.data.icon
            data.data.IfLogin = classModule.session()
            var latest = template('listP-cell', data.data);
            $('.DetailsMain').html(latest);

            $('.resume').html(data.data.resume);
            $('.research').html(data.data.research);
            $('.successfulCase').html(data.data.successfulCase)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(expertfindByid);


// 点击发布服务的验证
function publicService(tag) {
    if (classModule.session() === '') {
        layer.msg('当前操作需要登录后进行！');
        return false;
    }else{
        request.url = request.Url + request.admin
        request.method = "GET"

        request.token = {
            'Authorization': 'token ' + classModule.session().token,
        }
        request.data = {
            id: classModule.session().id
        }
        request.redata = function (data) {

            if(data.data.status === '0'){

                layer.open({
                    title: '温馨提示',
                    skin: 'my-skin',
                    content: '当前企业信息未认证，请认证企业信息后再提交！',
                    btn: ['立即认证', '取消'],
                    btn1: function (layero) {
                        window.location.href = '../../admin/admin.html?level=' + window.btoa('Secondlevel')
                    }
                });

                return false;
            }else{
                if(tag == "1"){
                    window.location.href = "pubService/pubService.html"
                }else{
                    window.location.href="../pubService/pubService.html"
                }

            }
        }
        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }
}


// 发布需求
function publicDemand(tag) {
    if (classModule.session() === '') {
        layer.msg('当前操作需要登录后进行！');
        return false;
    }else{
        request.url = request.Url + request.admin
        request.method = "GET"

        request.token = {
            'Authorization': 'token ' + classModule.session().token,
        }
        request.data = {
            id: classModule.session().id
        }
        request.redata = function (data) {

            if(data.data.status === '0'){
                layer.open({
                    title: '温馨提示',
                    skin: 'my-skin',
                    content: '当前企业信息未认证，请认证企业信息后再提交！',
                    btn: ['立即认证', '取消'],
                    btn1: function (layero) {
                        window.location.href = '../../admin/admin.html?level=' + window.btoa('Secondlevel')
                    }
                });
            
                return false;
            } else {
                if (tag == "1") {
                    window.location.href = "releaseDemand/releaseDemand.html"
                } else {
                    window.location.href = "../releaseDemand/releaseDemand.html"
                }
            }
        }
        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }
}