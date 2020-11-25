$(function () {
    // 点击 去注册账号 显示注册的div 隐藏登录的div
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击 去登录 显示登录的div 隐藏注册的div
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })



    // 自定义验证规则
    var form = layui.form
    form.verify({
        // 密码的规则
        pwd: [/^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'],
    })


    // 注册功能实现
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message)
                }
                // alert(res.message)
                layer.msg('恭喜您，注册成功，请登录！')
                // 注册成功后调用去登录的点击事件实现跳转到登录页面
                $('#link_login').click()
                // 清空登录后的注册页的个人信息
                $('#form_reg')[0].reset()
            }
        })
    })

    // 登录功能实现
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，登录成功！')
                // 保存token
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })







})