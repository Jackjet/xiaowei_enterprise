/**
 * author: 关宁
 * date: 2019.05.14
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
            url: 'subColumn.html?type=' + window.btoa('zxdt') +'&id=' + window.btoa(iD.enterprise().column.dynamic) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'yffs',
            this: '',
            title: '云服务',
            url: '../service/service.html?type='+ window.btoa('yffs') + '&level=' + window.btoa('Levelthree')
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
            url: '../cloudService/cloudService.html?type='+ window.btoa('syqy') + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 遍历当前导航数据 输出当前样式
    dataStream.array.forEach(element => {
        if (URL === element.city) {
            element.url = 'javascript:;'
            element.this = 'layui-this'

            $('#species').html(element.title);
        }
    })

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream)
    $('.layui-nav').html(Navigation)

    GetMaiaContent(1, 10);
    GeneralPart(2);
})


// 获取主列表模块数据
var GetMaiaContent = function (page, size) {
    request.url = request.Url + request.art
    request.method = "GET"

    request.data = {
        size: size,
        page: page,
        categoryId: window.atob(GetQueryString('id'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            $('.list-loading').css('display', 'none');

            // 实例化分页模块
            layui.use('laypage', function(){
                var laypage = layui.laypage;
                /**
                 * 实例化轮播图
                 * @param elem 元素节点
                 * @param width 轮播图宽度
                 * @param interval 延迟动画时间
                 * @param anim 动画模式
                 */
                laypage.render({
                    elem: 'laypage',
                    count: data.data.totalElements,
                    theme: '#c10000',
                    curr: page,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if(!first) {
                            // 创建loading 加载元素
                            $('.main_list_left').html('<div data-loader="circle" class="loading list-loading"></div>');
                            GetMaiaContent(obj.curr, obj.limit);
                        }
                    }
                })
            })

            for (var i = 0; i < data.data.content.length; i++) {
                data.data.content[i].HttpUrl = '../article/article.html?type=' + window.btoa(URL) + '&id=' + window.btoa(data.data.content[i].id) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
            }
            var list = template('list-cell', data.data);
            $('.main_list_left').html(list);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取热门政策模块数据
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
            $('.hot-loading').css('display', 'none');
            
            for (var i = 0; i < data.data.content.length; i++) {
                if (data.data.content[i].url.substr(0,5).toLowerCase() === 'https' || data.data.content[i].url.substr(0,5).toLowerCase() === 'http:') {
                    // 重新赋值跳转URL
                    data.data.content[i].HttpUrl = data.data.content[i].url
                } else {
                    data.data.content[i].HttpUrl = '../article/article.html?type=' + window.btoa(URL) + '&id=' + window.btoa(data.data.content[i].url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            }
            // 为页面模板赋值热门政策数据
            var HotCell = template('hot-cell', data.data);
            $('.hot').html(HotCell);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(GetHotPolicy);
