$(function () {
    var layer = layui.layer
    getuserinfo()
    //获取数据
<<<<<<< HEAD
    function getuserinfo(){
       $.ajax({
           url:'/my/userinfo',
           type:'GET',
           
           success:function(res){
                
               if(res.status !==0){
                   return layer.msg('获取数据失败')
               }
               layer.msg('获取数据成功')
                
               //渲染数据到页面上
               renderData(res.data)
           }
      

       })
=======
    function getuserinfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',

            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                layer.msg('获取数据成功')

                //渲染数据到页面上
                renderData(res.data)
            }
            , complete: function (res) {
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                    localStorage.removeItem('token')
                    location.href = '/login.html'
                }
            }
        })
>>>>>>> person
    }
    window.getuserinfo = getuserinfo
    //渲染数据函数
    function renderData(user) {
        //渲染名字
        var name = user.nickname || user.username
        $("#welcome").html('欢迎' + name)
        //渲染图片
        if (user.user_pic) {
            $(".layui-nav-img").attr("src", user.user_pic).show()
            $(".text-avatar").hide()
        } else {
            $(".layui-nav-img").hide()
            $(".text-avatar").html(name[0]).show()
        }
    }

    //退出登录

    $(".btn").on("click", function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //清除headers信息
            //切换到登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });
    })

})