$(function () {
    //1. 自定义用户昵称的验证规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1-6位之间'
            }
        }
    })


    // 调用渲染用户的函数
    initUserInfo()
    // 引出layer
    var layer = layui.layer
    // 2.封装渲染用户的函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功的话 渲染
                // form.val() 第一个参数是form的名字  第二个参数是json字符串 需要进行数据转化
                form.val('formUserInfo', res.data)
                // console.log(res);
            }
        })
    }



    // 3.表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })


    // 4.用户修改信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，用户信息修改成功')
                window.parent.getUserInfo()
            }
        })
    })

})