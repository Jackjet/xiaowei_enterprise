/**
 * author: 关宁
 * date: 2019.05.09
 */

// 实例化创建请求方式
var request = new Call_Request();

function example (index, Obj) {
    this.firstTypeId = index;
    this.secondTypeId = Obj;
}

var ObjMoudel = new example('', '');

$(function () {
    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });

    GeneralPart(1);

    classSecond('');
    activity('', '', 1, 20);

    $('body').on('click', '.layui-tab-title li', function (even) {
        var index = even.currentTarget.dataset.id
    
        $('.layui-tab-item').html('<div data-loader="circle" class="loading list-loading"></div>');
        $('.training_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');
        
        classSecond(index);
        activity(index, '', 1, 20);
    })
})



// 获取轮播图模块数据
var GetBanner = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        recommendId: iD.training.Banner
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            var Html = '';

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    item.url = '../bannerDetails/bannerDetails.html?id=' + item.url + '&type=pxhd&hot=' + iD.Module().HotID
                }

                // 创建轮播图元素节点
                Html += '<div><a href="'+ item.url +'"><img src="'+ request.imagesUrl + item.img +'"/></a></div>'
            })

            $('#banner div').append(Html);

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
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(GetBanner);


// 获取一级分类模块数据
var class_Information = function () {
    request.url = request.Url + request.Class
    request.method = "GET"

    request.data = {
        size: 9
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            // 为页面模板赋值一级分类模块数据
            var Html = template("tab-cell", data.data);

            $('.layui-tab-title').append(Html)
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
var classSecond = function (value) {
    request.url = request.Url + request.secondClass
    request.method = "GET"

    request.data = {
        firstTypeId : value,
        size: 1000
    }

    if (request.data.firstTypeId === '') {
        delete request.data['firstTypeId']
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            var Html = template("tabs-cell", data.data);

            $('.layui-tab-item').html(Html)
            $('.list-loading').css('display', 'none');
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}


var levelClassification = function (item) {
    $(item).addClass('color');
    $(item).siblings().removeClass('color');

    $('.training_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');
    activity('', item.getAttribute('data-id'), 1, 20);
}


var activity = function (value, index, page, size) {

    request.url = request.Url + request.activity
    request.method = "GET"

    request.data = {
        firstTypeId : value,
        secondTypeId: index,
        page: page,
        size: size,
        activityApproval: '1'
    }

    if (request.data.firstTypeId === '') {
        delete request.data.firstTypeId
    }

    if (request.data.secondTypeId === '') {
        delete request.data.secondTypeId
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            data.data.content.map(function (item, index) {
                item.image = request.imagesUrl + item.image
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
                    limit: 20,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if(!first) {

                            $('.training_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');
                            activity('', '', obj.curr, obj.limit);
                        }
                    }
                })
            })

            // 为页面模板赋值数据
            var latest = template('training-cell', data.data);
            $('.training_list ul').html(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}


//点击发布活动的验证
function publicTrain() {
    if (classModule.session() === '') {
        layer.msg('当前操作需要登录后进行！');
        return false;
    }else{
        request.url = request.Url + request.admin
        request.method = "GET"

        request.token = {
            'Authorization': 'token ' + classModule.session().token,
        }
        request.data = {
            id: classModule.session().id
        }
        request.redata = function (data) {

            if(data.data.status === '0'){
                layer.open({
                    title: '温馨提示',
                    skin: 'my-skin',
                    content: '当前企业信息未认证，请认证企业信息后再提交！',
                    btn: ['立即认证', '取消'],
                    btn1: function (layero) {
                        window.location.href = '../admin/admin.html?level=' + window.btoa('Secondlevel')
                    }
                });
                return false;
            }else{
                window.location.href="launchEvent/launchEvent.html"
            }
        }

        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }
}