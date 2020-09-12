$(function(){
 
    var form = layui.form
    /**
     * 昵称验证
     */
    form.verify({
        nickname:function(value){
            if(value.length>6){
             return '昵称长度大小为1~6'
            }
        }
    })
    
 /**
  * 用户初始信息获取
  */
    initUserinfo()
    function initUserinfo(){
        $.ajax({
            url:'/my/userinfo',
            type:'GET',
            success:function(res){
            // form.val() 快速给表单赋值
            
                form.val('formuserinfo',res.data)
                return layui.layer.msg('获取数据成功')
            }
        })
    }
    $("#resetBtn").click(function(e){
        e.preventDefault()
        initUserinfo()
 
    })

/**
 * 修改用户信息
 */
   $('#changeuserinfo').on('submit',function(e){
       e.preventDefault()
       $.ajax({
           url:'/my/userinfo',
           type:'POST',
           data:$(this).serialize(),
           success:function(res){
               if(res.status !=0){
                   return layui.layer.msg('修改失败')
               }
               window.parent.getuserinfo()
           }
       })
   })


})