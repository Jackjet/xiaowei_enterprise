/**
 * Created by 关宁 on 2019.5.5
 * @callback url 服务器接口
 */

function Call_Request() {
    // 测试服务器
    // this.Url = "http://47.93.42.226/tangshan/";
    this.Url = "http://47.105.96.207/tangshan/"
    // this.Url = "http://www.tsvqi.com/tangshan/";

    // 七牛云图片路径
    this.imagesUrl = 'http://tupian.tsvqi.com/';

    // 服务器接口
    this.SignIn = "web/user/webUser/signIn";
    this.register = 'web/user/webUser/register';
    this.SmsSend = 'web/sendSMS/SmsSend';
    this.forgetPwd = 'web/user/webUser/forgetPwd';
    this.recommend = 'web/cms/recommend/findAll';
    this.art = 'web/cms/art/findAll';
    this.artfindById = '/web/cms/art/findById';
    this.activity = 'web/activity/findAll';
    this.Class = 'web/firstType/findAll';
    this.secondClass = 'web/secondType/findAll';
    this.ServicesType = 'web/cloudServicesType/findAll';
    this.cloudServices = 'web/cloudServices/findAll';
    this.cloudRecord = 'web/cloudRecord/finAll';
    this.cloudUser = 'web/cloudUser/findAll';
    this.topFive = 'web/cloudUser/topFive';
    this.buyServices = 'web/cloudServices/findCloudServiceById';
    this.contact = 'web/cloudServices/findCloudUser';
    this.activityDetails = 'web/activity/findById';
    this.signUp = 'web/activity/signUp';
    this.pay = 'web/order/insert';
    this.orderPush = 'web/order/findById';
    this.upload = 'webadmin/cms/resourceLib/uploadIcon';
    this.Postinsert = 'web/activity/insert';
    this.admin = 'web/user/webUser/findById';
    this.userOrder = 'web/user/userOrder/findAll';
    this.userOrderiD = 'web/user/userOrder/findById';
    this.register2 = 'web/user/webUser/register2';
    this.industry = 'web/industry/findAll';
    this.updatePwd = 'web/user/webUser/updatePwd';
    this.declare = 'web/declare/findAll';
    this.webserve = 'web/serve/findAll';
    this.servefindById = 'web/declare/findById';
    this.serveid = 'web/serve/findById';
    this.findRecordsById = 'web/serve/findRecordsById';
    this.findUserByServe = 'web/serve/findUserByServe';
    this.findWebUserById = 'web/serve/findWebUserById';
    this.uploadIconText = 'webadmin/cms/resourceLib/uploadIconText';
    this.serveinsert = 'web/serve/insert';
    this.webUser = 'web/user/webUser/findAll';
    this.webUserDel = 'web/user/webUser/findById';
    this.demand = 'web/demand/insert';
    this.park = 'web/park/findAll';
    this.userDemand = 'web/user/userDemand/findAll';
    this.userDemandJoin = 'web/user/userDemand/findAllMyJoin';
    this.park = 'web/park/findAll';
    this.expert = 'web/expert/finAll';
    this.dept = 'base/dept/findAll';
    this.hotrecommend = 'web/cms/recommend/findList';
    this.parkiD = 'web/park/findById';
    this.demandFll = 'web/demand/findAll';
    this.demandBy = 'web/demand/findById';
    this.research = 'web/research/findAll';
    this.signUp1 = 'web/demand/signUp';
    this.expertfindByid = 'web/expert/findById';
    this.userCloudServices = 'web/user/userCloudServices/findAllMyJoin';
    this.register3 = 'web/user/webUser/register3';
    this.findAllMyJoin = 'web/user/userServe/findAllMyJoin';
    this.userServe = 'web/user/userServe/findAll';
    this.userActivity = 'web/user/userActivity/findAllMyJoin'
    this.userActivityfindAll = 'web/user/userActivity/findAll';
    this.userServeByid = 'web/user/userServe/findById';
    this.userDemandfindPlayer = 'web/user/userDemand/findPlayer';
    this.update = 'web/user/userServe/update';
    this.userActivityByid = 'web/user/userActivity/findById';
    this.userActivityupdate = 'web/user/userActivity/update';
    this.userDemandfindById = 'web/user/userDemand/findById';
    this.userDemandupdate = 'web/user/userDemand/update';
    this.remove = 'web/user/userDemand/remove'


    // ajax请求配置参数
    this.url = "";
    this.method = "";
    this.data;
    this.token = "";
    this.dataType = "json";

    this.reinfo = function () { };
    this.status = 0;
    this.redata = function () { };

    this.run = function () {
        if (this.url == "") {
            console.log("url未配置");
            return -1;
        }

        var redata = this.redata;
        var reinfo = this.reinfo;

        $.ajax({
            type: this.method,
            url: this.url,
            headers: this.token,
            data: this.data,
            dataType: this.dataType,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.status == 0) {
                    reinfo(data);
                    this.status = -1
                } else {
                    redata(data);
                    this.status = 0;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                this.status = -1;
            }
        })
    }
}