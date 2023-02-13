/**
 * author: 关宁
 * date: 2019.05.14
 */

// 实例化创建请求方式
var request = new Call_Request();
var URL =  window.atob(GetQueryString('type'))
var array = [''];

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
            url: '../subColumn/subColumn.html?type=' + window.btoa('zxdt') +'&id=' + window.btoa(iD.enterprise().column.dynamic) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
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
            url: '../subColumn/subColumn.html?type=' + window.btoa('dxal') +'&id='  + window.btoa(iD.enterprise().column.dxal) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'syqy',
            this: '',
            title: '上云企业',
            url: 'cloudService.html?type=' + window.btoa('syqy') + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 遍历当前导航数据 输出当前样式
    dataStream.array.forEach(element => {
        if (URL === element.city) {
            element.url = 'javascript:;'
            element.this = 'layui-this'

            $('#content').html(element.title);
        }
    })

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream)
    $('.layui-nav').html(Navigation);


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

    GetCludeList(1, 20);
    GeneralPart(2);
})

var GetCludeList = function (page, size) {
    request.url = request.Url + request.cloudRecord
    request.method = "GET"

    request.data = {
        size: size,
        page: page,
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
                            $('.ul_list ul').html('<div data-loader="circle" class="loading list-loading"></div>');
        
                            GetCludeList(obj.curr, obj.limit);
                        }
                    }
                })

                // 为Url添加自定义链接跳转字段
                for (var i = 0; i < data.data.content.length; i++) {
                    data.data.content[i].userLogo = request.imagesUrl + data.data.content[i].userLogo
                }

                // 为页面模板赋值主列表模块数据
                var list = template('list-cell', data.data);
                $('.ul_list ul').html(list);
            })
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}