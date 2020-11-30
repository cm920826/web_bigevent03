$(function () {

    // 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义个位数补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 定义需要向后台提交的参数
    var q = {
        pagenum: 1,       // 页码值
        pagesize: 3,      // 每页显示多少条数据
        cate_id: "",      // 文章分类的 Id
        state: ""          // 文章的发布状态
    }

    var layer = layui.layer

    initTable()
    // 初始化文章列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                // 调用分页的函数
                renderPage(res.total)
            }
        })
    }



    // 初始化下拉菜单里的分类
    var form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 渲染
                var str = template('tpl-cate', res)
                $('[name=cate_id]').html(str)
                form.render()
            }
        })
    }


    // 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        // 赋值
        q.status = state
        q.cate_id = cate_id
        // 初始化文章列表
        initTable()
    })


    // 分页功能
    var laypage = layui.laypage    // 引出laypage的方法

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',  // 这里的 test1 是 ID，不用加 # 号
            count: total,        // 数据总数，从服务端得到
            limit: q.pagesize,   // 每页几条
            curr: q.pagenum,     // 当前在第几页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 4, 6, 8, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr
                //首次不执行
                if (!first) {
                    // 初始化文章列表
                    initTable()
                }
            }
        });
    }


    // 删除功能
    $('tbody').on('click', '.btn-delete', function () {
        // console.log('ok');
        var Id = $(this).attr('data-id')
        // 弹出询问框
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜您，文章删除成功！')
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
                    initTable()
                }
            })
            layer.close(index);
        });
    })






})