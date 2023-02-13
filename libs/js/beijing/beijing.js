/**
 * author: 关宁
 * date: 2019.05.12
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
     // 实例化
     layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });

    // 创建导航栏模块
    var DataStream = {
        array: [{
            city: '',
            this: 'layui-this',
            title: '首页',
            url: '../beijing.html'
        },
        {
            city: 'zxzx',
            this: '',
            title: '最新资讯',
            url: 'subColumn/subColumn.html?type=zxzx&id=' + iD.beiJing().column.zxzx + '&hot=' + iD.Module().HotID 
        },
        {
            city: 'qykj',
            this: '',
            title: '前沿科技',
            url: 'subColumn/subColumn.html?type=qykj&id=' + iD.beiJing().column.qykj + '&hot=' + iD.Module().HotID 
        },
        {
            city: 'zj',
            this: '',
            title: '人才',
            url: '../application/seek/seek.html?did=ZJ&page=beijing'
        },
        {
            city: 'zsyq',
            city_id: '',
            this: '',
            title: '招商园区',
            url: '../application/seek/seek.html?did=YQ&page=beijing'
        }]
    }

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', DataStream)
    $('.layui-nav').html(Navigation)

    GeneralPart(1);
})

// 获取轮播图模块数据
var GetBanner = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.beiJing().Bannerid
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            var Html = '';
            
            for (var i = 0;  i < data.data.content.length; i++) {

                if (data.data.content[i].url.substr(0,5).toLowerCase() === 'https' || data.data.content[i].url.substr(0,5).toLowerCase() === 'http:') {
                    // 重新赋值跳转URL
                    data.data.content[i]['HttpUrl'] = data.data.content[i].url
                } else {
                    data.data.content[i]['HttpUrl'] = '../bannerDetails/bannerDetails.html?id=' + data.data.content[i].url + '&type=pxhd&hot=' + iD.Module().HotID
                }

                // 创建轮播图元素节点
                Html += '<div>\
                    <a href="'+ data.data.content[i].HttpUrl+'">\
                        <img src="'+ request.imagesUrl + data.data.content[i].img +'"/>\
                    </a>\
                </div>'
            }

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

// 获取最新资讯模块数据
var Getinformation = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.beiJing().new,
        size: 4
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            for (var i = 0; i < data.data.content.length; i++) {
                data.data.content[i].img = request.imagesUrl + data.data.content[i].img

                if (data.data.content[i].url.substr(0,5).toLowerCase() === 'https' || data.data.content[i].url.substr(0,5).toLowerCase() === 'http:') {
                    // 重新赋值跳转URL
                    data.data.content[i]['HttpUrl'] = data.data.content[i].url
                } else {
                    data.data.content[i]['HttpUrl'] = 'article/article.html?move=zxzx&id='+ data.data.content[i].url +'&hot=' + iD.Module().HotID
                }
            }

            // 为页面模板赋值新闻资讯数据
            var Html = template('Latest-cell', data.data)
            $('.Latest ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(Getinformation);

// 获取前沿科技模块数据
var GetCuttingEDGE = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.beiJing().edge,
        size: 8
    }
 
    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            for (var i = 0; i < data.data.content.length; i++) {
                if (data.data.content[i].url.substr(0,5).toLowerCase() === 'https' || data.data.content[i].url.substr(0,5).toLowerCase() === 'http:') {
                    // 重新赋值跳转URL
                    data.data.content[i]['HttpUrl'] = data.data.content[i].url
                } else {
                    data.data.content[i]['HttpUrl'] = 'article/article.html?move=qykj&id='+ data.data.content[i].url +'&hot=' + iD.Module().HotID
                }
            }

            // 为页面模板赋值新闻资讯数据
            var Html = template('edge-cell', data.data)
            $('.front ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(GetCuttingEDGE);

function latestInfor (index) {
    window.location.href = 'subColumn/subColumn.html?type=zxzx&id=' + iD.beiJing().column.zxzx + '&hot=' + iD.Module().HotID;
}

function Cutting (index) {
    window.location.href = 'subColumn/subColumn.html?type=qykj&id=' + iD.beiJing().column.qykj + '&hot=' + iD.Module().HotID;
}

function JumpUrlinformation () {
    window.location.href = '../application/seek/seek.html?did=YQ&page=beijing'
}

function JumpUrldynamic () {
    window.location.href = '../application/seek/seek.html?did=ZJ&page=beijing'
}

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
            $('.expert ul').html(Html)
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
            console.log( data.data)
            var Html = template("Park-cell", data.data);
            $('.Park ul').html(Html);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(ParkDetails);