/**
 * author: 关宁
 * date: 2019.05.16
 */

// 实例化创建请求方式
var request = new Call_Request();

var parent = {
    invoice: '0',
    pay: ''
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
            url: '../subColumn/subColumn.html?type=' + window.btoa('zxdt') + '&id=' + window.btoa(iD.enterprise().column.dynamic) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
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
            url: '../subColumn/subColumn.html?type=' + window.btoa('dxal') +'&id='  + window.btoa(iD.enterprise().column.dxal) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
        },
        {
            city: 'syqy',
            this: '',
            title: '上云企业',
            url: 'cloudService.html?type=' + window.btoa('syqy') + '&level=' + window.btoa('Levelthree')
        }]
    }

    // 为页面模板赋值导航数据
    var Navigation = template('nav-cell', dataStream)
    $('.layui-nav').html(Navigation);

    layui.config({
        base:'../../../../plugin/payStep/'
    }).use([ 'form', 'step'], function () {
        var $ = layui.$, 
        form = layui.form, 
        step = layui.step;

        step.render({
            elem: '#stepForm',
            filter: 'stepForm',
            width: '100%',
            height: '620px',
            stepWidth: '1000px',
            stepItems: [{
                title: '购买服务'
            }, {
                title: '填写核对订单信息'
            }, {
                title: '成功提交订单'
            }]
        });
       
    });

    if (GetQueryString('payType') === '0') {
        $('.PayType').html('<div class="WEIXIN"><i class="iconfont TanSanweixin1"></i>使用微信扫码付款，请在两小时内完成支付。</div>');
    } else {
        $('.PayType').html('<div class="ZHIFUBAO"><i class="iconfont TanSanzhifubao2"></i>使用支付宝扫码付款，请在两小时内完成支付。</div>');
    }
            

    GeneralPart(2);
    SubmitPay();

    $('.mixins').html(window.atob(GetQueryString('pay')) + '元')
})

var ServiceDetails = function () {
    window.location.href = '../buyService/buyService.html?id=' + GetQueryString('id') + '&level=' + window.btoa('Levelthree');
}

var ParkServiceDetails = function () {
    var id = window.atob(GetQueryString('id'));
    window.location.href = '../serviceDetails/serviceDetails.html?id=' + id + '&level=' + window.btoa('Levelthree');
}

var SubmitPay = function (step) {
    request.url = request.Url + request.orderPush
    request.method = "GET"

    request.data = {
        // 相关单据ID
        id: GetQueryString('did'),
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            // 添加支付二维码 
            jQuery('.Qcode').qrcode(data.data.payCode);
            
            requestRefresh(data.data.orderId)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 请求定时刷新支付二维码
var requestRefresh = function (index) {
    request.url = request.Url + request.orderPush + '?id=' + QueryString('did')
    request.method = "GET"

    request.data = {}

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {    
            if(data.data.status === '1') {
                window.location.href = '../paySuccess/paySuccess.html?id=' + GetQueryString('id') + '&level=' + window.btoa('Levelthree')
            }
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();

    // 定时器每秒自执行一次
    setTimeout(function () { 
        requestRefresh(index)
    },1000);
}