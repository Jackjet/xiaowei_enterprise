/**
 * author: 关宁
 * date: 2019.05.20
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });


    $('.main_process .layui-input-block i').click(function () {
        var name = $('#search').val();
        $('.main_process ul').html('<div data-loader="circle" class="loading training-loading"></div>');
        
        activity(1, 30, name);
    })

    GeneralPart(2);
    activity(1, 30, '')
})


var activity = function (page, size, name) {
    request.url = request.Url + request.declare
    request.method = "GET"

    request.data = {
        page: page,
        size: size,
        name: name
    }

    if (request.data.name === '') {
        delete request.data['name']
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
                    limit: 30,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {

                        // 避免首次执行 死循环
                        if(!first) {
                            $('.main_process ul').html('<div data-loader="circle" class="loading training-loading"></div>');
                            
                            activity(obj.curr, obj.limit);
                        }
                    }
                })
            })

            data.data.content.map(function (item, index) {
                item.logo = request.imagesUrl + item.logo
            })

            // 为页面模板赋值数据
            var latest = template('main_process-cell', data.data);
            $('.main_process ul').html(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

function notOpen () {
    layer.open({
        title: '温馨提示',
        skin: 'my-skin',
        content: '此功能暂未开放！'
    });
    return false
}


// 点击发布服务的验证
function publicService(tag) {
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
                        window.location.href = '../../admin/admin.html?level=' + window.btoa('Secondlevel')
                    }
                });

                return false;
            }else{
                if(tag == "1"){
                    window.location.href = "pubService/pubService.html"
                }else{
                    window.location.href="../pubService/pubService.html"
                }

            }
        }
        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }
}

// 发布需求
function publicDemand(tag) {
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
                        window.location.href = '../../admin/admin.html?level=' + window.btoa('Secondlevel')
                    }
                });
            
                return false;
            } else {
                if (tag == "1") {
                    window.location.href = "releaseDemand/releaseDemand.html"
                } else {
                    window.location.href = "../releaseDemand/releaseDemand.html"
                }
            }
        }
        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }
}