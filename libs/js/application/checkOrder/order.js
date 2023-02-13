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
    // 实例化 UI组件
    layui.use('element', function(){
        var element = layui.element;
        element.render();
    });

    layui.config({
        base:'../../../../plugin/step-lay/'
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
       
        form.on('submit(formStep2)', function (data) {
            if (parent.invoice === '' || parent.invoice === '0') {
                if (parent.pay === '') {
                    layer.msg('请选择支付方式');
                    return false;
                } else {
                    if (classModule.session() === '') {
                        layer.msg('支付操作需要登录后进行');
                    } else {
                        SubmitPay(step);
                    }
                }
            } else {
                if ($('input[name=number]').val() === '') {
                    layer.msg('请输入纳税人识别号');
                    return false;
                }

                if ($('input[name=Look]').val() === '') {
                    layer.msg('请输入发票抬头');
                    return false;
                }

                if (parent.pay === '') {
                    layer.msg('请选择支付方式');
                    return false;
                }
                
                if (classModule.session() === '') {
                    layer.msg('支付操作需要登录后进行');
                } else {
                    SubmitPay(step);
                }
            }
            return false;
        });

        form.on('submit(return)', function (data) {
            layer.open({
                title: '温馨提示',
                skin: 'my-skin',
                btn: ['确定', '取消'],
                content: '确定取消该订单吗？',
                btn1: function (index, item) {
                    window.location.href = '../serviceDetails/serviceDetails.html?id=' + GetQueryString('id') + '&type=yffs'
                }
            });
            return false;
        });

        $('.pre').click(function () {
            step.pre('#stepForm');
        });

        $('.next').click(function () {
            step.next('#stepForm');
        });
    });

    // 获取参数总价
    $('._Price').html('￥' + GetQueryString('money') + '元');
    
    // 获取参数商品名称
    $('.name').html(decodeURI(GetQueryString('prodName')))

    $('.invoice span').click(function (even){
        // 取消事件冒泡 
        even.stopPropagation();

        if (even.currentTarget.getAttribute('data-name') === 'invoice') {
            if ($(this).text() == '是') {
                $('#IfShow').show();
            } else {
                $('#IfShow').hide();
            }
            parent.invoice = even.currentTarget.getAttribute('data-id')
            if (even.currentTarget.getAttribute('data-id') === '0') {
                $('.text_input .layui-input').addClass('layui-disabled').attr('disabled', 'disabled').val('')
            } else {
                $('.text_input .layui-input').removeClass('layui-disabled').attr('disabled', false)
            }
        }

        if (even.currentTarget.getAttribute('data-name') === 'pay') {
            parent.pay = even.currentTarget.getAttribute('data-id')
        }

        if ($(even.currentTarget).attr('class') === 'border') {
            $(even.currentTarget).removeClass('border');
            parent.invoice = ''
            parent.pay = ''
        } else {
            $(even.currentTarget).addClass('border');
            $(even.currentTarget).siblings().removeClass('border')
        }
    })

    GeneralPart(2);
})

var ServiceDetails = function () {
    window.location.href = '../serviceDetails/serviceDetails.html?id=' + GetQueryString('id');
}

var SubmitPay = function (step) {
    request.url = request.Url + request.pay
    request.method = "POST"

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.data = JSON.stringify({
        // 纳税人识别号
        invoiceTIN: $('input[name=number]').val(),
        // 发票抬头
        invoiceTitle: $('input[name=Look]').val(),
        // 是否开具发票
        isInvoices: parent.invoice,
        // 支付方式
        payType: parent.pay,
        // 支付金额
        money: String(GetQueryString('money') * 100),
        //商品名称
        prodName: decodeURI(GetQueryString('prodName')),
        // 相关单据ID
        relateId:GetQueryString('id'),
        // 订单类型
        type: '0',
        prodLogo: decodeURI(GetQueryString('prodLogo')),
    })

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            // 判断微信或支付宝付款
            if (parent.pay === '0') {
                $('.PayType').html('<div class="WEIXIN"><i class="iconfont TanSanweixin1"></i>使用微信扫码付款，请在两小时内完成支付。</div>');
            } else {
                $('.PayType').html('<div class="ZHIFUBAO"><i class="iconfont TanSanzhifubao2"></i>使用支付宝扫码付款，请在两小时内完成支付。</div>');
            }
            
            $('.mixins').html('￥' + GetQueryString('money'));

            // 添加支付二维码 
            jQuery('.Qcode').qrcode(data.data.url);
            
            // 跳转下一项扫码页面
            step.next('#stepForm');
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
    request.url = request.Url + request.orderPush + '?id=' + index
    request.method = "GET"

    request.data = {}

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            if(data.data.status === '1') {
                window.location.href = '../paySuccess/paySuccess.html?id=' + GetQueryString('id')
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