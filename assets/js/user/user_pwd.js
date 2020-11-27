$(function () {
    // 1.自定义密码框的校验规则
    var form = layui.form
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新旧密码不能重复
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码和旧密码不能相同'
            }
        },
        // 再次确认密码和新密码必须相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致请重新输入'
            }
        }
    })



    // 2.修改密码成功后表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('恭喜您密码修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })


})