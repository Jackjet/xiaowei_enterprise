/**
 * author: 关宁
 * date: 2019.05.05
 */

// 实例化创建请求方式

var request = new Call_Request();
var indexID = null;

$(function (){
    // 组件实例化
    layui.use('element', function(){
        var element = layui.element;
        element.render();
    });

    GeneralPart(0);
})

// 获取轮播图模块数据
var GetBanner = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.index().Bannerid
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            var Html = '';

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    // 自定义URL参数跳转
                    item.url = 'page/bannerDetails/bannerDetails.html?id=' + window.btoa(item.url) + '&type=' + window.btoa('home') + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Secondlevel')
                }

                // 创建轮播图元素节点
                Html += '<div>\
                    <a href="'+ item.url +'"><img src="'+ request.imagesUrl + item.img +'"/></a>\
                </div>'
            })

            $('#banner div').append(Html);

            /**
             * 实例化轮播图
             * @param elem 元素节点
             * @param width 轮播图宽度
             * @param interval 延迟动画时间
             * @param anim 动画模式
             */

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

// 获取最新公告数据
var CementFindAll = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        size: 4,
        page: 1,
        recommendId: iD.index().zxgg
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    // 自定义URL参数跳转
                    item.url = 'page/index/article/article.html?move=' + window.btoa('zxgg') + '&id=' + window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            })

            var Html = template("Li-cell", data.data);
            $('.recommend').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(CementFindAll);

// 获取新闻资讯模块数据
var Gerinformation = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        size: 4,
        page: 1,
        recommendId: iD.index().xwzx
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
               item.img = request.imagesUrl + item.img
                
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    // 自定义URL参数跳转
                    item.url = 'page/index/article/article.html?move=' + window.btoa('xwzx') + '&id=' +window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            })

            var Html = template("information-cell", data.data);
            $('.information ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(Gerinformation);

function newCement (index) {
    if (index == 'zxgg') {
        indexID = iD.index().column.zxgg
    }

    if (index == 'xwzx') {
       indexID = iD.index().column.xwzx
    }

    if (index == 'hydt') {
        indexID = iD.index().column.hydt
    }

    window.location.href = 'page/index/subColumn/subColumn.html?type=' + window.btoa(index) + '&id=' + window.btoa(indexID) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree');
}

// 获取行业动态模块数据
var IndustryDynamic = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        size: 8,
        page: 1,
        recommendId: iD.index().hydt
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                item.img = request.imagesUrl + item.img

                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    // 自定义URL参数跳转
                    item.url = 'page/index/article/article.html?move=' + window.btoa('hydt') + '&id=' + window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree');
                }
            })

            var Html = template("dynamic-cell", data.data);
            $('.dynamic ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(IndustryDynamic);

// 获取专家模块数据
var expertFinAll = function () {
    request.url = request.Url + request.expert
    request.method = "GET"

    request.data = {
        size: 4,
        page: 1
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                item.icon = request.imagesUrl + item.icon
            })

            var Html = template("expert-cell", data.data);
            $('.experts ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(expertFinAll);

// 获取园区模块数据
var ParkDetails = function () {
    request.url = request.Url + request.park
    request.method = "GET"

    request.data = {
        size: 4,
        page: 1
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                var str = item.image
                item.icon = request.imagesUrl + JSON.parse(str)[0]
            })

            var Html = template("park-cell", data.data);
            $('.park ul').html(Html);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(ParkDetails);
