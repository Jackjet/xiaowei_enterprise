/**
 * author: 关宁
 * date: 2019.05.07
 */

// 实例化创建请求方式
var request = new Call_Request();

var Ciry = window.atob(GetQueryString('city'));
var Page = window.atob(GetQueryString('type'));

var title = ['新闻资讯', '政策解读', '特色产业'];
var isparameter = null;
var parame = null;

var int = {
    ModuleCityiD: function () {
        for (var i = 0; i < iD.parameter().length; i++) {
            if (Ciry === iD.parameter()[i].name) {
                return iD.parameter()[i].param
            }
        }
    },

    ModulehHot: function () {
        for (var i = 0; i < iD.array().length; i++) {
            if (Ciry === iD.array()[i].name) {
                return iD.array()[i].hot
            }
        }
    }
}

$(function () {
    // 导航指向返回首页
    $('.Cityhome').click(function () {
        window.location.href = '../city.html?city=' + window.btoa(Ciry) + '&level=' + window.btoa('Secondlevel')
    })

    var element = document.getElementById('title');

    // 根据URL参数 获取当前栏目内容
    switch (Page) {
        case 'news':
            element.innerHTML = title[0];
            parame = 'xwzx_' + int.ModuleCityiD();
            break;
        case 'policy':
            element.innerHTML = title[1];
            parame = 'zcjd_0000';
            break;
        case 'features':
            element.innerHTML = title[2];
            parame = 'tscy_' + int.ModuleCityiD();
            break;
        default: 
            $('.type0').hide();
            break;
    }

    element.onclick = function () {
        window.location.href = '../subColumn/subColumn.html?city=' + window.btoa(Ciry) + '&type=' + window.btoa(Page) + '&id=' + window.btoa(parame) + '&hot=' + window.btoa(iD.Module().HotID)+ '&level=' + window.btoa('Levelthree')
    }

    // 创建导航栏模块
    var DataStream = {
        array: [{
            city_id: '',
            this: '',
            title: '首页',
            url: '../../city/city.html?city=' + window.btoa(Ciry)
        },
        {
            city: 'news',
            city_id: '',
            this: '',
            title: '新闻资讯',
            url: '../subColumn/subColumn.html?city=' + window.btoa(Ciry) + '&type=' + window.btoa('news') + '&id='+ window.btoa('xwzx_' + int.ModuleCityiD()) + '&hot=' + window.btoa(iD.Module().HotID)
        },
        {
            city: 'policy',
            city_id: '',
            this: '',
            title: '政策解读',
            url: '../subColumn/subColumn.html?city=' + window.btoa(Ciry) + '&type=' + window.btoa('policy') + '&id='+ window.btoa('zcjd_0000') + '&hot=' + window.btoa(iD.Module().HotID)
        },
        {
            city: 'features',
            city_id: '',
            this: '',
            title: '特色产业',
            url: '../subColumn/subColumn.html?city=' + window.btoa(Ciry) + '&type=' + window.btoa('features') + '&id='+ window.btoa('tscy_' + int.ModuleCityiD()) + '&hot=' + window.btoa(iD.Module().HotID)
        },
        {
            city: 'training',
            city_id: '',
            this: '',
            title: '培训活动',
            url: '../../training/training.html?level=' + window.btoa('Secondlevel')
        },
        {
            city_id: '',
            this: '',
            title: '园区',
            url: '../park/park.html?city=' + window.btoa(Ciry) + '&did=' +  window.btoa('YQ') + '?level=' + window.btoa('Levelthree')
        }]
    }

    // 遍历当前导航数据 输出当前样式
    DataStream.array.map(function (item, index) {
        if (Page === item.city) {
            item.url = 'javascript:;'
            item.this = 'layui-this'
        }
    })

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', DataStream)
    $('.layui-nav').html(Navigation)

   
    $('body').on('click', '.Hot_list', function (even) {
        var iD = even.currentTarget.dataset.id
        window.location.href = 'article.html?city=' + window.btoa(Ciry) + '&id=' + window.btoa(iD) + '&type=' + window.btoa(Page) + '&hot=' + window.btoa(iD.Module().HotID)
    })

    GeneralPart(2);
})

// 获取主模块详情数据
var Details = function () {
    request.url = request.Url + request.artfindById
    request.method = "GET"

    request.data = {
        id : window.atob(GetQueryString('id'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            // 为页面模板赋值主模块详情数据
            var Html = template('main-cell', data.data)
            $('.main_list_left').html(Html);

            $('.list-loading').css('display', 'none');
            $('#webHtml').append(data.data.messageWeb);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(Details);

// 获取热门政策列表数据
var GetHotPolicy = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        size: 10,
        page: 1,
        recommendId: window.atob(GetQueryString('hot'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            // 为页面模板赋值热门政策数据
            var HotCell = template('hot-cell', data.data);
            $('.hot').html(HotCell);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(GetHotPolicy);