$(function () {
    var layer = layui.layer
    // 调用
    initArtCateList()
    // 一、封装 获取文章分类列表 的函数
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败')
                }
                var htmlStr = template('tpl-art-cate', res)
                $('tbody').html(htmlStr)
            }
        })
    }


    // 二、给添加分类按钮绑定点击事件 实现添加分类功能
    $('#btnAdd').on('click', function () {
        // console.log('ok');
        indexAdd = layer.open({
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#tpl-xiugai-Add').html()
        });
    })


    // 三、提交文章分类 (事件委托)
    var indexAdd = null
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('恭喜您，新增文章分类成功！')
                layer.close(indexAdd)
            }
        })
    })


    // 四、给编辑按钮绑定点击事件 实现修改分类名称功能 ()
    var indexEdit = null
    var form = layui.form
    $('tbody').on('click', '.btn-edit', function () {
        // console.log('ok');
        indexEdit = layer.open({
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#tpl-xiugai-Edit').html()
        });
        // 获取到对应的Id来进行编辑修改
        var Id = $(this).attr('data-id')
        // console.log(Id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-edit', res.data)
            }
        })
    })


    // 五、确认修改功能 (事件委托)
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败！')
                }
                initArtCateList()
                layer.msg('恭喜您，更新分类信息成功!')
                layer.close(indexEdit)
            }
        })
    })


    // 六、删除功能 (事件委托)
    $('tbody').on('click', '.btn-delete', function () {
        // console.log('ok');
        var Id = $(this).attr('data-id')

        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.msg('恭喜您，删除文章分类成功！')
                }
            })
            layer.close(index);
        });
    })







})