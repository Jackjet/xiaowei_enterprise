/**
 * author: 关宁
 * date: 2019.05.16
 */

// 实例化创建请求方式
var request = new Call_Request();
var URL = window.atob(GetQueryString('id'))

$(function () {
    // 创建导航栏模块
    var DataStream = {
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
            url: '../subColumn/subColumn.html?type=' + window.btoa('zxdt') + '&id=' + window.btoa(iD.enterprise().column.dynamic) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'yffs',
            this: 'layui-this',
            title: '云服务',
            url: 'javascript:;'
        },
        {
            city: 'dxal',
            this: '',
            title: '典型案例',
            url: '../subColumn/subColumn.html?type=' +  window.btoa('dxal') + '&id='  + window.btoa(iD.enterprise().column.dxal) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'syqy',
            this: '',
            title: '上云企业',
            url: 'cloudService.html?type=' + window.btoa('syqy') + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', DataStream)
    $('.layui-nav').html(Navigation);

    var content = 10;

    setInterval(function () { 
        content--;
        $('.text_text span').html(content)

        if (content <= 0) {
            window.location.href = '../buyService/buyService.html?id=' + window.btoa(URL) + '&level=' + window.btoa('Levelthree');
        }
    
    },1000);

    GeneralPart(2);
})

var ServiceDetails = function () {
    window.location.href = '../buyService/buyService.html?id=' + window.btoa(URL) + '&level=' + window.btoa('Levelthree');
}
