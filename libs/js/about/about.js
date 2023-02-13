/**
 * author: 关宁
 * date: 2019.05.08
 */

$(function () {
    // 实例化导航切换
    layui.use('element', function(){
        var element = layui.element;
        element.render()
    });


    switch (GetQueryString('index')) {
        case '0':
            $('.layui-tab-title li').eq(0).attr('class', 'layui-this')
            $('.layui-tab-content li').eq(0).show().siblings().hide();
            break;
        case '1':
            $('.layui-tab-title li').eq(1).attr('class', 'layui-this')
            $('.layui-tab-content li').eq(1).show().siblings().hide();
            break
        default:
            $('.layui-tab-title li').eq(2).attr('class', 'layui-this')
            $('.layui-tab-content li').eq(2).show().siblings().hide();
            break 
    }

    // 显示隐藏索引相关内容
    $('.layui-tab-title li').click(function () {
        var i = $(this).index();
        $('.layui-tab-content li').eq(i).show().siblings().hide();
    })

    GeneralPart(1);
})