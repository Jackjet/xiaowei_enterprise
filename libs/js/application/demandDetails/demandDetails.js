/**
 * author: 关宁
 * date: 2019.05.16
 */

// 实例化创建请求方式
var request = new Call_Request();

var modules = {
    userInfo: '',
    userModule: '',
}

$(function () {
    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });
    
    if (classModule.session() === '') {
        console.log('暂未登录');
    } else {
        request.url = request.Url + request.admin
        request.method = "GET"

        request.token = {
            'Authorization': 'token ' + classModule.session().token,
        }

        request.data = {
            id: classModule.session().id
        }

        request.redata = function (data) {
            if (data.code === 0 ) {
                layer.msg(data.msg);
            } else {
                if (data.data.status === '0' && data.data.enterpriseApproval !== '0') {
                    modules.userInfo = '0'
                }

                if (data.data.status === '0' && data.data.upcloudApproval !== '0' || data.data.status === '1' && data.data.upcloudApproval !== '0') {
                    modules.userModule = '1'
                }
            }
        }

        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }

    request.url = request.Url + request.demandBy
    request.method = "GET"

    request.data = {
        id:GetQueryString('id')
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            data.data.userLogo = request.imagesUrl + data.data.userLogo
            data.data.IfLogin = classModule.session();

            var Industry = template('list-cell', data.data);
            $('.DetailsMain').html(Industry);


            $('.content').html(data.data.content);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();

    GeneralPart(2);
})


var webUser = function () {  
    request.url = request.Url + request.webUser

    request.data = {
        page:1,
        size: 3,
        isRecommend: '1'
    }

    request.method = "GET"

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, value) {
                item.logo = request.imagesUrl + item.logo
            })
            console.log(data.data);
            var latest = template('lists-cell', data.data);
            $('.content_right ul').html(latest);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(webUser);

function signUp () {
    if (classModule.session() === '') {
        layer.msg('当前操作需要登录后进行！');
        return false;
    }

    if (modules.userInfo === '0' && modules.userModule === '1') {
        layer.msg('当前企业信息未认证，请认证企业信息后再提交！');
        return false;
    }

    if (modules.userInfo === '1') {
        layer.msg('当前企业上云信息未认证，请认证企业上云信息后购买！');
        return false;
    }

    request.url = request.Url + request.signUp1

    request.data = JSON.stringify({
        id: QueryString('id')
    })

    request.method = "PUT"

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            layer.msg('参与报名成功')
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

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
                        window.location.href = '../../../view/page/admin/admin.html?level=' + window.btoa('Secondlevel')
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