/**
 * author: 关宁
 * date: 2019.05.20
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });

    $(document).on('click', '.layui-tab-title li', function (even) {
        $('.layui-tab-content ul').html('<div data-loader="circle" class="loading list-loading"></div>');

        ClassWebFirst(even.currentTarget.dataset.id);
        GetWebServe(even.currentTarget.dataset.id, '');
    })

    GeneralPart(1);
    ClassWebFirst('');
    GetWebServe('', '');
})

function notOpen () {
    layer.open({
        title: '温馨提示',
        skin: 'my-skin',
        content: '此功能暂未开放！'
    });
    return false
}

// 获取轮播图模块数据
var GetBanner = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.applocation.Banner
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            var Html = '';

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    item.url = '../bannerDetails/bannerDetails.html?id=' + item.url + '&type=pxhd&hot=' + iD.Module().HotID
                }

                // 创建轮播图元素节点
                Html += '<div><a href="'+ item.url +'"><img src="'+ request.imagesUrl + item.img +'"/></a></div>'
            })

            $('#banner div').append(Html);

            // 实例化轮播图
            layui.use('carousel', function(){
                var carousel = layui.carousel;
                carousel.render({
                    elem: '#banner',
                    width: '100%',
                    arrow: 'always',
                    anim: 'fade',
                    interval: '3000'
                });
            });
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(GetBanner);

// 获取申报流程模块数据
var GetApplication = function () {
    request.url = request.Url + request.declare
    request.method = "GET"

    request.data = {
        page: 1,
        size: 10
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, index) {
                item.logo = request.imagesUrl + item.logo
            })
            data.data.content.splice(7);
             // 为页面模板赋值数据
             var Industry = template('process-cell', data.data);
             $('.process-main ul').html(Industry);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(GetApplication);

// 获取一级分类
var ClassWebFirst = function () {
    request.url = request.Url + request.Class
    request.method = "GET"

    request.data = {
        page: 1,
        size: 10
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, index) {
                item.logo = request.imagesUrl + item.logo
            })

            // 为页面模板赋值数据
            var Industry = template('tab-cell', data.data);
            $('.layui-tab-title').append(Industry);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(ClassWebFirst);

// 获取二级分类
var ClassWebFirst = function (index) {
    request.url = request.Url + request.secondClass
    request.method = "GET"

    request.data = {
        page: 1,
        size: 1000,
        firstTypeId: index
    }

    if (request.data.firstTypeId === '') {
        delete request.data['firstTypeId']
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            // 为页面模板赋值数据
            var Industry = template('tabs-cell', data.data);
            $('.layui-tab-content ul').html(Industry);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取服务列表
var GetWebServe = function (index, item) {
    request.url = request.Url + request.webserve
    request.method = "GET"

    request.data = {
        page: 1,
        size: 12,
        firstTypeId: index,
        secondTypeId: item,
        status: '1'
    }
    if (request.data.secondTypeId == '') {
        delete request.data['secondTypeId']
    }
    if (request.data.firstTypeId === '') {
        delete request.data['firstTypeId']
    }

    if (request.data.secondType === '') {
        delete request.data['secondType']
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, index) {
                item.logo = request.imagesUrl + item.logo

                item.charge = changeMoney(item.charge)
            })

           //  为页面模板赋值数据
            var Industry = template('li-cell', data.data);
            $('.g_ul').html(Industry);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

var levelClassification = function (event) {
    $(event).addClass('color');
    $(event).siblings().removeClass('color');

    GetWebServe('', event.getAttribute('data-id'));
}

function MoveEvent () {
    window.location.href = 'processList/processList.html'
}

function servicehall () {
    window.location.href = 'servicehall/servicehall.html'
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
                        window.location.href = '../admin/admin.html?level=' + window.btoa('Secondlevel')
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
                        window.location.href = '../admin/admin.html?level=' + window.btoa('Secondlevel')
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