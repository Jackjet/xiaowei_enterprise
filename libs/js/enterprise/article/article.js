/**
 * author: 关宁
 * date: 2019.05.07
 */

// 实例化创建请求方式
var request = new Call_Request();

var URL = window.atob(GetQueryString('type'));

$(function () {

    // 创建导航栏模块
    var dataStream = {
        array: [{
            city: '',
            this: '',
            title: '首页',
            url: '../enterprise.html?level=' + window.btoa('Secondlevel')
        },
        {
            city: 'zxdt',
            this: '',
            title: '最新动态',
            url: 'subColumn.html?type=' + window.btoa('zxdt') + '&id=' + window.btoa(iD.enterprise().column.dynamic) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'yffs',
            this: '',
            title: '云服务',
            url: '../service/service.html?type=' + window.btoa('yffs') + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'dxal',
            this: '',
            title: '典型案例',
            url: 'subColumn.html?type=' +  window.btoa('dxal') + '&id=' + window.btoa(iD.enterprise().column.dxal) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'syqy',
            this: '',
            title: '上云企业',
            url: '../cloudService/cloudService.html?type=' + window.btoa('syqy') + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 遍历当前导航数据 输出当前样式
    dataStream.array.forEach(element => {
        if (URL === element.city) {
            element.url = 'javascript:;'
            element.this = 'layui-this'

            $('#title').html(element.title)
        }
    })

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream);
    $('.layui-nav').html(Navigation);

    
    $('.Cityhome').click(function () {
       window.location.href = '../enterprise.html?level=' + window.btoa('Secondlevel')
    })

    $('#title').click(function () {
        var VuePage = null;
    
        if (URL === 'zxdt') {
            VuePage = iD.enterprise().column.dynamic
        } else {
            VuePage = iD.enterprise().column.dxal
        }

        window.location.href = '../subColumn/subColumn.html?type=' + window.btoa(URL) + '&id=' + window.btoa(VuePage) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
    })

    $('body').on('click', '.Hot_list', function (even) {
        var id = even.currentTarget.dataset.id
        window.location.href = 'article.html?type=' +  window.btoa(URL) + '&id=' + window.btoa(id) + '&hot=' + window.btoa(iD.Module().HotID)
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
            $('.main_list_left .nodata').show();

            $('.list-loading').css('display', 'none');
            layer.msg(data.msg); 
        } else {
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