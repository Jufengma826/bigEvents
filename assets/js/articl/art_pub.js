$(function () {

    var layer = layui.layer
    var form = layui.form
    getselectcate()
    function getselectcate() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('获取失败')
                }
                layer.msg('获取成功')
                var selectHtml = template('selectcate', res)
                $('.layui-form [name=cate_id]').html(selectHtml)
                // 在select中 不会自动渲染页面元素 需要手动渲染
                form.render()
            }
        })
    }



    // 初始化富文本编辑器
    initEditor()

    //图片裁剪区
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)



    $('#selectimage').on('click', function () {
        $('#file').click()
    })

    // 
    $('#file').on('change', function (e) {
        var files = e.target.files
        if (files.length == 0) {
            return layer.msg('获取失败')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    /**
     * 处理上传所需要的数据
     */
    var art_state = '已发布'
    $('#savebtn2').on('click', function () {
        art_state = '草稿'
    })


    /**
     *提交表单 
     */

    $('#pubarticl').on('submit', function (e) {
        e.preventDefault()
        // 实例化FormData对象 参数为DOM对象
        var fd = new FormData($(this)[0])
        // 把state追加进去
        fd.append('state', art_state)

        $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
    })


    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
           
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/articl/art_list.html'
            }
        })
    }


})