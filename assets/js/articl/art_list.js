$(function () {
  var layer =  layui.layer
  var form = layui.form
    var q = {
        pagenum: 1,// 当前的页码值
        pagesize: 2,//每页显示的条数
        cate_id: '',//文章分类的id
        state: ''//文章的状态 已发布 草稿
    }
    //渲染列表
    initlist()
    function initlist(){

        $.ajax({
            url:'/my/article/list',
            type:'GET',
            data:q,
            success:function(res){
                console.log(res);
                 if(res.status !==0){
                     return layer.msg('失败')
                 }
                 layer.msg('成功')
                 var templhtml = template('listid',res)
                 $('tbody').html(templhtml)
            }
        })
    }

    // 分类
    cateadd()
  function cateadd(){
    $.ajax({
        url:'/my/article/cates',
        type:'GET',
        success:function(res){
          if(res.status !==0){
              return layer.msg('获取失败')
          }
          layer.msg('获取成功')
          var cateHtml = template('cateId',res)
          $('.layui-form [name=cate_id]').html(cateHtml)
          form.render()
        }
    })
  }
 
   // 筛选功能
   $('#shaixuan').on('submit',function(e){
       e.preventDefault()
       var newCate = $('[name=cate_id').val()
       var newState = $('[name=state]').val()
       //为查询对象的参数赋值
       q.cate_id = newCate
       q.state = newState
       //根据最新的筛选条件 渲染所选的数据
       initlist()
   })

})