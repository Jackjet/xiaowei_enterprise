/**
 * author: 关宁
 * date: 2019.05.20
 */

// 实例化创建请求方式
var request = new Call_Request();

var modules = {
    id: '',
    Cid: ''
}

$(function () {
    // 创建导航栏模块
    var DataStream = {
        array: [{
            name: 'QY',
            this: '',
            title: '找企业',
            url: 'seek.html?did=QY'
        },
        {
            name: 'FW',
            this: '',
            title: '找服务',
            url: 'seek.html?did=FW'
        },
        {
            name: 'YQ',
            this: '',
            title: '找园区',
            url: 'seek.html?did=YQ'
        },
        {
            name: 'ZC',
            this: '',
            title: '找政策',
            url: '../../policy/policy.html?level=U2Vjb25kbGV2ZWw='
        },
        {
            name: 'XQ',
            this: '',
            title: '找需求',
            url: 'seek.html?did=XQ'
        },
        {
            name: 'ZJ',
            this: '',
            title: '找专家',
            url: 'seek.html?did=ZJ'
        }]
    }

    var StringiD = QueryString('did');

    DataStream.array.map(function (item, value) {
        if (StringiD === item.name) {
            item.url = 'javascript:;'
            item.this = 'layui-this'

            $('.title').html(item.title);
        }

        if (StringiD === 'QY') {
            $('.Main_title').html('服务企业');
        }

        if (StringiD === 'FW') {
            $('.Main_title').html('服务项目');
        }

        if (StringiD === 'YQ') {
            $('.Main_title').html('园区信息');
        }

        if (StringiD === 'XQ') {
            $('.Main_title').html('企业需求');
        }

        if (StringiD === 'ZJ') {
            $('.Main_title').html('专家');
        }
    })

    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;

        var Navigation = template('nav-cell', DataStream);
        $('.layui-nav-child').append(Navigation);

        element.render();
    });

    $('.Main_list i').click(function () {
        var name  = $('#UserName').val();
        
        $('.Main_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');

        activity(modules.id, modules.Cid, 1, 8, QueryString('did'), name);
        
    })

    $('body').on('click', '.layui-tab-title li', function (even) {
        // 创建 loading加载效果
        $('.layui-tab-item').html('<div data-loader="circle" class="loading list-loading"></div>');
        $('.Main_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');
        modules.id = even.currentTarget.dataset.id
        modules.Cid = ''
        classSecond(even.currentTarget.dataset.id);
        activity(even.currentTarget.dataset.id, '', 1, 8, QueryString('did'), '');
    })

    $('#notOpen').click(function(){
        $('li').removeClass('layui-this')
        layer.open({
            title: '温馨提示',
            skin: 'my-skin',
            btn: ['关闭'],
            content: '此功能暂未开放'
        });
    });
    GeneralPart(2);
    classSecond('');

    activity('', '', 1, 8, QueryString('did'), '');
})


var webUser = function () {
    if (QueryString('did') === 'YQ' || QueryString('did') === 'ZJ') {
        request.url = request.Url + request.recommend

        request.data = {
            page:1,
            size: 8,
            recommendId: iD.Hot().rmth
        }
    } else {
        request.url = request.Url + request.webUser

        request.data = {
            page:1,
            size: 3,
            isRecommend: '1'
        }
    }

    request.method = "GET"

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {

            if (QueryString('did') === 'YQ' || QueryString('did') === 'ZJ') {
                data.data['type'] = QueryString('did');
            } else {
                data.data.content.map(function (item, value) {
                    item.logo = request.imagesUrl + item.logo
                })
            }

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

    if (QueryString('did') === 'YQ' || QueryString('did') === 'ZJ') {
        return false
    } else {
        request.url = request.Url + request.Class
    
        request.data = {
            size: 9
        }
    }

    request.method = "GET"

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
    if (QueryString('did') === 'YQ') {
        request.url = request.Url + request.dept
        request.data = {}

    } else if (QueryString('did') === 'ZJ') {
        request.url = request.Url + request.research
        request.data = {
            size: 1000
        }

    } else {
        request.url = request.Url + request.secondClass
        request.data = {
            firstTypeId : value,
            size: 1000
        }
    }

    request.method = "GET"

    if (request.data.firstTypeId === '') {
        delete request.data['firstTypeId']
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            var Json = {}

            if (QueryString('did') === 'YQ') {
                data.data['type'] = 'YQ'
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].id == "0000") {
                        data.data.splice(i,1);
                    } if (data.data[i].id == "d1cbd878087d426280badae09f7f53f8") {
                        data.data[i].name = "京冀园区"
                    }
                }
                Json.content = data.data

                var Html = template("tabs-cell", Json);
                $('.layui-tab-item').html(Html);

            } else if (QueryString('did') === 'ZJ') {
                var Html = template("tabs-cell", data.data);
                $('.layui-tab-item').html(Html);

            } else {
                var Html = template("tabs-cell", data.data);
                $('.layui-tab-item').html(Html);
            }

            $('.list-loading').css('display', 'none');
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

