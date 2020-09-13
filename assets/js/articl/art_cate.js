$(function () {

    var layer = layui.layer
    var form = layui.form
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

    //添加表单弹出框
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

    //编辑分类
    var editindex = null
    $('body').on('click', '.editcate', function () {
        editindex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#dialogedit').html()
        });
    //获取Id
    var cateid = $(this).attr('data-id')
  
    //把数据渲染到弹出框上
    $.ajax({
        url:`/my/article/cates/${cateid}`,
        type:'GET',
        success:function(res){
            if(res.status !==0){
                return layer.msg('获取数据失败')
            }
             layer.msg('获取数据成功')
             form.val('formedit',res.data)
        }
    })

    })

    //修改分类
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()

        $.ajax({
            url:'/my/article/updatecate',
            type:'POST',
            data:$(this).serialize(),
            success:function(res){
                 
                if(res.status !==0){
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')
                layer.close(editindex)
                getCate()
            }
        })
    })

    
    //删除分类
    $('body').on('click','.deletecate',function(){
        var deleteId = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            
            $.ajax({
                url:`/my/article/deletecate/${deleteId}`,
                type:'GET',
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    getCate()
                }
            })


            
          });
    })
})