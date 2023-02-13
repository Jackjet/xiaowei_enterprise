/**
 * author: 关宁
 * date: 2019.05.19
 */

// 实例化创建请求方式
var request = new Call_Request();

var dataJson;

$(function () {
    request.url = request.Url + request.admin
    request.method = "GET"

    request.data = {
       id: classModule.session().id
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            dataJson = data.data

            var Html = template("user-cell", data.data);
            $('.templet').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();

    window.parent.iframeHeight(document.body.clientHeight);
})


var authentication = function (event) {
    var value;
    var index;

    if (event.getAttribute('data-name') === 'info' && event.getAttribute('data-id') === '0') {
        value = '0'
        index = '0'
    }

    if (event.getAttribute('data-name') === 'info' && event.getAttribute('data-id') === '1') {
        value = '1'
        index = '1'
    }

    if (event.getAttribute('data-name') === 'Cloud' && event.getAttribute('data-id') === '0') {
        if (dataJson.status === '0' && dataJson.enterpriseApproval !== '0') {
            parent.layer.msg('请完成企业信息认证后，开启企业上云认证');
            return false;
        }

        if(dataJson.status === '0' && dataJson.upcloudApproval !== '0' || dataJson.status === '1' && dataJson.upcloudApproval !== '0') {	
            value = '2'
        }
    }

    if (event.getAttribute('data-name') === 'Cloud' && event.getAttribute('data-id') === '1') {
        value = '2'
        index = '2'
    }

    var Parent = window.parent.document.getElementById("iframe");
    Parent.setAttribute('src', 'manage/manage.html?value=' + value + '&index=' + index)
}

function Reject (item) {
    request.url = request.Url + request.admin
    request.method = "GET"

    request.data = {
       id: classModule.session().id
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            /**
             * @param type  弹出层动态样式标识.
             * @param title 是否显示弹出层标题.
             * @param closeBtn  是否显示右上角关闭按钮
             * @param shadeClose  点击空白是否关闭弹出层
             */
            
            if (item.getAttribute('data-name') === 'info') {
                data.data.remark = data.data.ext1
            } else {
                data.data.remark = data.data.ext2
            }
           
            parent.layer.open({
                type: 1,
                title: '驳回原因',
                closeBtn: 0,
                skin: 'layui_Popup',
                shadeClose: true,
                content: data.data.remark
            });
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
