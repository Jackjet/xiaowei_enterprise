/**
 * author: 关宁
 * date: 2019.05.19
 */

// 实例化创建请求方式
var request = new Call_Request();

var time = {
    startTime: '',
    endTime: CurrentTime(),
    index: ''
}

$(function () {
    // 实例化
    layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });

    layui.use('form', function(){
        var form = layui.form;
        form.render();

        form.on('select(brickType)', function (data) {
            var value = data.value
            if (value === '0') {
                time.startTime = MonthBefor()
            }

            if (value === '1') {
                time.startTime = getPastHalfYear()
            }

            if (value === '2') {
                time.startTime = getPassYearFormatDate()
            }

            $('.order').html('<div data-loader="circle" class="loading list-loading"></div>');
            
            GetUesradmin(1, 5, '');
        })
    });

    $(document).on('click', '.table_body li', function (event) {
        $('.order').html('<div data-loader="circle" class="loading list-loading"></div>');
        
        time.index = event.target.dataset.id
        GetUesradmin(1, 5)
    })

    $(document).on('click', '.payment', function (event) {
        if (event.target.getAttribute('data-id') === '1') {
            parent.window.location.href = '../../enterprise/payment/payment.html?id=' + window.btoa(event.target.getAttribute('data-name')) + '&did=' + event.target.getAttribute('data-did') + '&pay=' + window.btoa(event.target.getAttribute('data-pay')) + '&payType=' + event.target.getAttribute('data-payType') + '&level=' + window.btoa('Levelthree')
        } else {
            parent.window.location.href = '../../application/payment/payment.html?id='  + window.btoa(event.target.getAttribute('data-name'))  + '&did=' + event.target.getAttribute('data-did')+ '&pay=' + window.btoa(event.target.getAttribute('data-pay')) + '&payType=' + event.target.getAttribute('data-payType') + '&level=' + window.btoa('Levelthree')
        }
    })

    GetUesradmin(1, 5);
})

var GetUesradmin = function (page, size) {
    request.url = request.Url + request.userOrder
    request.method = "GET"

    request.data = {
        status: time.index,
        page: page,
        size: size,
        startTime: time.startTime,
        endTime: time.endTime
    }

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    if (request.data.status === '') {
        delete request.data['status']
    }

    if (request.data.startTime === '') {
        delete request.data['startTime']
    }

    if (request.data.endTime === '') {
        delete request.data['endTime']
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            for (var i = 0; i < data.data.content.length; i++) {
                data.data.content[i].prodLogo = request.imagesUrl + data.data.content[i].prodLogo
                data.data.content[i].money = changeMoney(data.data.content[i].money)
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
                    limit: 5,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if (!first) {
                            // 创建loading 加载元素
                            $('.order').html('<div data-loader="circle" class="loading list-loading"></div>');

                            GetUesradmin(obj.curr, obj.limit);
                        }
                    }
                })
            })

            var Html = template("user-cell", data.data);
            $('.order').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}; 

function orderDetails (item) {
    var Parent = window.parent.document.getElementById("iframe");
    Parent.setAttribute('src', 'orderDetails/orderDetails.html?id=' + item.getAttribute('data-id'))
}