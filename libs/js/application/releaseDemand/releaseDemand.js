/**
 * author: 关宁
 * date: 2019.05.20
 */

// 实例化创建请求方式
var request = new Call_Request();

var modules = {
    userInfo: '',
    userModule: '',
    ImageUploadUrl: ''
}

$(function () {
     // 实例化 UI组件
     layui.use(['element', 'upload', 'form'], function(){
        var element = layui.element;
        element.render();

        var form = layui.form;

        var upload = layui.upload;

        upload.render({
            elem: '#imageUpload',
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
                    layer.msg('活动主图上传失败');
                } else {
                    $('#Upimg').attr('src', request.imagesUrl + res.data)

                    modules.ImageUploadUrl = res.data
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
    });
    $('#notOpen').click(function(){
        $('li').removeClass('layui-this')
        layer.open({
            title: '温馨提示',
            skin: 'my-skin',
            btn: ['关闭'],
            content: '此功能暂未开放'
        });
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
        var form = layui.form;

        if (classModule.session() !== '') {
            $('#USERNAME').val(classModule.session().name)
        }
    
        var layedit = layui.layedit;

        layedit.set({
            uploadImage: {
                url: request.Url + request.uploadIconText,
                type: 'POST'
            }
        });

        var index = layedit.build('textarea', {
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
                    request.url = request.Url + request.userDemandfindById
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
                            $('input[name=contacts]').val(data.data.contacts);
                            $('input[name=contactsPhone]').val(data.data.contactsPhone);
                            $('#Upimg').attr('src', request.imagesUrl + data.data.logo)
                            $('#LAY_layedit_1').contents().find('body').html(data.data.content);
                            modules.ImageUploadUrl = data.data.logo
                            
                            $('#filter').val(data.data.firstTypeId);
                            
                            form.render();

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
                                    form.render();
                                }
                            }
                            
                            $('#address').val(data.data.address)
                        }

                        request.reinfo = function (xhr) {
                            console.log(xhr);
                        }
                        request.run();
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
            firstTypeId: function (value, item) {
                if (value === '') {
                    return '请输入一级分类'
                }
            },

            name: function (value, item) { 
                if(value === ''){
                    return '请输入服务名称';
                }
            },

            contacts: function (value, item) {
                if (value === '') {
                    return '请输入联系人';
                }
            },

            contactsPhone: function (value, item) {
                if (value === '') {
                    return '请输入联系电话'
                }

                var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!loginReg.test(value)) {
                    return '请输入正确的手机号码'
                }
            }, 

            address: function (value, item) {
                if (value === '') {
                    return '请输入详细地址'
                }
            }
        });

        form.on('submit(Submit)', function (data) {
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

            if (layedit.getContent(index) === '') {
                layer.msg('请编辑需求概述');
                return false
            }
            data.field.content = layedit.getContent(index)
            data.field.status = "0"
            data.field.logo = modules.ImageUploadUrl

            if (QueryString('id')) {
                request.url = request.Url + request.userDemandupdate
                request.method = "PUT"

                data.field.id = QueryString('id')
            } else {
                request.url = request.Url + request.demand
                request.method = "POST"
            }

            if (data.field.secondTypeId === '') {
                delete data.field['secondTypeId']
            }

            request.data = JSON.stringify(data.field)

            request.token = {
                'Authorization': 'token ' + classModule.session().token,
            }    

            request.redata = function (data) {
                if (data.code === 0 ) {
                    layer.msg(data.msg); 
                } else {
                    layer.msg(data.msg);

                    $("#Form")[0].reset();
                    layui.form.render();

                    $('#LAY_layedit_1').contents().find('body').html('');

                    $('#Upimg').attr('src', '')
                }
            }

            request.reinfo = function (xhr) {
                console.log(xhr);
            }
            request.run();
        })
    });
    
    GeneralPart(2);
})


var webUser = function () {
    request.url = request.Url + request.webUser
    request.method = "GET"

    request.data = {
        page:1,
        size: 3,
        isRecommend: '1'
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            data.data.content.map(function (item, value) {
                item.logo = request.imagesUrl + item.logo
            })

            var latest = template('list-cell', data.data);
            $('.DetailsMain_right ul').html(latest);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(webUser);


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