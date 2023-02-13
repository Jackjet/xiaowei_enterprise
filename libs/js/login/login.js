/**
 * author: 关宁
 * date: 2019.04.30
 */

// 实例化创建请求方式
var request = new Call_Request();

// 初始化坐标索引值 
var Index = null;

$(function (){
    layui.use('form', function(){
        // 创建表单实例
        var form = layui.form
        form.render()

        // 添加自定义表单验证
        form.verify({
            loginPhone: function (value, item) {
                if (value === '') {
                    return '手机号码不能为空'
                }

                // var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                // if (!loginReg.test(value)) {
                //     return '请输入正确的手机号码'
                // }
            },

            // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            password: [
              /^[\S]{6,12}$/, '密码必须6-12位，不能出现空格'
            ],

            // 自定义注册表单验证
            registerPhone: function (value, item) {
                if (value === '') {
                    return '手机号码不能为空'
                }

                var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!loginReg.test(value)) {
                    return '请输入正确的手机号码'
                }
            },

            registerName: function (value, item) {
                if (value === '') {
                    return '企业名称不能为空'
                }
            },

            registerPassword: [
                /^[\S]{6,12}$/, '密码必须6-12位，不能出现空格'
            ],

            // 自定义忘记密码表单验证
            confirmPassWord: function (value, item) {
                if (value === '') {
                    return '确认密码不能为空'
                }
            },

            GetQcodePhone: function (value, item) {
                if (value === '') {
                    return '手机号码不能为空'
                }

                var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!loginReg.test(value)) {
                    return '请输入正确的手机号码'
                }
            },

            SubmitCode: function (value, item) {
                if (value === '') {
                    return '验证码不能为空'
                }
            },

            SubmitPassWord: [
                /^[\S]{6,12}$/, '密码必须6-12位，不能出现空格'
            ],

            SubmitP: [
                /^[\S]{6,12}$/, '密码必须6-12位，不能出现空格'
            ],
        });

        // 表单提交验证
        form.on('submit(SingIn)', function (date) {
            var loading = layer.load(2, {
                shade: [0.5, '#000']
            })

            SingInlogin(loading, date);
        });

        // 注册提交验证
        form.on('submit(Register)', function (data) {
            if (data.field.confirmPassWord !== data.field.registerPassword) {
                layer.msg('两次密码不一致');
                return false
            }

            var loading = layer.load(2, {
                shade: [0.5, '#000']
            })

            VerifyYourRegistr(loading, data);
        })

        // 提交忘记密码
        form.on('submit(Submit)', function (date) {
            if (date.field.SubmitP !== date.field.SubmitPassWord) {
                layer.msg('两次密码不一致');
                return false
            }

            var loading = layer.load(2, {
                shade: [0.5, '#000']
            })

            ForgotPassWord(loading, date);
        })
    });

    $(document).keydown(function (event) {
        // 敲击回车事件 触发登录按钮
        if (event.keyCode == 13) {
            if (Index === 0) {
                document.getElementById('login').click();
            }
        }
    });

    if (GetQueryString('type') === null) {
        Index = 0;
        $('.login').show();
    } else {
        Index = 1;
        $('.register').show();
    }

    if ($.cookie('TanSanUserPhone') && $.cookie('TanSanPassWord')) {
        $('.loginUser').val($.cookie('TanSanUserPhone'));
        $('.loginPassWord').val($.cookie('TanSanPassWord'));
    }

    GeneralPart(1);
})


/**
 * 用户登录验证
 * @param {*} loading  加载效果
 * @param {*} date 表单信息 用户名 密码
 */