var levelClassification = function (item) {
    modules.Cid = item.getAttribute('data-id');

    $(item).addClass('color');
    $(item).siblings().removeClass('color');

    $('.Main_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');
    
    activity('', item.getAttribute('data-id'), 1, 8, QueryString('did'), '');
}


var activity = function (value, index, page, size, Str, name) {
    request.method = "GET"

    if (Str === 'QY') {
        request.url = request.Url + request.findUserByServe
        request.data = {
            firstTypeId : value,
            secondType: index,
            page: page,
            size: size,
            userName: name
        }
    }

    if (Str === 'FW') {
        request.url = request.Url + request.webserve

        request.data = {
            firstTypeId : value,
            secondTypeId: index,
            page: page,
            size: size,
            status: '1',
            name: name
        }
    }

    if (Str === 'YQ') {
        request.url = request.Url + request.park

        request.data = {
            page: page,
            size: size,
            name: name,
            deptId: index,
        }
    }

    if (Str === 'XQ') {
        request.url = request.Url + request.demandFll
        
        request.data = {
            firstTypeId : value,
            secondTypeId: index,
            page: page,
            size: size,
            status: '1',
            isEnd: '0',
            name: name
        }
    }

    if (Str === 'ZJ') {
        request.url = request.Url + request.expert
        
        request.data = {
            firstTypeId : value,
            researchId: index,
            page: page,
            size: size,
            name: name
        }
    }

    if (request.data.deptId === '') {
        delete request.data['deptId']
    }

    if (request.data.name === '') {
        delete request.data['name']
    }

    if (request.data.firstTypeId === '') {
        delete request.data['firstTypeId']
    }

    if (request.data.secondTypeId === '') {
        delete request.data['secondTypeId']
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            data.data['type'] = Str
            
            if (Str === 'QY') {
                data.data.content.map(function (item, index) {
                    item.user.IfLogin = classModule.session()
                    item.user.logo = request.imagesUrl + item.user.logo
                })
            }

            if (Str === 'FW') {
                data.data.content.map(function (item, index) {
                    item.logo = request.imagesUrl + item.logo
                    item.charge = changeMoney(item.charge)
                })
            }

            if (Str === 'XQ') {
                data.data.content.map(function (item, index) {
                    item.IfLogin = classModule.session()
                    item.logo = request.imagesUrl + item.logo
                })  
            }

            if (Str === 'ZJ') {
                data.data.content.map(function (item, index) {
                    item.IfLogin = classModule.session()
                    item.icon = request.imagesUrl + item.icon
                })
            }
            if (Str === 'YQ') {
                data.data.content.map(function (item, index) {
                    var str = item.image
                    item.logo = request.imagesUrl + JSON.parse(str)[0]
                })
            }
            

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
                        if(!first) {
                            $('.Main_list ul').html('<div data-loader="circle" class="loading training-loading"></div>');
                            
                            activity('', '', obj.curr, obj.limit, QueryString('did'), name);
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