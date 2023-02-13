/**
 * author: 关宁
 * date: 2019.05.17
 */

// 实例化创建请求方式
var request = new Call_Request();

var modules = {
    StartTime: '',
    EndTime: '',
    ImageUploadUrl: '',
    FileUpload: '',
    userInfo: '',
    userModule: '',
    content: ''
}

$(function () {
    // 实例化
    layui.use('element', function(){
        var element = layui.element;
        element.render() 
    });

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
                    modules.userInfo = '0'
                }

                if (data.data.status === '0' && data.data.upcloudApproval !== '0' || data.data.status === '1' && data.data.upcloudApproval !== '0') {
                    modules.userModule = '1'
                }
            }
        }

        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }

    layui.use(['form', 'layedit'], function(){
        var form = layui.form,
        layedit = layui.layedit;

        layedit.set({
            uploadImage: {
                url: request.Url + request.uploadIconText,
                type: 'POST'
            }
        });

        var index = layedit.build('LAY_editor', {
            tool: ['strong', 'italic', 'underline','del', '|', 'left', 'center', 'right', '|', 'face']
        });

        request.url = request.Url + request.Class
        request.method = "GET"

        request.data = {}

        request.redata = function (data) {
            if (data.code === 0 ) {
                layer.msg(data.msg); 
            } else {
                var Html = '';

                data.data.content.map(function (item, index) {
                    Html += '<option value="'+ item.id +'">'+ item.name +'</option>'
                })

                $('.oneClass').append(Html);
                form.render("select");

                if (QueryString('id')) {
                    request.url = request.Url + request.userActivityByid
                    request.method = "GET"
            
                    request.data = {
                        id: QueryString('id')
                    }

                    request.token = {
                        'Authorization': 'token ' + classModule.session().token,
                    }
            
                    request.redata = function (data) {
                        if (data.code === 0 ) {
                            layer.msg(data.msg); 
                        } else {
                            $('input[name=name]').val(data.data.name);
                            $('input[name=startTime]').val(data.data.startTime);                             $('input[name=endTime]').val(data.data.endTime);
                            $('input[name=contacts]').val(data.data.contacts);
                            $('input[name=contactsPhone]').val(data.data.contactsPhone);
                            $('input[name=host]').val(data.data.host);
                            $('input[name=undertake]').val(data.data.undertake);
                            $('#LAY_layedit_1').contents().find('body').html(data.data.content);
                            $('#Upimg').attr('src', request.imagesUrl + data.data.image)
            
                            modules.ImageUploadUrl = data.data.image

                            $('.buttonUp span').html('附件名称：' + data.data.file);
                            modules.FileUpload = data.data.file

                            $('#filter').val(data.data.firstTypeId);
                            
                            request.url = request.Url + request.secondClass
                            request.method = "GET"
                
                            request.data = {
                                firstTypeId: data.data.firstTypeId
                            }
                
                            request.redata = function (date) {
                                if (date.code === 0 ) {
                                    layer.msg(date.msg); 
                                } else {
                                    var Html = '<option value=""></option>';
                
                                    date.data.content.map(function (item, index) {
                                        Html += '<option value="'+ item.id +'">'+ item.name +'</option>'
                                    })
                
                                    $('.SubClass').html(Html);

                                    $('#second').val(data.data.secondTypeId);
                                    form.render("select");
                                }
                            }
                
                            request.reinfo = function (xhr) {
                                console.log(xhr);
                            }
                            request.run();
                            
                            $('#address').val(data.data.address)
                        }
                    }
            
                    request.reinfo = function (xhr) {
                        console.log(xhr);
                    }
                    request.run();
                }
            }
        }

        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();

        form.on('select(filter)', function(data){
            request.url = request.Url + request.secondClass
            request.method = "GET"

            request.data = {
                firstTypeId: data.value
            }

            request.redata = function (data) {
                if (data.code === 0 ) {
                    layer.msg(data.msg); 
                } else {
                    var Html = '<option value=""></option>';

                    data.data.content.map(function (item, index) {
                        Html += '<option value="'+ item.id +'">'+ item.name +'</option>'
                    })

                    $('.SubClass').html(Html);
                    form.render("select");
                }
            }

            request.reinfo = function (xhr) {
                console.log(xhr);
            }
            request.run();
        })

        form.verify({
            name: function (value, item) { 
                if(value === ''){
                    return '请输入活动名称';
                }
            },

            StartTime: function (value, item) {
                if (value === '') {
                    return '请选择开始时间';
                }
            },

            EndTime: function (value, item) {
                if (value === '') {
                    return '请选择结束时间';
                }
            },

            Contact: function (value, item) {
                if (value === '') {
                    return '请输入联系人';
                }
            },

            Phone: function (value, item) {
                if (value === '') {
                    return '请输入联系电话'
                }

                var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!loginReg.test(value)) {
                    return '请输入正确的手机号码'
                }
            },

            organizer: function (value, item) {
                if (value === '') {
                    return '请输入主办单位'
                }
            },

            undertake: function (value, item) {
                if (value === '') {
                    return '请输入承办单位'
                }
            },

            mainClass: function (value, item) {
                if (value === '') {
                    return '请选择一级分类'
                }
            },

            SubClass: function (value, item) {
                if (value === '') {
                    return '请选择子分类'
                }
            },

            address: function (value, item) {
                if (value === '') {
                    return '请输入活动地址'
                }
            }
        });

        form.on('submit(Submit)', function (data) {
            modules.content = layedit.getContent(index)
            
            if (classModule.session() === '') {
                layer.msg('当前操作需要登录后进行！');
                return false;
            }

            if (modules.userInfo === '0' && modules.userModule === '1') {
                layer.msg('当前企业信息未认证，请认证企业信息后再提交！');
                return false;
            }

            if (modules.userInfo === '1') {
                layer.msg('当前企业上云信息未认证，请认证企业上云信息后购买！');
                return false;
            }

            if (modules.ImageUploadUrl === '') {
                layer.msg('请上传活动主图！');
                return false;
            }

            if (modules.content === '') {
                layer.msg('请填写活动内容！');
                return false;
            }

            PostSubmit(data)
        });
    });

    layui.use('laydate', function(){
        var laydate = layui.laydate;

        // 初始化时间控件
        var StartTime = laydate.render({
            elem: '#StartTime',
            type: 'datetime',
            format: 'yyyy-MM-dd HH:mm:ss',
            theme: '#e4393c',
            calendar: true,
            ready: formatminutes,
            //min: CurrentTime(),
            done: function(value, date, endDate){
                EndTime.config.min = {  
                    year:date.year,   
                    month:date.month - 1,   
                    date: date.date,
                    hours: date.hours,
                    minutes: date.minutes,
                    seconds: date.seconds
                };
            }
        });

        // 初始化时间控件
        var EndTime = laydate.render({
            elem: '#EndTime',
            type: 'datetime',
            format: 'yyyy-MM-dd HH:mm:ss',
            theme: '#e4393c',
            calendar: true,
            ready: formatminutes,
            min: '',
            done: function(value, date, endDate){
                StartTime.config.max = {  
                    year:date.year,   
                    month:date.month - 1,  
                    date: date.date,
                    hours: date.hours,
                    minutes: date.minutes,
                    seconds: date.seconds
                } 
            }
        });
    });

    layui.use('upload', function(){
        var $ = layui.jquery,
        upload = layui.upload;

        upload.render({
            elem: '#imageUpload',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('活动主图上传失败');
                } else {
                    $('#Upimg').attr('src', request.imagesUrl + res.data)
                    modules.ImageUploadUrl = res.data
                }
            },
            choose: function (data) {
                // console.log(data)
            },
            error: function (xhr) {
                console.log(xhr)
            }
        });

        upload.render({
            elem: '#fileUp',
            url: request.Url + request.upload,
            accept: 'file',
            before: function (obj){
                layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function(res, index, upload){
                layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('活动附件上传失败');
                } else {

                    $('.buttonUp span').html('附件名称：' + res.data);
                    modules.FileUpload = res.data
                }
            },
            choose: function (data) {
                data.preview(function(index, file, result){
                    // console.log(index)
                    // console.log(file)
                    // console.log(result)
                })
            },
            error: function (xhr) {
                console.log(xhr)
            }
        });
    })
    GeneralPart(2);
})

