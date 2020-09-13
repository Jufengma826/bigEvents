$(function () {
    var layer = layui.layer
    //获取文章类别信息

    var layer = layui.layer
    getCate()
    function getCate() {
        $.ajax({

            url: '/my/article/cates',
            type: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                layer.msg('获取数据成功')

                //调用template函数
                var templtehtml = template('templateid', res)
                $('tbody').html(templtehtml)
            }
        })

    }


    var addindex = null
    $('#addcatebtn').click(function () {
        addindex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialogadd').html()
        });
    })


    //添加分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()

        $.ajax({
            url: '/my/article/addcates',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加分类失败')
                }
                layer.msg('添加分类成功')
                //关闭弹窗 
                layer.close(addindex)
                //再次渲染
                getCate()
            }
        })
    })


})