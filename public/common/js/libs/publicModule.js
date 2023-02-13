/**
 * Created by 关宁 on 2019.05.08
 */

var templates = (function () {
    return {
        header: function (UserInfo, Index) {
            // 当前用户信息
            var USERNAME = UserInfo.session().name;
            // 城市地区相对路径
            var CITYUSERURLPATH;
            // 图片加载物理路径
            var HEADERIMAGES; var RETURNINDEX;

            // 根据索引值判断当前跳转对应UTL
            if (Index === 0) {
                CITYUSERURLPATH = 'page';
                HEADERIMAGES = '..';
                RETURNINDEX = '.'
            } else if (Index === 1) {
                CITYUSERURLPATH = '..';
                HEADERIMAGES = '../../..';
                RETURNINDEX = '../..'
            } else {
                CITYUSERURLPATH = '../..';
                HEADERIMAGES = '../../../..';
                RETURNINDEX = '../../..'
            }

            var exit = 'none';
            var UserName = 'none';
            var hide = 'inline-block';

            if (USERNAME === undefined) {
                UserName = 'inline-block';
            } else {
                exit = 'inline-block';
            }

            var url_str = window.location.href
            var arr = url_str.split('=')[0]
            var str = arr.split('?')[1]

            if (str == 'city') {
                hide = 'none';
            }

            return '\
                <div class="layui-row layui_header_title">\
                    <div class="layui-main" style="background: #f1f1f1; height: 100%;">\
                        <div class="layui-col-xs6">\
                            <div class="layui-text">\
                                您好！欢迎来到唐山小微公共服务平台\
                            </div>\
                            <a target="view_window" href="'+ CITYUSERURLPATH + '/admin/admin.html?&level=' + window.btoa("Secondlevel") + '" class="admin" style="display: ' + exit + ';">\
                                <i class="iconfont TanSanusercircle"></i>\
                                <div class="layui-text UserName">'+ USERNAME + '</div>\
                            </a>\
                            <div class="layui-text out" style="display: '+ exit + ';">退出登录</div>\
                            <div class="layui-text layui_after" style="display: '+ UserName + ';">\
                                <i class="iconfont TanSanusercircle"></i>\
                                <a class="loginInfo" href="'+ CITYUSERURLPATH + '/login/login.html?level=' + window.btoa("Secondlevel") + '">请登录</a>\
                                <a class="loginInfo" href="'+ CITYUSERURLPATH + '/login/login.html?level=' + window.btoa("Secondlevel") + '&type=' + window.btoa("0") + '">免费注册</a>\
                            </div>\
                        </div>\
                        <div class="layui-col-xs6 layui_right" style="display: '+ hide + ';">\
                            <div class="layui-text Cluster">\
                                产业集群<i class="layui-icon">&#xe625;</i>\
                        </div>\
                        <div class="layui-text layuiSelete" style="display: '+ hide + ';">\
                            城市窗口<i class="layui-icon">&#xe625;</i>\
                        </div>\
                        <div class="layui-inline layui_list layui-anim layui-anim-upbit">\
                            <ul>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("lunan") + '&level=' + window.btoa("Secondlevel") + '">路南区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("lubei") + '&level=' + window.btoa("Secondlevel") + '">路北区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("kaiping") + '&level=' + window.btoa("Secondlevel") + '">开平区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("guzhi") + '&level=' + window.btoa("Secondlevel") + '">古冶区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("fengrun") + '&level=' + window.btoa("Secondlevel") + '">丰润区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("fengnan") + '&level=' + window.btoa("Secondlevel") + '">丰南区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("caofei") + '&level=' + window.btoa("Secondlevel") + '">曹妃甸区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("haigang") + '&level=' + window.btoa("Secondlevel") + '">海港区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("gaoxin") + '&level=' + window.btoa("Secondlevel") + '">高新区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("lutai") + '&level=' + window.btoa("Secondlevel") + '">芦台区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("hangu") + '&level=' + window.btoa("Secondlevel") + '">汉沽区</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("yutian") + '&level=' + window.btoa("Secondlevel") + '">玉田县</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("qianxi") + '&level=' + window.btoa("Secondlevel") + '">迁西县</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("luannan") + '&level=' + window.btoa("Secondlevel") + '">滦南县</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("leting") + '&level=' + window.btoa("Secondlevel") + '">乐亭县</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("zuenhua") + '&level=' + window.btoa("Secondlevel") + '">遵化市</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("luanzhou") + '&level=' + window.btoa("Secondlevel") + '">滦州市</a></li>\
                                <li><a href="'+ CITYUSERURLPATH + '/city/city.html?city=' + window.btoa("qianan") + '&level=' + window.btoa("Secondlevel") + '">迁安市</a></li>\
                            </ul>\
                        </div>\
                        <div class="layui-inline industry layui-anim layui-anim-upbit">\
                            <ul>\
                                <li><a target="_blank" href="http://www.ytppma.org/">玉田印刷包装机械协会</a></li>\
                                <li><a target="_blank" href="http://www.qxnycyxh.com/">丰润装备制造业产业聚集区</a></li>\
                                <li><a target="_blank" href="http://www.tstcxh.org/">唐山陶瓷协会</a></li>\
                                <li><a target="_blank" href="http://www.qxnycyxh.com/">迁西农业产业协会</a></li>\
                                <li><a target="_blank" href="http://www.qxnycyxh.com/">唐山市高新技术产业开发区管理委员会</a></li>\
                                <li><a target="_blank" href="http://www.qxnycyxh.com/">唐山（开平）现代装备制造工业区</a></li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <div class="layui-main layui_header_logo" style="background: white; height: 120px;">\
                <div class="layui-col-xs4">\
                    <a href="http://www.smehb.cn/" class="UrlTop" target="_Blank"></a>\
                    <a href="' + RETURNINDEX + '/index.html" class="UrlBootom"></a>\
                    <img class="logo" style="cursor: pointer;" src="'+ HEADERIMAGES + '/public/images/logo.png"/>\
                </div>\
                <div class="layui-col-xs6">\
                    <div class="layui-form-item">\
                        <div class="layui-input-block layui_input_Search">\
                            <input type="text" lay-verify="required" placeholder="请输入关键字" autocomplete="off" class="layui-input">\
                            <a href="javascript:;" class="layui-btn" id="Search">搜 索</a>\
                        </div>\
                    </div>\
                </div>\
                <div class="layui-col-xs2" style="text-align:right;">\
                    <img class="header_Code" src="'+ HEADERIMAGES + '/public/images/code.png"/>\
                </div>\
            </div>'
        },

        footer: function (Index) {
            var TABINDEX;

            if (Index === 0) {
                TABINDEX = 'page'
            } else if (Index === 1) {
                TABINDEX = '..'
            } else {
                TABINDEX = '../..'
            }

            return '<div class="layui-col-xs12 footer_bg">\
                <div class="layui-main">\
                    <div class="layui-col-xs3">\
                        <div class="layui-title">\
                            快速导航<span></span>\
                        </div>\
                        <div class="layui-col-xs5 footer_list">\
                            <a href="'+ TABINDEX + '/about/about.html?index=0">关于我们</a>\
                        </div>\
                        <div class="layui-col-xs7 footer_list">\
                            <a href="'+ TABINDEX + '/about/about.html?index=1">法律责任</a>\
                        </div>\
                        <div class="layui-col-xs7 footer_list">\
                            <a href="'+ TABINDEX + '/about/about.html?index=2">隐私保护</a>\
                        </div>\
                    </div>\
                    <div class="layui-col-xs3">\
                        <div class="layui-title">\
                            联系我们<span></span>\
                        </div>\
                        <div class="layui-col-xs12 footer_list">\
                            电子邮箱：tsxw@zhszts.com\
                        </div>\
                    </div>\
                    <div class="layui-col-xs3">\
                        <div class="layui-title">\
                            服务热线<span></span>\
                        </div>\
                        <div class="layui-col-xs12 footer_list">\
                            <span>联系电话：0315-2812975</span>\
                        </div>\
                    </div>\
                    <div class="layui-col-xs3">\
                        <div class="layui-title">\
                            意见反馈<span></span>\
                        </div>\
                        <div class="layui-col-xs12 footer_list">\
                            提交反馈\
                        </div>\
                    </div>\
                    <div class="layui-col-xs12 org_item link">\
                        友情链接：<a href="http://www.tsgy.gov.cn" target="view_window">唐山市工业和信息化局</a>&nbsp;&nbsp;&nbsp;&nbsp;\
                        <a href="http://www.smehb.cn/" target="view_window">河北省中小企业公共服务平台</a>&nbsp;&nbsp;&nbsp;&nbsp;\
                        <a href="http://www.isesol.com" target="view_window">ISESOL工业互联网平台</a>\
                    </div>\
                    <div class="layui-col-xs12 organizer">\
                        <div class="layui-col-xs12 org_item">\
                            建设单位：智慧神州（唐山）信息技术有限公司\
                        </div>\
                    </div>\
                </div>\
                <div class="layui-col-xs12 footer_bottom" style="color:#fff;text-align: center;line-height:50px">\
                        Copyright（c）2017-2017 www.smehn.cn\
                        <a href="https://beian.miit.gov.cn" style="color:#fff;margin-left:15px">ICP备案号：冀ICP备17014842号-1</a>\
                    </div>\
                </div>\
            </div>';
            // <div class="layui-col-xs12 footer_bottom">\
            //         <div class="layui-main">\
            //             <div class="layui-col-xs6 footer_text">\
            //                 Copyright（c）2017-2017 www.smehn.cn\
            //             </div>\
            //             <div class="layui-col-xs6 footer_text1">\
            //                 <a href="https://beian.miit.gov.cn" style="color:#fff">ICP备案号：冀ICP备17014842号-1</a>\
            //             </div>\
            //         </div>\
            //     </div>\
        }
    }
});


