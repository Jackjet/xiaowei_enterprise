/**
 * author: 关宁
 * date: 2019.05.16
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });
    
    request.url = request.Url + request.webUserDel
    request.method = "GET"

    request.data = {
        id: GetQueryString('id')
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            data.data.logo = request.imagesUrl + data.data.logo
            if (data.data.honor != '' && data.data.honor != null) {
                var arr = data.data.honor.split(',');
                var data_arr = []
                for (i in arr) {
                    data_arr.push(request.imagesUrl + arr[i])
                }
                data.data.honor = data_arr
            }
            data.data.IfLogin = classModule.session()
            var Industry = template('list-cell', data.data);
            $('.DetailsMain').html(Industry);

            GETSERVICE(1, 3);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();

    GeneralPart(2);
})

var GETSERVICE = function (page, size) {
    request.url = request.Url + request.webserve

    request.data = {
        page: page,
        size: size,
        status: '1',
        userId: GetQueryString('id')
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else { 
            var Html = ''

            data.data.content.map(function (item, value) {
                // debugger;
                Html += '<li onclick="goTodetail(this)" data-id="'+ item.id +'">\
                            <div class="images">\
                                <img src="'+ request.imagesUrl + item.logo +'" />\
                            </div>\
                            <div class="info">\
                                <span>服务名称：'+ item.name +'</span>\
                                <span>服务区域：'+ item.address +'</span>\
                                <span>收费标准：'+ changeMoney(item.charge) +'元</span>\
                            </div>\
                        </li>'
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
                    limit: 3,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {

                        // 避免首次执行 死循环
                        if(!first) {
                            GETSERVICE(obj.curr, obj.limit);
                        }
                    }
                })
            })

            $('.Class ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}


function goTodetail(item) {
    // debugger
    var id  = item.getAttribute('data-id')
    window.location.href= "../serviceDetails/serviceDetails.html?id=" + id;
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
                        window.location.href = '../../../view/page/admin/admin.html?level=' + window.btoa('Secondlevel')
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