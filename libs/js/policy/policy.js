/**
 * author: 关宁
 * date: 2019.05.09
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
    // 实例化
    layui.use('element', function(){
        var element = layui.element;    
    });

    // 创建导航栏模块
    var dataStream = {
        array: [{
            city: '',
            this: 'layui-this',
            title: '首页',
            url: 'javascript:;'
        },
        {
            city: 'zxzc',
            this: '',
            title: '最新政策',
            url: 'subColumn/subColumn.html?move=' + window.btoa('zxzc') + '&id=' +  window.btoa(iD.policy().column.new) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'gjzc',
            this: '',
            title: '国家政策',
            url: 'subColumn/subColumn.html?move=' + window.btoa('gjzc') + '&id=' + window.btoa(iD.policy().column.guojia) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'sszc',
            this: '',
            title: '省市政策',
            url: 'subColumn/subColumn.html?move=' + window.btoa('sszc') + '&id=' + window.btoa(iD.policy().column.shengshi) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'zcjd',
            this: '',
            title: '政策解读',
            url: 'subColumn/subColumn.html?move=' + window.btoa('zcjd') + '&id=' + window.btoa(iD.policy().column.jiedu) + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream)
    $('.layui-nav').html(Navigation)

    GeneralPart(1);
})

// 跳转子模块列表
var GetMoreData = function (item) {
    var Column = null;

    switch (item) {
        case 'zcjd':
            Column = iD.policy().column.new;
            break;
        case 'gjzc':
            Column = iD.policy().column.guojia;
            break;
        case 'sszc':
            Column = iD.policy().column.shengshi;
            break;
        default:
            Column = iD.policy().column.jiedu;
            break;
    }

    window.location.href = 'subColumn/subColumn.html?move=' + window.btoa(item) +'&id=' + window.btoa(Column) + '&level=' + window.btoa('Levelthree')
}

// 获取最新政策模块数据
var GetBanner = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.policy().new
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    item.url = 'article/article.html?move=' + window.btoa('zcjd') + '&id=' +  window.btoa(item.url) +'&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            })
            
            var Html = template('new-cell', data.data);
            $('.new-box').html(Html);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(GetBanner);

// 获取国家政策模块数据
var GetCountries = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.policy().countries
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                   item.url = 'article/article.html?move=' + window.btoa('gjzc') + '&id='+ window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            })

            var Html = template('count-cell', data.data);
            $('.count-box').html(Html);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(GetCountries);

// 获取政策解读模块数据
var GetCities = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.policy().cities
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    item.urls = 'article/article.html?move=' + window.btoa('sszc') + '&id='+ window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            })

            var Html = template('cities-cell', data.data);
            $('.cities-box').html(Html);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(GetCities);

// 获取最新政策模块数据
var GetInt = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.policy().Int
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                   item.url = 'article/article.html?move=' + window.btoa('zcjd') + '&id='+ window.btoa(item.url) +'&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            })

            var Html = template('Int-cell', data.data);
            $('.Int-box').html(Html);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(GetInt);