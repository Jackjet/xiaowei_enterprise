/**
 * author: 关宁
 * date: 2019.05.19
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
    // 实例化
    layui.use('element', function(){
        var element = layui.element;
        element.render();
    });

    var href = window.location.pathname.split('/');
    
    // 如果当前用户瑞出登录或未登录状态需要返回首页
    for (var i = 0; i < href.length; i++) {
        if (href[i] === 'admin.html' && classModule.session() === '') {
            window.location.href = '../../index.html'
        }
    }

    $(document).on('click', '.tree li', function (event) {
        $(event.target).parent().addClass('Color');
        $(event.target).parent().parent().siblings().children('li').removeClass('Color');
        $(event.target).parent().siblings().removeClass('Color');
        
        var index = $(event.target).parent().attr('data-id');
        
        $('.layui-nav li a').each(function (last, item) {
            if (item.getAttribute('data-id').split('-')[0] === index.split('-')[0]) {
                $(item).parent().addClass('layui-this');
                $(item).parent().siblings().removeClass('layui-this');
            }
        })

        $("#iframe").attr("src", event.target.dataset.url);
    })

    $(document).on('click', '.layui-nav li', function (event) {
        $('.tree ul li').each(function (index, item) {
            if (event.target.dataset.id === item.getAttribute('data-id')) {
                item.className = 'Color'
                
                $(item).siblings().removeClass('Color');
                $(item).parent().siblings().children('li').removeClass('Color');
            }
        })
        
        $("#iframe").attr("src", event.target.dataset.url);
    })

    GeneralPart(1);
})

// 获取当前用户个人基本信息
var GetUesradmin = function () {
    request.url = request.Url + request.admin
    request.method = "GET"

    request.data = {
       id: classModule.session().id
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            $.cookie('accessToken', data.data.accessToken)

            data.data.imagesUrl = request.imagesUrl

            var Html = template("user-cell", data.data);
            $('.adminlogo').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}; 
addLoadEvent(GetUesradmin);

// 自适应子框架页面高度
function iframeHeight (WightHeight) {
    document.getElementById("nav_main").style.height = WightHeight + "px";
}