$(function () {
    // 获取当前URL参数
    var href = window.location.pathname.split('/');

    $('body').on('click', '.out', function (event) {

        /**
         * @param title 弹出层标题
         * @param content 内容
         * @param skin 主题
         * @function yes 成功回调
         **/

        layer.open({
            title: '温馨提示',
            content: '是否退出登录？',
            skin: 'my-skin',
            btn: ['确定', '取消',],
            yes: function (index, layero) {

                // 移除Cookie用户信息
                $.cookie('session', null, {
                    expires: -1,
                    path: '/'
                });

                for (var i = 0; i < href.length; i++) {
                    // 如果在当前页面索引在admin当中。
                    if (href[i] === 'admin.html') {
                        window.location.href = '../../index.html'
                        // 退出登录将返回首页
                        window.history.back(-1);

                        return false;
                    }

                    // 如果在当前页面索引在发布相关 更新相关当中。
                    if (href[i] === 'pubService.html' || href[i] === 'releaseDemand.html' || href[i] === 'launchEvent.html') {
                        window.location.href = '../../../index.html'
                        window.history.back(-1);
                        return false;
                    }

                    window.location.reload()
                }
            }
        });
    })

    $('body').on('click', '.layuiSelete', function (event) {
        event.stopPropagation();

        // 点击按钮切换为隐藏的 如果是隐藏的 切换为可见的 
        $('.layui_list').stop().toggle();
        $('.industry').stop().slideUp();
    })

    $('body').on('click', '.Cluster', function (event) {
        event.stopPropagation();

        // 点击按钮切换为隐藏的 如果是隐藏的 切换为可见的 
        $('.industry').stop().toggle();
        $('.layui_list').stop().slideUp(300);
    })

    // 触碰空白处 收起头部下拉列表项
    $(document).click(function (even) {
        var SelectDown = $('.layui_list, .industry');

        // 获取需要收起的元素
        if (!SelectDown.is(even.target) && SelectDown.has(even.target).length === 0) {
            $('.layui_list, .industry').stop().slideUp(300);
        }
    })

    $('body').on('click', '#Search', function (even) {
        event.stopPropagation();
        layer.open({
            title: '温馨提示',
            skin: 'my-skin',
            content: '此功能暂未开放！'
        });
    })
})
