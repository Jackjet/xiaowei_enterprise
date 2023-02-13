/**
 * author: 关宁
 * date: 2019.05.06
 */

// 实例化创建请求方式
var request = new Call_Request();

var URL = window.atob(GetQueryString('city'));

function Module (parameter, ParHot) {
    this.parameter = parameter
    this.ParHot = ParHot
}

Module.prototype.init = function () {
    for (var i = 0; i < this.parameter.length; i++) {
        if (URL === this.parameter[i].name) {
            return this.parameter[i].param
        }
    }
}

Module.prototype.Hotinit = function () {
    for (var i = 0; i < this.ParHot.length; i++) {
        if (URL === this.ParHot[i].name) {
            return this.ParHot[i]
        }
    }
}

var ClassModule = new Module(iD.parameter(), iD.array());

$(function () {
    // 创建导航栏模块
    var DataStream = {
        array: [{
            city: '',
            city_id: '',
            this: 'layui-this',
            title: '首页',
            url: 'javascript:;',
        },
        {
            city: 'news',
            city_id: '',
            this: '',
            title: '新闻资讯',
            url: 'subColumn/subColumn.html?city=' + window.btoa(URL) + '&type='+ window.btoa("news") +'&id=' + window.btoa("xwzx_" + ClassModule.init()) + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'policy',
            city_id: '',
            this: '',
            title: '政策解读',
            url: 'subColumn/subColumn.html?city=' + window.btoa(URL) + '&type='+ window.btoa("policy") +'&id=' + window.btoa("zcjd_0000") + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'features',
            city_id: '',
            this: '',
            title: '特色产业',
            url: 'subColumn/subColumn.html?city=' + window.btoa(URL) + '&type='+ window.btoa("features") +'&id=' + window.btoa('tscy_' + ClassModule.init()) + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
        },
        {
            city_id: '',
            this: '',
            title: '培训活动',
            url: '../training/training.html?level=' + window.btoa('Secondlevel')
        },
        {
            city_id: '',
            this: '',
            title: '园区',
            url: 'park/park.html?city=' + window.btoa(URL) + '&did=' + window.btoa("YQ") + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', DataStream)
    $('.layui-nav').html(Navigation);

    GeneralPart(1);
})

// 获取城市Banner主图
var GetCityData = function (value) {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: ClassModule.Hotinit().id
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            data.data.content.map(function (item, value) {
                item['http'] = request.imagesUrl
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    item.url = 'article/article.html?city=' + window.btoa(URL) + '&id=' + window.btoa(item.url) + '&type='+ window.btoa('0') +'&hot=' + window.btoa(ClassModule.Hotinit().hot) + '?level=' + window.btoa('Levelthree')
                }
            })
            // 为页面模板赋值轮播图数据
            var banner = template('banner-cell', data.data);
            $('#banner div').html(banner)

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
                    height: '400px',
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

addLoadEvent(GetCityData);

// 获取新闻资讯模块数据
var NewsInformation = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: ClassModule.Hotinit().newiD,
        size: 4,
        page: 1
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            $('.new-loading').hide();

            data.data.content.map(function (item, value) {
                item.img = request.imagesUrl + item.img
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    item.url = 'article/article.html?city=' + window.btoa(URL) + '&id=' + window.btoa(item.url) + '&type='+ window.btoa('news') +'&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
                }
            })
            // 为页面模板赋值新闻资讯数据
            var news = template('news-cell', data.data)
            $('.news-list').html(news)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(NewsInformation);

// 获取政策解读模块数据
var PolicyInterpr = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: ClassModule.Hotinit().PolicyiD,
        size: 8,
        page: 1
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            $('.Policy-loading').hide()

            data.data.content.map(function (item, value) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                   item.url = 'article/article.html?city=' + window.btoa(URL) + '&id=' + window.btoa(item.url) + '&type='+ window.btoa('policy') +'&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
                }
            })

            // 为页面模板赋值政策解读数据
            var news = template('Policy-cell', data.data)
            $('.PolicyInterpr').html(news)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(PolicyInterpr);

// 获取特色产业模块数据
var FeaturesIndustry = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: ClassModule.Hotinit().Industry,
        size: 8,
        page: 1
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            $('.Industry-loading').hide()

            data.data.content.map(function (item, value) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    item.url = 'article/article.html?city=' + window.btoa(URL) + '&id=' +  window.btoa(item.url) + '&type='+ window.btoa('features') +'&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
                }

               item['http'] = request.imagesUrl
            })

            // 为页面模板赋值特色产业数据
            var Industry = template('Industry-cell', data.data)
            $('.Industry-list').html(Industry)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(FeaturesIndustry);

// 获取培训活动模块数据
var GetActivities = function () {
    request.url = request.Url + request.activity
    request.method = "GET"

    request.data = {
        size: 4,
        page: 1,
        activityApproval: 1
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else { 
            for (var i = 0; i < data.data.content.length; i++) {
                // 拼接七牛云图片路径 
                data.data.content[i].http = request.imagesUrl;
                data.data.content[i].id = window.btoa(data.data.content[i].id)
            }

            // 为页面模板赋值培训活动数据
            var Industry = template('training-cell', data.data);
            $('.training').html(Industry);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(GetActivities);

function SubColumn (index, item) {
    if (index === 'policy') {
        window.location.href = 'subColumn/subColumn.html?city=' + window.btoa(URL) + '&type=' + window.btoa(index) +'&id=' + window.btoa(item) + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
        return false;
    }
    
    window.location.href = 'subColumn/subColumn.html?city=' + window.btoa(URL) + '&type=' + window.btoa(index) +'&id=' + window.btoa(item + ClassModule.init()) + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
}