$(function () {

    // 获取用户信息
    getUserInfo()

    // 右上角退出功能实现
    $('#btnLogout').on('click', function () {
        // 套用框架提供的询问框
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'
            // 关闭询问框    框架自带的
            layer.close(index);
        });
    })

})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}


// 渲染用户头像及用户名
function renderAvatar(user) {
    // 渲染名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        // 没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}