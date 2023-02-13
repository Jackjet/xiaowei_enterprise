/**
 * author: 关宁
 * date: 2019.05.12
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {

    // 创建导航栏模块
    var dataStream = {
        array: [{
            city: '',
            this: 'layui-this',
            title: '首页',
            url: 'javascript:;'
        },
        {
            city: 'zxdt',
            this: '',
            title: '最新动态',
            url: 'subColumn/subColumn.html?type=' + window.btoa('zxdt') + '&id=' + window.btoa(iD.enterprise().column.dynamic) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'yffs',
            this: '',
            title: '云服务',
            url: 'service/service.html?type=' + window.btoa('yffs') + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'dxal',
            this: '',
            title: '典型案例',
            url: 'subColumn/subColumn.html?type=' + window.btoa('dxal') + '&id=' + window.btoa(iD.enterprise().column.dxal) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'syqy',
            this: '',
            title: '上云企业',
            url: 'cloudService/cloudService.html?type=' + window.btoa('syqy') + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream)
    $('.layui-nav').html(Navigation)









    
    // 获取云服务分类切换模块
    $(document).on('click', '.recomService li', function (even) {
        $('.main_content').html('<div data-loader="circle" class="loading main-loading"></div>');
        CloudServices(even.target.dataset.id);
    })

    // 切换推荐服务商 销售TOP5
    $('.Service li').click(function (even) {
        $('.Service .layui-tab-content').html('<div data-loader="circle" class="loading Service-loading"></div>');
        SwitchModule(even.target.dataset.id);
    })

    $(document).on('click', '.CludeEnterprise li', function () {
        // 取消事件冒泡
        event.stopPropagation();
    })

    SwitchModule('0');
    CloudServices('');
    GeneralPart(1);
})

function JumpUrldynamic (item) {
    var newVid = null;

    if (item === 'zxdt') {
        newVid = iD.enterprise().column.dynamic
    }

    if (item === 'dxal') {
        newVid = iD.enterprise().column.dxal
    }

    if (item === 'yffs') {
        newVid = null;
        window.location.href = 'service/service.html?type=' +  window.btoa(item) + '&level=' + window.btoa('Levelthree')
        return false;
    }

    if (item === 'syqy') {
        window.location.href = 'cloudService/cloudService.html?type=' +  window.btoa(item) + '&level=' + window.btoa('Levelthree')
        return false;
    }

    window.location.href = 'subColumn/subColumn.html?type=' +  window.btoa(item) + '&id=' +  window.btoa(newVid) + '&hot' +  window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
}

// 获取轮播图模块数据
var GetBanner = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.enterprise.Banner
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            var Html = '';
            
            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    // 自定义URL参数跳转
                    item.url = '../bannerDetails/bannerDetails.html?id=' + window.btoa(item.url) + '&type=' + window.btoa('qysy') + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }

                // 创建轮播图元素节点
                Html += '<div>\
                    <a href="'+ item.url +'"><img src="'+ request.imagesUrl + item.img +'"/></a>\
                </div>'
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
};
addLoadEvent(GetBanner);

// 获取子模块轮播图
var ChildBanner = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.enterprise().childBanner
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            var Html = '';

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    // 自定义URL参数跳转
                   item.url = '../bannerDetails/bannerDetails.html?id=' + window.btoa(item.url) + '&type='+ window.btoa('qysy') + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }

                // 创建轮播图元素节点
                Html += '<div>\
                    <a href="'+ item.url +'"><img src="'+ request.imagesUrl + item.img +'"/></a>\
                </div>'
            })

            $('#bannerSlisp div').append(Html);

            // 实例化轮播图
            layui.use('carousel', function(){
                var carousel = layui.carousel;
                carousel.render({
                    elem: '#bannerSlisp',
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
addLoadEvent(ChildBanner);

// 获取最新动态模块
var LatestDevelopment = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.enterprise().latest,
        page: 1,
        size: 3
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            for (var i = 0; i < data.data.content.length; i++) {
                data.data.content[i].image = request.imagesUrl + data.data.content[i].img
               
                if (data.data.content[i].url.substr(0,5).toLowerCase() === 'https' || data.data.content[i].url.substr(0,5).toLowerCase() === 'http:') {
                    // 重新赋值跳转URL
                    data.data.content[i].HttpUrl = data.data.content[i].url
                } else {
                    data.data.content[i].HttpUrl = 'article/article.html?id=' + window.btoa(data.data.content[i].url) + '&type=' + window.btoa('zxdt') + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            }

            // 为页面模板赋值轮播图数据
            var latest = template('latest-cell', data.data);
            $('.latest').html(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(LatestDevelopment);

// 获取云服务商分类模块数据
var CloudService = function () {
    request.url = request.Url + request.ServicesType
    request.method = "GET"

    request.data = {
        recommendId: iD.enterprise().latest,
        size: 1000,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            // 为页面模板赋值轮播图数据
            var latest = template('Service-cell', data.data);
            $('.recomService').append(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(CloudService);

var CloudServices = function (index) {
    request.url = request.Url + request.cloudServices
    request.method = "GET"

    request.data = {
        cloudServicesTypeId: index,
        size: 18
    }

    if (request.data.cloudServicesTypeId === '') {
        delete request.data.cloudServicesTypeId
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            for (var i = 0; i < data.data.content.length; i++) {
                data.data.content[i].logoImg = request.imagesUrl + data.data.content[i].logo
                data.data.content[i].HttpUrl = 'buyService/buyService.html?id=' +  window.btoa(data.data.content[i].id) + '&type=' +  window.btoa('yffs') + '&level=' + window.btoa('Levelthree')
            }

            // 为页面模板赋值轮播图数据
            var latest = template('main-cell', data.data);
            $('.main_content').html(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取典型案例模块列表数据
var CasesType = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.enterprise().cases,
        size:5
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            for (var i = 0; i < data.data.content.length; i++) {
                data.data.content[i].http = request.imagesUrl

                if (data.data.content[i].url.substr(0,5).toLowerCase() === 'https' || data.data.content[i].url.substr(0,5).toLowerCase() === 'http:') {
                    // 重新赋值跳转URL
                    data.data.content[i].HttpUrl = data.data.content[i].url
                } else {
                    data.data.content[i].HttpUrl = 'article/article.html?id=' + window.btoa(data.data.content[i].url) + '&type=' + window.btoa('dxal') + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            }

            // 为页面模板赋值轮播图数据
            var latest = template('typical-cell', data.data);
            $('.typical').html(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(CasesType);

// 获取推荐服务商模块初始化数据
var SwitchModule = function (event, index) {
    if (event === '0') {
        request.url = request.Url + request.cloudUser
        
        request.data = {
            isRecommend: 1,
            size: 2
        } 
    } else {
        request.url = request.Url + request.topFive
        request.data = {}
    }

    request.method = "GET"

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            if (!data.data.content) {
                data = {
                    data: {
                        content: data.data
                    }
                }
            }

            for (var i = 0; i < data.data.content.length; i++) {
                var Data = data.data.content[i];
                Data.logoImg = request.imagesUrl + Data.logo
            }

            if (event === '0') {
                data.data.classType = 1;
            } else {
                data.data.classType = 2;
                for (var i = 0; i < data.data.content.length; i++) {
                    data.data.content[i].topImg = 'top' + ( i + 1 );
                    data.data.content[i].lineWidth = (data.data.content[i].num / data.data.content[0].num) * 100;
                }
            }

            // 为页面模板赋值数据
            var latest = template('Cservice-cell', data.data);
            $('.Service_tab').html(latest);

            layui.use('element', function(){
                var element = layui.element;
                element.render()
            });
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取上云企业模块数据
var CludeEnterprise = function () {
    request.url = request.Url + request.cloudRecord
    request.method = "GET"

    request.data = {
        page: 1,
        size: 10
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            for (var i = 0; i < data.data.content.length; i++) {
                var Data = data.data.content[i];
                Data.logoImg = request.imagesUrl + Data.userLogo
            }

            // 为页面模板赋值轮播图数据
            var latest = template('CludeEnterprise-cell', data.data);
            $('.CludeEnterprise').html(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(CludeEnterprise);