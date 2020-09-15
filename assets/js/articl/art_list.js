$(function () {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage
  var q = {
    pagenum: 1,// 当前的页码值
    pagesize: 2,//每页显示的条数
    cate_id: '',//文章分类的id
    state: ''//文章的状态 已发布 草稿
  }
  //渲染列表
  initlist()
  function initlist() {

    $.ajax({
      url: '/my/article/list',
      type: 'GET',
      data: q,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg('失败')
        }
        layer.msg('成功')
        var templhtml = template('listid', res)
        $('tbody').html(templhtml)

        // 分页
        renderPage(res.total)
      }
    })
  }

  // 分类
  cateadd()
  function cateadd() {
    $.ajax({
      url: '/my/article/cates',
      type: 'GET',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取失败')
        }
        layer.msg('获取成功')
        var cateHtml = template('cateId', res)
        $('.layui-form [name=cate_id]').html(cateHtml)
        form.render()
      }
    })
  }

  // 筛选功能
  $('#shaixuan').on('submit', function (e) {
    e.preventDefault()
    var newCate = $('[name=cate_id').val()
    var newState = $('[name=state]').val()
    //为查询对象的参数赋值
    q.cate_id = newCate
    q.state = newState
    //根据最新的筛选条件 渲染所选的数据
    initlist()
  })



  //分页
  function renderPage(total) {
    laypage.render({
      elem: 'renderpage', //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, first) {
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        if (!first) {
          initlist()
        }
      }
    });
  }

  //删除 动态删除 事件委托
  $('body').on('click', '.delete-btn', function () {
    // 获取当前按钮的id
    var deleteId = $(this).attr('data-id')
     // 获取当前页面上的删除按钮的个数
    var deletebtnlen = $('.delete-btn').length
    // 弹出框 layui 
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
    // 获取后台的数据
      $.ajax({
        url: `/my/article/delete/${deleteId}`,
        type: 'GET',
        success: function (res) {
          if (res.status !== 0) {
            layer.msg('删除失败')
          }
          layer.msg('删除成功')
          layer.close(index);

          // 若页面上的删除按钮有1个 则pagenum -1 
          // 若当前页面上的删除按钮多余1个 则pagenum不减1
          if (deletebtnlen === 1) {
            q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
          }
          initlist()
        }
      })


    });


  })

})