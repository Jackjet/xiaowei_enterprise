/**
 * author: 关宁
 * date: 2019.05.19
 */

// 实例化创建请求方式
var request = new Call_Request();

layui.config({
    base: '../../../../plugin/layui/',
    version: '1.0'
});

layui.use(['form', 'layarea'], function () {
    var form = layui.form,
    layarea = layui.layarea;
    form.render();
    console.log(2)
    layarea.render({
        elem: '#area-picker',
        data: {
            province: '河北省',
            city: '唐山市',
            county: '',
        },
        change: function (data) {
            Module.area[0] = data.province; // 省
            Module.area[1] = data.city;     // 市
            Module.area[2] = data.county;   // 区
        }
    });
});

layui.use(['form', 'layarea'], function () {
    var form = layui.form,
    layarea = layui.layarea;
    form.render();
    layarea.render({
        elem: '#area-picker0',
        change: function (data) {
            Module.bankCity[0] = data.province; // 省
            Module.bankCity[1] = data.city;     // 市
            Module.bankCity[2] = data.county;   // 区
        }
    });
});

var Module = {
    area: ['河北省', '唐山市', '路南区'],
    industry: '',
    checkbox: [],
    industryId: [],
    certificates: ['', '', ''],
    honor: ['', '', ''],
    logo: '',
    userInfo: '',
    userModule: '',
    circuit: true,
    lastr: '',
    flex: true,
    scanningCopy: ['', '', ''],
    corporateImage: ['', ''],
    bankCity: ['河北省', '唐山市', '路南区'],
}

var Parent = window.parent.document.getElementById("iframe");


