/**
 * author: 关宁
 * date: 2019.05.14
 */

// 实例化创建请求方式
var request = new Call_Request();
var URL =  window.atob(GetQueryString('type'))

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
            url: '../subColumn/subColumn.html?type=' + window.btoa('zxdt') + '&id=' + window.btoa(iD.enterprise().column.dynamic) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
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
            url: '../subColumn/subColumn.html?type=' + window.btoa('dxal') + '&id='  + window.btoa(iD.enterprise().column.dxal) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
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
        }
    })

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream)
    $('.layui-nav').html(Navigation);

    // 获取云服务分类切换模块
    $(document).on('click', '.recomService li', function (even) {
        $('.main_content').html('<div data-loader="circle" class="loading main-loading"></div>');
        GetCludeList(1, 12, even.target.dataset.id);
    })

    GetCludeList(1, 12, '');
    GeneralPart(2);
})

var ClassTypeClude = function () {
    request.url = request.Url + request.ServicesType
    request.method = "GET"

    request.data = {
        recommendId: iD.enterprise().latest,
        size: 100,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            // 为页面模板赋值轮播图数据
            var latest = template('Service-cell', data.data);
            $('.recomService').append(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(ClassTypeClude);

var GetCludeList = function (page, size, index) {
    request.url = request.Url + request.cloudServices
    request.method = "GET"

    request.data = {
        cloudServicesTypeId: index,
        size: size,
        page: page,
    }

    if (request.data.cloudServicesTypeId === '') {
        delete request.data['cloudServicesTypeId']
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
                 * @param elem 元素节点
                 * @param count 分页总页数
                 * @param theme 按钮颜色
                 * @param layout 分页组件
                 */
                laypage.render({
                    elem: 'laypage',
                    count: data.data.totalElements,
                    theme: '#c10000',
                    curr: page,
                    limit: size,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if(!first) {
                            $('.main_content').html('<div data-loader="circle" class="loading list-loading"></div>');
        
                            GetCludeList(obj.curr, obj.limit);
                        }
                    }
                })

                // 为Url添加自定义链接跳转字段
                for (var i = 0; i < data.data.content.length; i++) {
                    data.data.content[i].userLogo = request.imagesUrl + data.data.content[i].logo
                    data.data.content[i].httpUrl = '../buyService/buyService.html?id=' + window.btoa(data.data.content[i].id) + '&type=' + window.btoa('yffs') + '&level=' + window.btoa('Levelthree')
                }

                // 为页面模板赋值主列表模块数据
                var list = template('main-cell', data.data);
                $('.main_content').html(list);
            })
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
