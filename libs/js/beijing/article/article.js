/**
 * author: 关宁
 * date: 2019.05.07
 */

// 实例化创建请求方式
var request = new Call_Request();

var title = null;
var parame = null;

$(function () {
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
            url: '../subColumn/subColumn.html?type=zxzx&id=' + iD.beiJing().column.zxzx + '&hot=' + iD.Module().HotID 
        },
        {
            city: 'qykj',
            this: '',
            title: '前沿科技',
            url: '../subColumn/subColumn.html?type=qykj&id=' + iD.beiJing().column.qykj + '&hot=' + iD.Module().HotID 
        },
        {
            city: 'zj',
            this: '',
            title: '专家',
            url: '' 
        },
        {
            city: 'zsyq',
            city_id: '',
            this: '',
            title: '招商园区',
            url: ''
        }]
    }

    // 遍历当前导航数据 输出当前样式
    for (var i = 0; i < DataStream.array.length; i++) {
        if (GetQueryString('move') === DataStream.array[i].city) {
            DataStream.array[i].url = 'javascript:;'
            DataStream.array[i].this = 'layui-this'
        }
    }

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', DataStream);
    $('.layui-nav').html(Navigation);


    $('.Cityhome').click(function () {
       window.location.href = '../beijing.html'
    })


    // 根据URL参数 获取当前栏目内容
    if (GetQueryString('move') === 'zxzx') {
        title = '最新资讯'
        parame = iD.beiJing().column.zxzx
    }

    if (GetQueryString('move') === 'qykj') {
        title = '前沿科技'
        parame = iD.beiJing().column.qykj
    }

    $('#title').html(title).click(function () {
        window.location.href = '../subColumn/subColumn.html?type=' + GetQueryString('move') + '&id=' + parame + '&hot=' + iD.Module().HotID
    })

    $('body').on('click', '.Hot_list', function (even) {
        var id = even.currentTarget.dataset.id
        window.location.href = 'article.html?move=' + GetQueryString('move') + '&id=' + id + '&hot=' + iD.Module().HotID
    })

    GeneralPart(2);
})

// 获取主模块详情数据
var Details = function () {
    request.url = request.Url + request.artfindById
    request.method = "GET"

    request.data = {
        id : GetQueryString('id')
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
        recommendId: GetQueryString('hot')
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            var HotCell = template('hot-cell', data.data);
            $('.hot').html(HotCell);

            // 隐藏loading效果
            $('.hot-loading').css('display', 'none');
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(GetHotPolicy);