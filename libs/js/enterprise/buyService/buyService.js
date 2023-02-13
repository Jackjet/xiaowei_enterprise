/**
 * author: 关宁
 * date: 2019.05.15
 */

// 实例化创建请求方式
var request = new Call_Request();
var Spec = new Array;
var Cycle = new Array;
var attributeContent = new Array;

var parent = {
    attributeId: '',
    name: '',
    imglogo: '',
    userInfo: '',
    userModule: ''
}

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
            url: '../subColumn/subColumn.html?type=' +  window.btoa('zxdt') + '&id=' + window.btoa(iD.enterprise().column.dynamic) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'yffs',
            this: 'layui-this',
            title: '云服务',
            url: 'javascript:;'
        },
        {
            city: 'dxal',
            this: '',
            title: '典型案例',
            url: '../subColumn/subColumn.html?type=' + window.btoa('dxal') + '&id='  + window.btoa(iD.enterprise().column.dxal) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'syqy',
            this: '',
            title: '上云企业',
            url: '../cloudService/cloudService.html?type=' + window.btoa('syqy') + '&level=' + window.btoa('Levelthree')
        }]
    }

    if (classModule.session() === '') {
        console.log('暂未登录');
    } else {
        request.url = request.Url + request.admin
        request.method = "GET"

        request.token = {
            'Authorization': 'token ' + classModule.session().token,
        }

        request.data = {
            id: classModule.session().id
        }

        request.redata = function (data) {
            if (data.code === 0 ) {
                layer.msg(data.msg);
            } else {
                if (data.data.status === '0' && data.data.enterpriseApproval !== '0') {
                    parent.userInfo = '0'
                }

                if (data.data.status === '0' && data.data.upcloudApproval !== '0' || data.data.status === '1' && data.data.upcloudApproval !== '0') {
                    parent.userModule = '1'
                }
            }
        }

        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream)
    $('.layui-nav').html(Navigation);

    layui.use('form', function(){
        var form = layui.form;
        form.render()
    })
    
    $(document).on('click', '.BuySubmit', function () {
        if (classModule.session() === '') {
            layer.msg('当前操作需要登录后进行！');
            return false;
        } else {

            if (parent.userInfo === '0' && parent.userModule === '1') {
                layer.msg('当前企业信息未认证，请认证企业信息后购买！');
                return false;
            }

            if (parent.userInfo === '1') {
                layer.msg('当前企业上云信息未认证，请认证企业上云信息后购买！');
                return false;
            }

            if (Spec.length === 0) {
                layer.msg('请选择服务规格！');
                return false;
            }

            if (Cycle.length === 0) {
                layer.msg('请选择服务周期！');
                return false;
            }
            var Price = $('.BuyPrice').html().split('￥')[1];
            
            window.location.href = '../checkOrder/order.html?attributeId=' + window.btoa(parent.attributeId) + '&id=' + GetQueryString('id') + '&prodName=' +  encodeURI(encodeURI(parent.name)) + '&cycle=' +  window.btoa(Spec[0].split('G')[0]) + '&specs=' +  window.btoa(Cycle[0].split('年')[0]) + '&money=' +  window.btoa(Price) + '&imglogo=' + encodeURI(encodeURI(parent.imglogo)) + '&level=' + window.btoa('Levelthree');
        }
    })

    GeneralPart(2);
})

var cloudServices = function () {
    request.url = request.Url + request.buyServices
    request.method = "GET"

    request.data = {
        id: window.atob(GetQueryString('id'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            $('.webHtml').html(data.data.content)
            parent.imglogo = data.data.logo

            data.data.logo = request.imagesUrl + data.data.logo

            attributeContent.push(eval(data.data.attributeContent))

            data.data.specs = uniq(data.data.specs.split(','));
            data.data.cycle = uniq(data.data.cycle.split(','));
            
            $('.service-loading').css('display', 'none');

            parent.attributeId = data.data.attributeId
            parent.name = data.data.name

            // 为页面模板赋值轮播图数据
            var latest = template('service-cell', data.data);
            $('.CallBack').append(latest)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(cloudServices);

var Contact = function () {
    request.url = request.Url + request.contact
    request.method = "GET"

    request.data = {
        id: window.atob(GetQueryString('id'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
 
            $('.contact-loading').hide();
            data.data['IfLogin'] = classModule.session();

            // 为页面模板赋值轮播图数据
            var contact = template('contact-cell', data.data);
            $('.contact_item').append(contact)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(Contact);

// 选择购买商品规格
var SelectSpecIndex = function (item) {
    // 清空数组 保持为最新
    Spec.splice(0, Spec.length);
    // 清空周期
    Cycle = []
    // 获取当前规格中的服务价格
    var Price = changeMoney(item.getAttribute('data-id'))

    // 判断是否被选中
    if ($(item).find('div').is(":hidden")) {
        // 添加数组
        Spec.push(item.innerText);

        var array = [];
        // 遍历数组集合筛选当前对应周期
        for (var i = 0; i < attributeContent[0].length; i++) {
            if (item.innerText.split('G')[0] === attributeContent[0][i].specs) {
                // 添加遍历后的数组
                array.push(attributeContent[0][i]);
            }
        }

        // 添加当前禁止选中样式
        $('.BuyCycle li').addClass('layui-disabled');

        // 隐藏当前选中角标
        $('.BuyCycle li div').hide();

        // 获取周期表
        var li =  $('.BuyCycle li');

        // 初始化价格
        $('.BuyPrice').html('￥0.00');

        // 移除onClick点击事件
        $('.BuyCycle li').removeAttr("onclick");

        for (var i = 0; i < li.length; i++) {
            // 获取当前周期值
            var TextHtml = li[i].innerText.split('年')[0];
            for (var j = 0; j < array.length; j++) {
                if (TextHtml === array[j].cycle) {
                    // 添加可选样式
                    li[i].className = 'layui'
                    $(li[i]).attr("onclick","SelectCycleIndex(this)");
                }
            }
        }
    } else {

        // 添加当前禁止选中样式
        $('.BuyCycle li').addClass('layui-disabled');
        // 隐藏当前选中角标
        $('.BuyCycle li div').hide();
        // 取消选中后初始化当前价格
        $('.BuyPrice').html('￥0.00');
    }

    // 显示隐藏选中角标
    $(item).find('div').toggle();
    $(item).siblings().find('div').hide();
}

// 选择购买商品周期
var SelectCycleIndex = function (item) {
    // 清空数组 保持为最新
    Cycle.splice(0, Spec.length);
    
    // 获取当前规格中的服务价格
    var Price = changeMoney(item.getAttribute('data-id'));

    if (Spec.length === 0) {
        return false;
    } else {
        // 判断是否被选中
        if ($(item).find('div').is(":hidden")) {
            Cycle.push(item.innerText);

            for (var i = 0; i < attributeContent[0].length; i++) {
                if (item.innerText.split('年')[0] === attributeContent[0][i].cycle && Spec[0].split('G')[0] === attributeContent[0][i].specs) {
                    $('.BuyPrice').html('￥' + changeMoney(attributeContent[0][i].prices));
                }
            }
        } else {
            $('.BuyPrice').html('￥0.00')
        }

        // 显示隐藏选中角标
        $(item).find('div').toggle();
        $(item).siblings().find('div').hide();
    }
}

