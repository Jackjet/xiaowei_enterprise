/**
 * author: 关宁
 * date: 2019.05.07
 */

// 实例化创建请求方式
var request = new Call_Request();

var modules = {
    Move: window.atob(GetQueryString('move')),
    Title: ['最新政策', '国家政策', '省市政策', '政策解读'],
    parame: null
}

$(function () {
    // 实例化
    layui.use('element', function(){
        var element = layui.element;    
    });

    // 创建导航栏模块
    var dataStream = {
        array: [{
            city: '',
            this: '',
            title: '首页',
            url: '../policy.html?level=' + window.btoa('Secondlevel')
        },
        {
            city: 'zxzc',
            this: '',
            title: '最新政策',
            url: '../subColumn/subColumn.html?move=' + window.btoa('zxzc')  + '&id=' + window.btoa(iD.policy().column.new) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'gjzc',
            this: '',
            title: '国家政策',
            url: '../subColumn/subColumn.html?move=' + window.btoa('gjzc') + '&id=' + window.btoa(iD.policy().column.guojia) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'sszc',
            this: '',
            title: '省市政策',
            url: '../subColumn/subColumn.html?move=' + window.btoa('sszc') + '&id=' + window.btoa(iD.policy().column.shengshi) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'zcjd',
            this: '',
            title: '政策解读',
            url: '../subColumn/subColumn.html?move=' + window.btoa('zcjd') + '&id=' + window.btoa(iD.policy().column.jiedu) + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 遍历当前导航数据 输出当前样式
    dataStream.array.forEach(element => {
        if (modules.Move === element.city) {
            element.url = 'javascript:;';
            element.this = 'layui-this';
        }
    })

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream);
    $('.layui-nav').html(Navigation);

    var title = document.getElementById('title');

    switch (modules.Move) {
        case 'zxzc' :
            title.innerHTML = modules.Title[0]
            modules.parame = iD.policy().column.new;
            break;
        case 'gjzc' :
            title.innerHTML = modules.Title[1]
            modules.parame = iD.policy().column.guojia;
            break;
        case 'sszc' :
            title.innerHTML = modules.Title[2]
            modules.parame = iD.policy().column.shengshi
            break;
        case 'zcjd' :
            title.innerHTML = modules.Title[3]
            modules.parame = iD.policy().column.jiedu
            break;
    }

    title.onclick = function () {
        window.location.href = '../subColumn/subColumn.html?move=' + window.btoa(modules.Move) + '&id=' + window.btoa(modules.parame) + '&hot=' + window.btoa(iD.Module().HotID)  + '&level=' + window.btoa('Levelthree')
    }


    $('.Cityhome').click(function () {
        window.location.href = '../policy.html?city=' + window.btoa(modules.Move)  + '&level=' + window.btoa('Secondlevel')
    })

    $('body').on('click', '.Hot_list', function (even) {
        var id = even.currentTarget.dataset.id
        window.location.href = 'article.html?move=' + window.btoa(modules.Move) + '&id=' + window.btoa(id) + '&hot=' + window.btoa(iD.Module().HotID)  + '&level=' + window.btoa('Levelthree')
    })

    GeneralPart(2);
})

// 获取主模块详情数据
var Details = function () {
    request.url = request.Url + request.artfindById
    request.method = "GET"

    request.data = {
        id: window.atob(GetQueryString('id'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            var Html = template('main-cell', data.data)
            $('.main_list_left').html(Html);

            $('#webHtml').append(data.data.messageWeb);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

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