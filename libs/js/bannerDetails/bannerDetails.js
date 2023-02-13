/**
 * author: 关宁
 * date: 2019.05.07
 */

// 实例化创建请求方式
var request = new Call_Request();

var URL = window.atob(GetQueryString('type'));

var title = null;
var url = null;

$(function () {
    // 创建导航栏模块
    var dataStream = {
        array: [{
            type: 'home',
            this: '',
            title: '首页',
            url: '../../index.html'
        },
        {
            type: 'zcjd',
            this: '',
            title: '政策解读',
            url: '../policy/policy.html?level=' + window.btoa('Secondlevel')
        },
        {
            type: 'qysy',
            this: '',
            title: '企业上云',
            url: '../enterprise/enterprise.html?level=' + window.btoa('Secondlevel')
        },
        {
            type: 'pxhd',
            this: '',
            title: '培训活动',
            url: '../training/training.html?level=' + window.btoa('Secondlevel')
        },
        {
            type: 'jyhd',
            this: '',
            title: '京翼互动',
            url: '../beijing/beijing.html?level=' + window.btoa('Secondlevel')
        },
        {
            type: 'qyyy',
            this: '',
            title: '企业应用',
            url: '../application/application.html?level=' + window.btoa('Secondlevel')
        },
        {
            type: 'rzdb',
            this: '',
            title: '融资担保',
            url: 'javascript:;'
        }]
    }

    // 遍历当前导航数据 输出当前样式
    dataStream.array.forEach(element => {
        if (URL === element.type) {
            element.url = 'javascript:;'
            element.this = 'layui-this'
        }
    })

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream);
    $('.layui-nav').html(Navigation);


    /**
     * 通过URL参数获取当前栏目状态
     * @param url 跳转路径
     * @param title 栏目名称
     */
    if (URL === 'zcjd') {
        title = '政策解读'
        url = '../policy/policy.html?level=' + window.btoa('Secondlevel')
    }

    if (URL === 'qysy') {
        title = '企业上云'
        url = '../enterprise/enterprise.html?level=' + window.btoa('Secondlevel')
    }

    if (URL === 'pxhd') {
        title = '培训活动'
        url = '../training/training.html?level=' + window.btoa('Secondlevel')
    }

    if (URL === 'jyhd') {
        title = '京翼互动'
        url = '../beijing/beijing.html?level=' + window.btoa('Secondlevel')
    }

    if (URL === 'qyyy') {
        title = '企业应用'
        url = '../application/application.html?level=' + window.btoa('Secondlevel')
    }

    if (URL === 'rzdb') {
        title = '融资担保'
        url = ''
    }

    if (URL === 'home') {
        title = '首页'
        url = '../../index.html?level=' + window.btoa('Secondlevel')

        $('#title').hide();
        $('.laft').hide();
    }

    // 添加标签栏目名称 
    $('#title').html(title).click(function () {
        window.location.href = url
    });

    $('body').on('click', '.Hot_list', function (even) {
        var iD = even.currentTarget.dataset.id
        window.location.href = 'bannerDetails.html?id=' +  window.btoa(iD) + '&type=' +  window.btoa(url)
    })

    GeneralPart(1);
})

// 获取主模块详情数据
var DetailsModule= function () {
    request.url = request.Url + request.artfindById
    request.method = "GET"

    request.data = {
        id :  window.atob(GetQueryString('id'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            // 为页面模板赋值主模块详情数据
            var Html = template('main-cell', data.data)
            $('.main_list_left').html(Html);

            $('#webHtml').append(data.data.messageWeb);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(DetailsModule);

// 获取热门政策列表数据
var GetHotPolicy = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        size: 10,
        page: 1,
        recommendId: iD.Module().HotID
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