$(function(){

    var form = layui.form
    form.verify({
        // 密码格式
      pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        // 新旧密码不能一致
        samepass:function(value){
            var samepass = $('[name=oldPwd]').val()
            if(samepass === value){
                return '新旧密码不能相同'
            }
        },

        // 两次输入的密码要一致
        repass:function(value){
            var repass = $('[name=newPwd]').val()
            if(repass !== value){
                return '两次密码不一致'
            }
        }
    })



    // 修改密码

    $(".layui-form").submit(function(e){
        e.preventDefault()

        $.ajax({
            url:'/my/updatepwd',
            type:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status === 1){
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功')
                // 转化成dom对象调用reset方法
                $(".layui-form")[0].reset()
                localStorage.removeItem('token')
                top.window.location.href='/login.html'
            }

        })
    })
})