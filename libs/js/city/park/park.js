/**
 * author: 关宁
 * date: 2019.05.20
 */

// 实例化创建请求方式
var request = new Call_Request();

var URL = window.atob(GetQueryString('city'));

function Module (parameter, ParHot) {
    this.parameter = parameter
    this.ParHot = ParHot
}

Module.prototype.init = function () {
    for (var i = 0; i < this.parameter.length; i++) {
        if (URL === this.parameter[i].name) {
            return this.parameter[i].param
        }
    }
}

Module.prototype.Hotinit = function () {
    for (var i = 0; i < this.ParHot.length; i++) {
        if (URL === this.ParHot[i].name) {
            return this.ParHot[i]
        }
    }
}

var ClassModule = new Module(iD.parameter(), iD.array());

$(function () {
    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;
        element.render();
    });

    // 创建导航栏模块
    var dataStream = {
        array: [{
            city: '',
            this: '',
            title: '首页',
            url: '../city.html?city=' + window.btoa(URL) + '&level=' + window.btoa('Secondlevel'),
        },
        {
            city: 'news',
            this: '',
            title: '新闻资讯',
            url: '../subColumn/subColumn.html?city=' + window.btoa(URL) + '&type=' + window.btoa('news') + '&id=' + window.btoa('xwzx_' + ClassModule.init()) + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree'),
        },
        {
            city: 'policy',
            this: '',
            title: '政策解读',
            url: '../subColumn/subColumn.html?city=' + window.btoa(URL) + '&type=' + window.btoa('policy') +'&id=' + window.btoa('zcjd_0000') + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree'),
        },
        {
            city: 'features',
            this: '',
            title: '特色产业',
            url: '../subColumn/subColumn.html?city=' + window.btoa(URL) + '&type=' + window.btoa('features') + '&id=' + window.btoa('tscy_' + ClassModule.init()) + '&hot=' + window.btoa(ClassModule.Hotinit().hot) + '&level=' + window.btoa('Levelthree'),
        },
        {
            this: '',
            title: '培训活动',
            url: '../../training/training.html?level=' + window.btoa('Secondlevel')
        },
        {
            this: 'layui-this',
            title: '园区',
            url: 'javascript:;'
        }]
    }

    // 遍历当前导航数据 输出当前样式
    dataStream.array.forEach(element => {
        if (window.btoa(QueryString('did')) === element.name) {
            element.url = 'javascript:;'
            element.this = 'layui-this'
        }
        $('.Main_title').html('园区信息');
    })

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream);
    $('.layui-nav').html(Navigation);


    iD.parameter().map(function (index, item) {
        if (URL === index.name) {

            request.url = request.Url + request.dept
            request.method = "GET"
            
            request.data = {}
            
            request.redata = function (data) {
                if (data.code === 0 ) {
                    layer.msg(data.msg); 
                } else {

                    data.data.map(function (item, info) {
                        if (item.name.indexOf(index.value) !== -1) {
                            activity(item.id, 1, 8);
                        }
                    })
                }
            }
        
            request.reinfo = function (xhr) {
                console.log(xhr);
            }
            request.run();
        }
    })

    GeneralPart(2);
})

var webUser = function () {
    request.url = request.Url + request.recommend

    request.data = {
        page:1,
        size: 8,
        recommendId: iD.Hot().rmth
    }

    request.method = "GET"

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            var latest = template('list-cell', data.data);
            $('.DetailsMain_right').html(latest);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(webUser);

// 获取一级分类模块数据
var class_Information = function () {
    request.url = request.Url + request.Class

    request.data = {
        size: 9
    }
    request.method = "GET"

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            
            // 为页面模板赋值一级分类模块数据
            // var Html = template("tab-cell", data.data);
            // $('.layui-tab-title').append(Html)

            $('.hot-loading').css('display', 'none');
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    
    request.run();
}

addLoadEvent(class_Information);

// 获取二级分类模块数据
var ClassSecond = function (value) {
    request.url = request.Url + request.dept
    request.method = "GET"

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            var Json = {}

            data.data.forEach((element, index) => {
                if (element.id === iD.Park.index) {
                    data.data.splice(index, 1);
                }
                if (element.id === iD.Park.park) {
                    element.name = "京冀园区"
                }
            });

            Json.content = data.data;

            var Html = template("tabs-cell", Json);
            $('.layui-tab-item').html(Html);

            var CiryIndex;

            iD.parameter().map(function (index, item) {
                if (URL === index.name) {
                    CiryIndex = index.value
                }
            })

            $('.layui-tab-item li').each(function (item, index) {
                if ($(index).html().indexOf(CiryIndex) !== -1 && value === undefined) {
                    index.className = 'color'
                }
            })

            
            $('.list-loading').css('display', 'none');
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(ClassSecond);

// 获取当前园区列表数据
var activity = function (index, page, size, name) {
    request.url = request.Url + request.park
    request.method = "GET"

    request.data = {
        page: page,
        size: size,
        name: name,
        deptId: index
    }

    if (request.data.deptId === undefined || request.data.deptId === '') {
        delete request.data['deptId']
    }

    if (request.data.name === '') {
        delete request.data['name']
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, index) {
                var str = item.image
                item.logo = request.imagesUrl + JSON.parse(str)[0]
            })

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
                    limit: 8,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if (!first) {
                            $('.Main_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');
                            
                            activity('', obj.curr, obj.limit, name);
                        }
                    }
                })
            })
            
            // 为页面模板赋值数据
            var latest = template('tabspage-cell', data.data);
            $('.Main_list ul').html(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

var levelClassification = function (item) {
    // 切换当前二级分类选中样式
    $(item).addClass('color');
    $(item).siblings().removeClass('color');

    // 重新加载当前分类项
    $('.Main_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');
    activity(item.getAttribute('data-id'), 1, 8);
}

var infoClass = function (even) {
    var HTML = '<div data-loader="circle" class="loading list-loading"></div>'

    // 创建 loading加载效果
    $('.layui-tab-item').html(HTML);
    $('.Main_list ul').html(HTML);
    
    var element = even.getAttribute('data-id');

    ClassSecond(element);
    activity(element, 1, 8);
}

// 搜索当前列表
var GlobalSearch = function (e) {
    var name = e.previousElementSibling.childNodes[1].childNodes[1].value;

    $('.Main_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');
    activity(1, 8, name);
}