var SingInlogin = function (loading, date) {
    request.url = request.Url + request.SignIn
    request.method = "GET"

    request.data = {
        phone: date.field.loginPhone,
        password: hex_md5(date.field.password),
        type: '0'
    }

    request.redata = function (data) {
        if (data.code === 0) {
            // 如果登录失败 移除loading加载状态
            layer.close(loading);

            // 提示登录失败
            layer.msg(data.msg);
        } else {
            $.cookie('session', JSON.stringify(data.data), {
                path:'/',
            })

            // 如果勾选记住密码 保存当前账号 密码信息
            if ($('.CheckBox').is(':checked')) {
                $.cookie('TanSanUserPhone', date.field.loginPhone, { 
                    path:'/',
                });

                $.cookie('TanSanPassWord', date.field.password, { 
                    path:'/',
                });
            } else {
                // 否则移除当前Cookie信息
                $.cookie('TanSanUserPhone', null, { 
                    path: '/', 
                });

                $.cookie('TanSanPassWord', null, { 
                    path: '/' ,
                });
            }

            var ferrer = document.referrer; 
        
            if($.trim(ferrer) === ""){
                location.href = '../../index.html'; 
            }else{
                // 登录后返回记录上级退出页面
                for (var i = 0; i < $.trim(ferrer).split('/').length; i++) {
                    
                    // 如果当前页面为个人中心则返回首页
                    if ($.trim(ferrer).split('/')[i] === 'password.html') {
                        location.href = '../../index.html';
                    } else {
                        location.href = ferrer; 
                    }
                }
            }
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

/**
 * 注册认证
 * @param {*} element
 */

var VerifyYourRegistr = function (loading, data) {
    request.url = request.Url + request.register
    request.method = "POST"

    request.data = JSON.stringify({
        name: data.field.registerName,
        phone: data.field.registerPhone,
        password: hex_md5(data.field.registerPassword)
    })

    request.redata = function (data) {
        layer.close(loading);
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            layer.msg(data.msg);
            $('.login').show();

            // 清空表单元素
            $('.register, .Forgot').hide();
            $("#SingInRegister")[0].reset();
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }

    request.run(); 
}

/**
 * 忘记密码
 * @param {*} element
 */

var ForgotPassWord = function (loading, date) {
    request.url = request.Url + request.forgetPwd
    request.method = "GET"

    request.data = {
        phone: date.field.GetQcodePhone,
        pwd: hex_md5(date.field.SubmitPassWord),
        code: date.field.SubmitCode,
        type: '1'
    }

    request.redata = function (data) {
        layer.close(loading);
    
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            layer.msg(data.msg);
            $('.login').show();

            // 清空表单元素
            $('.register, .Forgot').hide();
            $("#SubmitQCode")[0].reset();
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取验证码
var verificationCode = function (element) {
    var Countdown = 59;

    // 判断手机号码是否为空
    if ($('#CodePhone').val() === '') {
        layer.msg('手机号不能为空');
        return false;
    }

    $(element).html("正在发送");

    request.url = request.Url + request.SmsSend + '?phone=' + $('#CodePhone').val()
    request.method = "GET"
    
    request.data = {
        type: '1'
    }

    $(element).attr('disabled', true);

    request.redata = function (data) {
        if (data.code === 0) {
            $(element).html("获取验证码");

            // 发送失败
            layer.msg(data.msg);
            $(element).attr('disabled', false);
        } else {
            layer.msg('验证码发送成功，请注意查收！')
            
            // 计时器验证码倒计时
            var timer = setInterval(function() {
                if (Countdown === 0) {

                    // 改变按钮状态
                    $(element).attr('disabled', false);
                    $(element).html("获取验证码");

                    // 清空计时器
                    clearInterval(timer)
                    return false
                } else {
                    $(element).html("重新发送(" + Countdown + ")");
                    Countdown --;
                }
            },1000);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}


// 切换显示登录注册模块
var Register = function (index) {
    var ObtainIndex = $(index).attr('data-id');

    // 取消关闭当前提示信息 
    layer.tips();

    // 根据当前索引值 切换显示内容
    if (ObtainIndex === '0') {
        Index = 1;

        $('.login, .Forgot').hide();
        $('.register').show();
    } else if (ObtainIndex === '1') {
        Index = 0;

        $('.register, .Forgot').hide();
        $('.login').show();
    } else {
        Index = 2;

        $('.login, .register').hide();
        $('.Forgot').show();
    }
}
