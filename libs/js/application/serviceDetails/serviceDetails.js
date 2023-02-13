/**
 * author: 关宁
 * date: 2019.05.20
 */

// 实例化创建请求方式
var request = new Call_Request();

var Payment = {
    money: '',
    prodLogo: '',
    prodName: '',
    userInfo: '',
    userModule: '',
}

$(function () {
    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;
        element.render();
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
                    Payment.userInfo = '0'
                }

                if (data.data.status === '0' && data.data.upcloudApproval !== '0' || data.data.status === '1' && data.data.upcloudApproval !== '0') {
                    Payment.userModule = '1'
                }
            }
        }

        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }

    GeneralPart(2);
    ServiceRecord(1, 8)
})

// 获取数据详细信息
var GetfindRecordsById = function () {
    request.url = request.Url + request.serveid
    request.method = "GET"

    request.data = {
        id: GetQueryString('id')
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            Payment.prodLogo =  data.data.logo
            Payment.money = changeMoney(data.data.charge)

            data.data.logo = request.imagesUrl + data.data.logo
            data.data.charge = changeMoney(data.data.charge)

            Payment.prodName = data.data.name

            // 为页面模板赋值数据
            data.data['IfLogin'] = classModule.session()
            var Industry = template('USER-cell', data.data);
            $('.BuyService').html(Industry);

            var Html = template('service-cell', data.data);
            $('.inofright .one').html(Html);
            $('.content').html(data.data.content);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(GetfindRecordsById);

function notOpen () {
    layer.open({
        title: '温馨提示',
        skin: 'my-skin',
        content: '此功能暂未开放！'
    });
    return false
}

var GetfindRecords = function () {
    request.url = request.Url + request.findWebUserById
    request.method = "GET"

    request.data = {
        id: GetQueryString('id')
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.logo = request.imagesUrl + data.data.logo

            // 为页面模板赋值数据
            var Industry = template('info-cell', data.data);
            $('.detailed').html(Industry);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(GetfindRecords);

// 获取服务记录
var ServiceRecord = function (page, size) {
    request.url = request.Url + request.findRecordsById
    request.method = "GET"

    request.data = {
        id: GetQueryString('id'),
        page: page,
        size: size
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.logo = request.imagesUrl + data.data.logo
            
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
                    limit: 8,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {

                        // 避免首次执行 死循环
                        if(!first) {
                            ServiceRecord( obj.curr, obj.limit);
                        }
                    }
                })
            })

            // 为页面模板赋值数据
            var Industry = template('service1-cell', data.data);
            $('.two .tab_item').html(Industry);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

var BuyClickPayment = function () {
    if (classModule.session() === '') {
        layer.msg('当前操作需要登录后进行！');
        return false;
    } else {
        if (Payment.userInfo === '0' && Payment.userModule === '1') {
            layer.msg('当前企业信息未认证，请认证企业信息后购买！');
            return false;
        }

        if (Payment.userInfo === '1') {
            layer.msg('当前企业上云信息未认证，请认证企业上云信息后购买！');
            return false;
        }

        window.location.href = '../checkOrder/order.html?id=' + GetQueryString('id') + '&money=' + Payment.money + '&prodLogo=' + encodeURI(encodeURI(Payment.prodLogo)) + '&prodName=' + encodeURI(encodeURI(Payment.prodName))
    }
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
