/**
 * author: 关宁
 * date: 2019.05.06
 */

// 实例化创建请求方式
var request = new Call_Request();

var ObjectClass = {
    totalElements: null,
    Mark: ['新闻资讯', '政策解读', '特色产业'],

    // 标题参数
    TITLE: window.atob(GetQueryString('type')),
    // 城市参数
    URL: window.atob(GetQueryString('city'))
}

function Module (parameter, ParHot) {
    this.parameter = parameter
    this.ParHot = ParHot
}

Module.prototype.init = function () {
    for (var i = 0; i < this.parameter.length; i++) {
        if (ObjectClass.URL === this.parameter[i].name) {
            return this.parameter[i].param
        }
    }
}

Module.prototype.Hotinit = function () {
    for (var i = 0; i < this.ParHot.length; i++) {
        if (ObjectClass.URL === this.ParHot[i].name) {
            return this.ParHot[i]
        }
    }
}

var ClassModule = new Module(iD.parameter(), iD.array());

$(function () {
    var elements = document.getElementById('species');

    // 根据URL参数 获取当前栏目内容
    switch (ObjectClass.TITLE) {
        case 'news':
            elements.innerHTML = ObjectClass.Mark[0]
            break;
        case 'policy':
            elements.innerHTML = ObjectClass.Mark[1]
            break;
        case 'features':
            elements.innerHTML = ObjectClass.Mark[2]
            break;
    }

    // 创建导航栏模块
    var DataStream = {
        array: [{
            city: '',
            this: '',
            title: '首页',
            url: '../../city/city.html?city=' + window.btoa(ObjectClass.URL) + '&level=' + window.btoa('Secondlevel')
        },
        {
            city: 'news',
            this: '',
            title: '新闻资讯',
            url: 'subColumn.html?city=' + window.btoa(ObjectClass.URL) + '&type='+ window.btoa('news') +'&id=' + window.btoa('xwzx_' + ClassModule.init()) + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'policy',
            this: '',
            title: '政策解读',
            url: 'subColumn.html?city=' + window.btoa(ObjectClass.URL) + '&type='+ window.btoa('policy') +'&id=' + window.btoa('zcjd_0000') + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'features',
            this: '',
            title: '特色产业',
            url: 'subColumn.html?city=' + window.btoa(ObjectClass.URL) + '&type='+ window.btoa('features') +'&id=' + window.btoa('tscy_' + ClassModule.init()) + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'training',
            this: '',
            title: '培训活动',
            url: '../../training/training.html?level=' + window.btoa('Secondlevel')
        },
        {
            this: '',
            title: '园区',
            url: '../park/park.html?city=' +  window.btoa(ObjectClass.URL) + '&did=' +  window.btoa('YQ') + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 遍历当前导航数据 输出当前样式
    DataStream.array.map(function (item, index) {
        if (ObjectClass.TITLE === item.city) {
            item.url = 'javascript:;';
            item.this = 'layui-this'
        }
    })

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', DataStream);
    $('.layui-nav').html(Navigation);

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
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if (!first) {
                            // 创建loading 加载元素
                            $('.main_list_left').html('<div data-loader="circle" class="loading list-loading"></div>');
                            GetMaiaContent(obj.curr, obj.limit);
                        }
                    }
                })
            })

            // 为Url添加自定义链接跳转字段
            data.data.content.map(function (item, index) {
                item.City = window.btoa(ObjectClass.URL);
                item.Hot = window.btoa(ClassModule.Hotinit().hot);
                item.Type = window.btoa(ObjectClass.TITLE);
                item.id = window.btoa(item.id);
            })

            // 为页面模板赋值主列表模块数据
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
        size: 11,
        page: 1,
        recommendId: window.atob(GetQueryString('hot'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            $('.hot-loading').css('display', 'none');

            // 为Url添加自定义链接跳转字段
            data.data.content.map(function (item, index) {
                item.City = window.btoa(ObjectClass.URL);
                item.Hot = window.btoa(ClassModule.Hotinit().hot);
                item.Type = window.atoa(ObjectClass.TITLE);
                item.id = window.atoa(item.id);
            })

            // 为页面模板赋值热门政策模块数据
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