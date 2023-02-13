/**
 * author: 关宁
 * date: 2019.05.09
 */

// 实例化创建请求方式
var request = new Call_Request();
var image;

$(function () {
    GeneralPart(2);

    window.parent.iframeHeight(1100);

    request.url = request.Url + request.userDemandfindById
    request.method = "GET"

    request.data = {
        id: GetQueryString('id')
    }
    
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {      
            data.data.logo = request.imagesUrl + data.data.logo;
           
            // 为页面模板赋值一级分类模块数据
            data.data['IfLogin'] = classModule.session()
            var Html = template("Details-cell", data.data);
    
            $('.Details').html(Html);
            if (data.data.file == '') {
                $('.attaChment').hide();
            }
            
            $('.Richtext').append(data.data.content);
            
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();

    layui.use('element', function(){
        var element = layui.element;
        element.render()
    });

    if (QueryString('type') === '0') {
        $('.title').html('我发布的需求')
    } else {
        $('.title').html('我参与的需求')
    }
})

function PreviousPage (page) {

    if (QueryString('type') === '0') {
        window.location.href = '../releasedemand/releasedemand.html'
    } else {
        window.location.href = '../demand/demand.html'
    }
}