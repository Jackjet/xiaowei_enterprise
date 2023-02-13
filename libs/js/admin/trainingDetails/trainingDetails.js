/**
 * author: 关宁
 * date: 2019.05.09
 */

// 实例化创建请求方式
var request = new Call_Request();
var image;

$(function () {
    GeneralPart(2);

    if (GetQueryString('type') === '1') {
        $('.title').html('我发布的活动')
    } else {
        $('.title').html('我参与的活动')
    }

    request.url = request.Url + request.activityDetails
    request.method = "GET"

    request.data = {
        id: GetQueryString('id')
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {      
            var fILElen = data.data.file.lastIndexOf(".")
            var len = data.data.file.length;
            var FileSuffix = data.data.file.substring(fILElen, len)

            if (data.data.file === '') {
                window.parent.iframeHeight(1100);
            } else {
                window.parent.iframeHeight(1280);
            }

            switch (FileSuffix) {
                case '.jpg':
                    data.data['Suffix'] = 'image.png'
                    break;
                case '.png':
                    data.data['Suffix'] = 'image.png'
                    break;
                case '.jpeg':
                    data.data['Suffix'] = 'image.png'
                    break;
                case '.gif':
                    data.data['Suffix'] = 'gif.png'
                    break;
                case '.psd':
                    data.data['Suffix'] = 'psd.png'
                    break;
                case '.mp3':
                    data.data['Suffix'] = 'mp3.png'
                    break;
                case '.mp4':
                    data.data['Suffix'] = 'mp4.png'
                    break;
                case '.MOV':
                    data.data['Suffix'] = 'mp4.png'
                    break;
                case '.avi':
                    data.data['Suffix'] = 'mp4.png'
                    break;
                case '.rmvb':
                    data.data['Suffix'] = 'mp4.png'
                    break;
                case '.m3u8':
                    data.data['Suffix'] = 'mp4.png'
                    break;
                case '.exe':
                    data.data['Suffix'] = 'exe.png'
                    break;
                case '.zip':
                    data.data['Suffix'] = 'zip.png'
                    break;
                case '.rar':
                    data.data['Suffix'] = 'rar.png'
                    break;
                case '.7z':
                    data.data['Suffix'] = '7z.png'
                    break;
                case '.doc':
                    data.data['Suffix'] = 'word.png'
                    break;
                case '.ppt':
                    data.data['Suffix'] = 'ppt.png'
                    break;
                case '.xls':
                    data.data['Suffix'] = 'excel.png'
                    break;
                case '.excel':
                    data.data['Suffix'] = 'excel.png'
                    break;
                default:
                    data.data['Suffix'] = 'file.png'
                    break;
            }

            data.data['Upfile'] = request.imagesUrl + data.data.file;
            data.data.image = request.imagesUrl + data.data.image;
           
            // 为页面模板赋值一级分类模块数据
            data.data['IfLogin'] = classModule.session()
            var Html = template("Details-cell", data.data);
            $('.Details').html(Html);

            if (data.data.file == '') {
                $('.attaChment').hide();
            }
            
            $('.Richtext').append(data.data.content);
            
            var map = new AMap.Map('container', {
                resizeEnable: true,
                zoom:11,
                center: [data.data.warp, data.data.weft]
            });

            var marker = new AMap.Marker({
                map: map,
                position: new AMap.LngLat(data.data.warp, data.data.weft),
            });
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

    $(document).on('click', '#upload', function (even) {
        var load = new XMLHttpRequest();
        load.open("GET", even.target.dataset.load, true);
        load.responseType = 'blob';
        
        load.onload = function (e) {
            var url = window.URL.createObjectURL(load.response);
            var a = document.createElement('a');
            a.href = url
            a.download = even.target.dataset.loadname
            a.click()
        }

        load.send();
    })
})

function PreviousPage () {
    if (QueryString('type') === '0') {
        window.location.href = '../activities/activities.html'
    } else {
        window.location.href = '../launchEvent/launchEvent.html'
    }
}