// 获取当前用户个人信息
var adminUserInfo = function (index) {
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
            parent.layer.msg(data.msg);
        } else {

            if (index !== undefined) {
                Module.flex = false

                if (data.data.certificates !== null && data.data.certificates !== 'null') {
                    data.data.certificates = data.data.certificates.split(',');
               
                    data.data.certificates.map(function (item, index) {
                        if (item === '') {
                            data.data.certificates.splice(index, 1)
                        }
                    })
                }

                if (data.data.honor !== null && data.data.honor !== 'null') {
                    data.data.honor = data.data.honor.split(',');

                    data.data.honor.map(function (item, index) {
                        if (item === '') {
                            data.data.honor.splice(index, 1)
                        }
                    })    
                }

                if (data.data.industryId !== null && data.data.industryId !== 'null') {
                    data.data.industryId = data.data.industryId.split(',');
                
                    data.data.industryId.map(function (item, index) {
                        if (item === '') {
                            data.data.industryId.splice(index, 1)
                        }
                    })
                }

                data.data.industry = data.data.industry.split(',').join(' / ');

                if (data.data.scanningCopy !== null && data.data.scanningCopy !== 'null') {
                    data.data.scanningCopy = data.data.scanningCopy.split(',');

                    data.data.scanningCopy.map(function (item, index) {
                        if (item === '') {
                            data.data.scanningCopy.splice(index, 1)
                        }
                    })
                }
                
                if (data.data.corporateImage !== null && data.data.corporateImage !== 'null') {
                    data.data.corporateImage = data.data.corporateImage.split(',');
                }

                data.data.imagesUrl = request.imagesUrl

                var Html = template("admin-cell", data.data);
                $('.enterprise').html(Html);

                var Html = template("admin1-cell", data.data);
                $('.CloudBox').html(Html);

            } else {
                // 填写数据
                // 企业认证部分
                $('input[name=name]').val(data.data.name);
                $('input[name=contact]').val(data.data.contact);
                $('input[name=contactPhone]').val(data.data.contactPhone);


                if (data.data.area) {
                    console.log(1)
                    var areaArr = (data.data.area).split(',');
                    $('select[name=province]').next().find('input').click();
                    $('select[name=province]').next().find('dd[lay-value=' + areaArr[0] + ']').click();
                    setTimeout(function(){
                        $('select[name=prcityovince]').next().find('input').click();
                        $('select[name=prcityovince]').next().find('dd[lay-value=' + areaArr[1] + ']').click();
                        setTimeout(function(){
                            $('select[name=county]').next().find('input').click();
                            $('select[name=county]').next().find('dd[lay-value=' + areaArr[2] + ']').click();
                        },20);
                    },20);
                }

                $('textarea[name=address]').val(data.data.address);
                $('input[name=website]').val(data.data.website);

                var industryArr = (data.data.industry).split(',');
                setTimeout(function(){
                    for (var i = 0; i < industryArr.length; i++) {
                        $('.layui-form-checkbox span').each(function(){
                            if (industryArr[i] == $(this).text()) {
                                $(this).click();
                            }
                        });
                    }
                },500);

                $('input[name=isApproval]').val(data.data.isApproval);
                $('textarea[name=mainService]').val(data.data.mainService);
                $('textarea[name=introduction]').val(data.data.introduction);

                // 企业上云部分
                $('input[name=properties]').val(data.data.properties);
                $('input[name=establishedTime]').val(data.data.establishedTime);
                $('input[name=scale]').val(data.data.scale);
                $('input[name=email]').val(data.data.email);
                $('input[name=businessRegistration]').val(data.data.businessRegistration);
                $('input[name=corporate]').val(data.data.corporate);
                $('input[name=bankName]').val(data.data.bankName);

                if (data.data.bankCity) {
                    var bankCityArr = (data.data.bankCity).split(',');
                    $('select[name=province0]').next().find('dd[lay-value=' + bankCityArr[0] + ']').click();
                    setTimeout(function(){
                        $('select[name=city0]').next().find('dd[lay-value=' + bankCityArr[1] + ']').click();
                        setTimeout(function(){
                            $('select[name=county0]').next().find('dd[lay-value=' + bankCityArr[2] + ']').click();
                        },20);
                    },20);
                }

                $('textarea[name=bankAddress]').val(data.data.bankAddress);
                $('input[name=bank]').val(data.data.bank);
                $('input[name=eterpriseAccount]').val(data.data.eterpriseAccount);
                $('input[name=bankContact]').val(data.data.bankContact);


                // 填写数据结束

                if (data.data.upcloudApproval === '1') {
                    Module.lastr = 0
                }

                if (data.data.enterpriseApproval === '0' && data.data.upcloudApproval === '0') {
                    Module.userModule = true
                }

                if (data.data.status === '0' && data.data.enterpriseApproval !== '0') {
                    Module.userInfo = true
                } else {
                    Module.userInfo = ''
                    Module.circuit = false
                    Module.userModule = true
                }
    
                if (data.data.status === '0' && data.data.upcloudApproval !== '0' || data.data.status === '1' && data.data.upcloudApproval !== '0') {
                    Module.userModule = false
                }
            }
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(adminUserInfo);


// 控制器是否显示上云认证项
var itemController = function (e) {
    if (Module.userInfo === true && Module.userModule === false) {
        layui.use('element', function () {
            var element = layui.element;
            element.render()

            element.on('collapse(layui)', function(data){
                data.show = false
            });
        })
        parent.layer.msg('请完成企业信息认证未后，开启企业上云认证！');
        return false;
    }

    if (Module.userModule || Module.lastr === 0) {   
        $('.contentBox1 .layui-form').hide();
        adminUserInfo(0);

        window.parent.iframeHeight(1250);
        return false;
    }

    if (Module.userInfo === true) {
        $('.contentBox1 .layui-form').hide();
        adminUserInfo(0);

        window.parent.iframeHeight(1250);
        return false;
    }

    $('.contentBox1 .CloudBox').hide();

    e.className = 'layui-colla-title';
    window.parent.iframeHeight(1370);
}


// 获取所属行业部分复选数据
var industryCheckBox = function () {
    request.url = request.Url + request.industry
    request.method = "GET"

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.data = {
        page: 1,
        size: 100
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {
            var Html = template("user-cell", data.data);
            $('.radio_full').html(Html);

            // 重新赋值后初始化复选框
            layui.use('form', function () {
                layui.form.render();
            })
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(industryCheckBox);

var notYetopen = function () {
    parent.layer.msg('此功能暂未开放！');
    return false;
}

// 提交企业信息认证
var Submit_enterprise = function (info, layer) {
    request.url = request.Url + request.register2
    request.method = "PUT"

    request.data = JSON.stringify(info);

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        parent.layer.closeAll('loading');

        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {
            parent.layer.msg('企业信息提交成功，请等待审核');
            layui.form.render();

            // 初始化表单 清空表单图片项
            document.getElementById('Form').reset();

            // 重新获取当前认证状态
            adminUserInfo();
            window.parent.iframeHeight(1370);

            if (Module.lastr === 0) {
                window.location.href = '../certification/certification.html'
            } else {

                if (Module.userInfo === true) {
                    $('#enterprise > div').removeClass('layui-show');
                    $('#cloudBus > div').addClass('layui-show');
                    window.location.href = '../certification/certification.html'

                    return false;
                }

                $('.layui-upload-img').attr('src', '');
                $('#enterprise > div').removeClass('layui-show');
                $('#cloudBus > div').addClass('layui-show');
                $('.contentBox1 .CloudBox').hide();
            }
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 控制器是否显示企业信息认证项
var enterprise = function (item) {

    if (!Module.circuit && Module.flex) {
        adminUserInfo(item);
        $('.contentBox .enterprise').show();
    }

    if (!Module.circuit) {
        window.parent.iframeHeight(1150);
        
        adminUserInfo(item);
        $('.contentBox .enterprise').show();

        $('.contentBox .layui-form').hide();
    } else {
        window.parent.iframeHeight(1600);
    }

    return;
}
addLoadEvent(enterprise);


// 完成企业上云信息模块认证
var SubmitCloudBusiness = function (info) {
    request.url = request.Url + request.register3
    request.method = "PUT"

    request.data = JSON.stringify(info);
    
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        parent.layer.closeAll('loading');

        if (data.code === 0 ) {
            parent.layer.msg(data.msg);
        } else {
            parent.layer.msg('企业上云信息提交成功，请等待审核！');
            window.location.href = '../certification/certification.html'
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

$(function () {
    // 获取当前定义显示认证索引值
    var iframeIndex = QueryString('index');
    var iframeValue = QueryString('value');

    if (iframeIndex === 'undefined' && iframeValue === '2') {
        $('.contentBox1').addClass('layui-show');
        window.parent.iframeHeight(1370);

        $('.contentBox1 .CloudBox').hide();
    } else {

        $('.enterprise').hide();
        $('.contentBox').addClass('layui-show');
        window.parent.iframeHeight(1600);
    }

    if (iframeIndex === '1' && iframeValue === '1') {
        $('.contentBox').addClass('layui-show');

        window.parent.iframeHeight(1150);
       
        adminUserInfo(0);
        $('.enterprise').show();
        $('.contentBox .layui-form').hide();
    }

    if (iframeIndex === '2' && iframeValue === '2') {
        $('.contentBox1').addClass('layui-show');
        $('.contentBox1 .layui-form').hide();
        $('#enterprise > div').removeClass('layui-show');
        window.parent.iframeHeight(1200);
        
        adminUserInfo(0);
    }

    layui.use(['layer', 'form', 'element'], function () {
        var form = layui.form,
        element = layui.element;
        form.render();
        element.render()

        form.on('checkbox', function (data) {
            Module.checkbox.push(data.othis[0].innerText)

            // 转为字符串进行匹配筛选去重
            var Str = Module.checkbox.join(",") + ",";
            
            for(var i = 0; i < Module.checkbox.length; i++) {
                if(Str.replace(Module.checkbox[i] + ",", "").indexOf(Module.checkbox[i] + ",") >-1) {
                    Module.checkbox.splice(i, 1);
                    Module.checkbox.pop();
                    break;
                }
            }

            Module.industryId.push(data.value)

            var StrName = Module.industryId.join(",") + ",";

            for(var i = 0; i < Module.industryId.length; i++) {
                if(StrName.replace(Module.industryId[i] + ",", "").indexOf(Module.industryId[i] + ",") >-1) {
                    Module.industryId.splice(i, 1);
                    Module.industryId.pop();
                    break;
                }
            }
        })

        // 提交认证表单认证自定义提示信息
        form.verify({
            name: function (value, item) { 
                if(value === ''){
                    return '请输入企业名称';
                }
            },

            contact: function (value, item) {
                if (value === '') {
                    return '请输入联系人';
                }
            },

            contactPhone: function (value, item) {
                if (value === '') {
                    return '请输入联系电话'
                }

                var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!loginReg.test(value)) {
                    return '请输入正确的手机号码'
                }
            },

            isApproval: function (value, item) {
                if (value === '') {
                    return '请输入机构代码'
                }
            },

            properties: function (value, item) {
                if (value === '') {
                    return '请输入企业性质'
                }
            },

            establishedTime: function (value, item) {
                if (value === '') {
                    return '请选择成立时间'
                }
            },

            contactPhone1: function (value, item) {
                if (value === '') {
                    return '请输入联系电话'
                }

                var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!loginReg.test(value)) {
                    return '请输入正确的手机号码'
                }
            },

            scale: function (value, item) {
                if (value === '') {
                    return '请输入企业规模'
                }
            },

            email1: function (value, item) {
                if (value === '') {
                    return '请输入电子邮箱'
                }

                var  email = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
                if (!email.test(value)) {
                    return '请输入正确的电子邮箱'
                }
            },

            businessRegistration: function (value, item) {
                if (value === '') {
                    return '请输入工商登记名称'
                }
            },

            corporate: function (value, item) {
                if (value === '') {
                    return '请输入法人代表'
                }
            },

            bankName: function (value, item) {
                if (value === '') {
                    return '请输入银行名称'
                }
            },

            bank: function (value, item) {
                if (value === '') {
                    return '请输入开户银行'
                }
            },

            eterpriseAccount: function (value, item){
                if (value === '') {
                    return '请输入企业对公账号'
                }
            },

            bankContact: function (value, item){
                if (value === '') {
                    return '请输入银行账户联系电话'
                }
            }
        });
        
        form.on('submit(Submit)', function (date) {
            if (Module.checkbox.length === 0) {
                parent.layer.msg('请选择所属行业');
                return false;
            }

            if (Module.certificates.length === 0 || Module.certificates[0] === '' && Module.certificates[1] === '' && Module.certificates[2] === '') {
                parent.layer.msg('请上传企业证件');
                return false;
            }

            if (Module.logo === '') {
                parent.layer.msg('请上传企业logo');
                return false;
            }

            date.field.area = Module.area.join(",");

            date.field.industry = Module.checkbox.join(",");
            date.field.industryId = Module.industryId.join(",");

            
            if (Module.certificates[0] === '') {
                Module.certificates.splice(0, 1)
            }

            
            if (Module.certificates[1] === '') {
                Module.certificates.splice(1, 1)
            }

            if (Module.certificates[2] === '') {
                Module.certificates.splice(2, 1)
            }

            date.field['certificates'] = Module.certificates.join(",")

            if (Module.honor[0] === '') {
                Module.honor.splice(0, 1)
            }

            if (Module.honor[1] === '') {
                Module.honor.splice(1, 1)
            }

            if (Module.honor[2] === '') {
                Module.honor.splice(2, 1)
            }

            date.field['honor'] = Module.honor.join(",")
            date.field['logo'] = Module.logo

            date.field['id'] = classModule.session().id

            if (date.field.file === '') {
                delete date.field['file']
            }

            parent.layer.load(2, {
                shade: [0.5, '#000']
            })

            Submit_enterprise(date.field, layer)
        })

        form.on('submit(CloudSubmit)', function (date) {
            if (Module.scanningCopy.length === 0 || Module.scanningCopy[0] === '' && Module.scanningCopy[1] === '' && Module.scanningCopy[2] === '') {
                parent.layer.msg('请上传证件扫描件');
                return false;
            }

            if (Module.corporateImage.length === 0 || Module.corporateImage[0] === '' || Module.corporateImage[1] === '') {
                parent.layer.msg('请上传法人身份证正反面');
                return false;
            }
            
            if (Module.scanningCopy[0] === '') {
                Module.scanningCopy.splice(0, 1)
            }

            if (Module.scanningCopy[1] === '') {
                Module.scanningCopy.splice(1, 1)
            }

            if (Module.scanningCopy[2] === '') {
                Module.scanningCopy.splice(2, 1)
            }

            date.field.scanningCopy = Module.scanningCopy.join(",")

            if (Module.corporateImage[0] === '') {
                Module.corporateImage.splice(0, 1)
            }

            if (Module.corporateImage[1] === '') {
                Module.corporateImage.splice(1, 1)
            }

            date.field.corporateImage = Module.corporateImage.join(",")

            date.field.bankCity = Module.bankCity.join(",");

            if (date.field.file === '') {
                delete date.field.file
            }

            delete date.field.city
            delete date.field.county
            delete date.field.province

            date.field.upcloudApproval = '0'
    
            date.field.id = classModule.session().id

            parent.layer.load(2, {
                shade: [0.5, '#000']
            })
            
            SubmitCloudBusiness(date.field);
        })
    });

    layui.use('upload', function(){
        var $ = layui.jquery,
        upload = layui.upload;

        upload.render({
            elem: '#imageUpload',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('企业证件上传失败');
                } else {
                    Module.certificates[0] = res.data;

                    $('#Upimg').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                // console.log(data)
            },
            error: function (xhr) {
                console.log(xhr)
            }
        })

        upload.render({
            elem: '#imageUpload0',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('企业证件上传失败');
                } else {
                    Module.certificates[1] = res.data;

                    $('#Upimg0').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })

        upload.render({
            elem: '#imageUpload1',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('企业证件上传失败');
                } else {
                    Module.certificates[2] = res.data;

                    $('#Upimg1').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })

        upload.render({
            elem: '#imageUpload2',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('荣誉资质上传失败');
                } else {
                    Module.honor[0] = res.data

                    $('#Upimg2').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })

        upload.render({
            elem: '#imageUpload3',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('荣誉资质上传失败');
                } else {
                    Module.honor[1] = res.data
                    $('#Upimg3').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })

        upload.render({
            elem: '#imageUpload4',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('荣誉资质上传失败');
                } else {
                    Module.honor[2] = res.data
                    $('#Upimg4').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })

        upload.render({
            elem: '#imageUpload5',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('企业LOGO上传失败');
                } else {
                    Module.logo = res.data
                    $('#Upimg5').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })

        upload.render({
            elem: '#imageUpload6',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('证件扫描件上传失败');
                } else {
                    Module.scanningCopy[0] =  res.data
                    $('#Upimg6').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })

        upload.render({
            elem: '#imageUpload7',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('证件扫描件上传失败');
                } else {
                    Module.scanningCopy[1] =  res.data
                    $('#Upimg7').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })
    
        upload.render({
            elem: '#imageUpload8',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('证件扫描件上传失败');
                } else {
                    Module.scanningCopy[2] =  res.data
                    $('#Upimg8').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })

        upload.render({
            elem: '#imageUpload9',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('证件扫描件上传失败');
                } else {
                    Module.corporateImage[0] =  res.data
                    $('#Upimg9').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })

        upload.render({
            elem: '#imageUpload10',
            url: request.Url + request.upload,
            accept: 'images',
            before: function (obj){
                parent.layer.load(2, {
                    shade: [0.5, '#000']
                })
            },
            done: function (res, index, upload) {
                parent.layer.closeAll('loading');
                if (res.code === 0) {
                    layer.msg('证件扫描件上传失败');
                } else {
                    Module.corporateImage[1] =  res.data
                    $('#Upimg10').attr('src', request.imagesUrl + res.data)
                }
            },
            choose: function (data) {
                parent.layer.closeAll('loading');
            },
            error: function (xhr) {
                parent.layer.closeAll('loading');
            }
        })
    });

    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#StartTime',
            type: 'date',
            format: 'yyyy-MM-dd',
            theme: '#e4393c'
        })
    })

    $('.layui-upload-list').hover(function (event) {
        if ($(event.currentTarget).children('img').attr('src') !== undefined && $(event.currentTarget).children('img').attr('src') !== '') {
            $(event.currentTarget).children('span').show()
        }
    },function () {
        $(event.currentTarget).children('span').hide()
    })

    $('.layui-upload-list span').click(function (event) {
        event.stopPropagation(); 

        if (event.currentTarget.dataset.name === 'load0') {
            Module.certificates[event.currentTarget.dataset.id] = ''
        }

        if (event.currentTarget.dataset.name === 'load1') {
            Module.honor[event.currentTarget.dataset.id] = ''
        }

        if (event.currentTarget.dataset.name === 'load2') {
            Module.scanningCopy[event.currentTarget.dataset.id] = ''
        }
        
        if (event.currentTarget.dataset.name === 'load3') {
            Module.corporateImage[event.currentTarget.dataset.id] = ''
        }

        $(event.currentTarget).parent().children('img').attr('src', '')
        $(event.currentTarget).hide()
    })
})

function returnCallBack () {
    var Parent = window.parent.document.getElementById("iframe");
    Parent.setAttribute('src', 'certification/certification.html');
}
