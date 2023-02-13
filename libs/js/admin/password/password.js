/**
 * author: 关宁
 * date: 2019.05.19
 */

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
    // 实例化
    layui.use('form', function(){
        var form = layui.form;
        form.render() 

        form.on('submit(Submit)', function (date) {
            if (date.field.pwd === '') {
                parent.layer.msg('请输入新密码')
                return false;
            }

            if (date.field.password === '') {
                parent.layer.msg('请输入确认密码')
                return false;
            }

            if (date.field.pwd.length < 6 || date.field.pwd.length < 6) {
                parent.layer.msg('密码必须大于6位且不能有空格')
                return false;
            }

            if (date.field.password !== date.field.pwd) {
                parent.layer.msg('两次密码不一致')
                return false;
            }

            var loading = parent.layer.load(2, {
                shade: [0.5, '#000']
            })

            request.url = request.Url + request.updatePwd
            request.method = "PUT"

            request.data = JSON.stringify({
                id: classModule.session().id,
                password: hex_md5(date.field.pwd)
            })

            request.token = {
                'Authorization': 'token ' + classModule.session().token,
            }

            request.redata = function (data) {
                parent.layer.close(loading);

                if (data.code === 0 ) {
                    parent.layer.msg(data.msg);
                } else {
                    window.parent.location.href = '../../login/login.html?level=U2Vjb25kbGV2ZWw='
                    $.cookie('session', null, { expires: -1 });
                }
            }

            request.reinfo = function (xhr) {
                console.log(xhr);
            }
            request.run();
        })
    });
})


var GetUesradmin = function () {
    request.url = request.Url + request.admin
    request.method = "GET"

    request.data = {
       id: classModule.session().id
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {
            $('.UserNamePassWord').html(data.data.name);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(GetUesradmin);