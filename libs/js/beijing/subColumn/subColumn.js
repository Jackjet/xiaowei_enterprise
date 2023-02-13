/**
 * author: 关宁
 * date: 2019.05.06
 */

// 实例化创建请求方式
var request = new Call_Request();


var species = null;
var totalElements = null;

$(function () {
    // 根据URL参数 获取当前栏目内容
    if (GetQueryString('type') === 'zxzx') {
        species = '最新资讯'
    }

    if (GetQueryString('type') === 'qykj') {
        species = '前沿科技'
    }

    // 添加栏目索引目录
    $('#species').html(species);

    // 创建导航栏模块
    var DataStream = {
        array: [{
            city: '',
            this: '',
            title: '首页',
            url: '../beijing.html'
        },
        {
            city: 'zxzx',
            this: '',
            title: '最新资讯',
            url: 'subColumn.html?type=zxzx&id=' + iD.beiJing().column.zxzx + '&hot=' + iD.Module().HotID 
        },
        {
            city: 'qykj',
            this: '',
            title: '前沿科技',
            url: 'subColumn.html?type=qykj&id=' + iD.beiJing().column.qykj + '&hot=' + iD.Module().HotID 
        },
        {
            city: 'zj',
            this: '',
            title: '人才',
            url: '../../application/seek/seek.html?did=ZJ&page=beijing'
        },
        {
            city: 'zsyq',
            city_id: '',
            this: '',
            title: '招商园区',
            url: '../../application/seek/seek.html?did=YQ&page=beijing'
        }]
    }

    // 遍历当前导航数据 输出当前样式
    for (var i = 0; i < DataStream.array.length; i++) {
        if (GetQueryString('type') === DataStream.array[i].city) {
            DataStream.array[i].url = 'javascript:;'
            DataStream.array[i].this = 'layui-this'
        }
    }

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', DataStream)
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
        categoryId: GetQueryString('id')
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
                        if(!first) {
                            // 创建loading 加载元素
                            $('.main_list_left').html('<div data-loader="circle" class="loading list-loading"></div>');

                            GetMaiaContent(obj.curr, obj.limit);
                        }
                    }
                })
            })

            // 为Url添加自定义链接跳转字段
            for (var i = 0; i < data.data.content.length; i++) {
                data.data.content[i]['City'] = GetQueryString('city');
                data.data.content[i]['Hot'] = iD.Module().HotID;
                data.data.content[i]['Type'] = GetQueryString('type');
            }

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
        size: 10,
        page: 1,
        recommendId: GetQueryString('hot')
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            $('.hot-loading').css('display', 'none');

            // 为Url添加自定义链接跳转字段
            for (var i = 0; i < data.data.content.length; i++) {
                data.data.content[i]['City'] = GetQueryString('city');
                data.data.content[i]['Hot'] = iD.Module().HotID;
                data.data.content[i]['Type'] = GetQueryString('type');
            }

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