function  formatminutes(date) {
    var showtime = $($(".laydate-time-list li ol")[1]).find("li");

    for (var i = 0; i < showtime.length; i++) {
        var t00 = showtime[i].innerText;
        if (t00 != "00" && t00 != "20" && t00 != "30" && t00 != "40" && t00 != "50") {
            showtime[i].remove()
        }
    }

    $($(".laydate-time-list li ol")[2]).find("li").remove();
}

var PostSubmit = function (item) {
    layer.load(2, {
        shade: [0.5, '#000']
    })

    if (QueryString('id')) {
        request.url = request.Url + request.userActivityupdate
        request.method = "PUT"

    } else {
        request.url = request.Url + request.Postinsert
        request.method = "POST"
    }

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    if (item.field.file === '') {
        delete item.field['file'];
    }

    item.field['content'] = modules.content;
    item.field['image'] = modules.ImageUploadUrl;
    item.field['file'] = modules.FileUpload;
    item.field.id = QueryString('id');

    request.data = JSON.stringify(item.field)

    request.redata = function (data) {
        layer.closeAll('loading');

        if (data.code === 0 ) {
            layer.msg(data.msg); 

        } else {
            layer.msg(data.msg);

            $("#Form")[0].reset();
            layui.form.render();

            modules.ImageUploadUrl = '';
            modules.FileUpload = '';   
            
            $('#Upimg').attr('src', '');
            
            $('.buttonUp span').html('');
            $('#LAY_layedit_1').contents().find('body').html('');
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}