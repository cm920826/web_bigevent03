var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url

    // 对需要权限的接口 以my开头的 配置头信息
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }


    // 拦截响应 判断身份认证信息 防止用户在上面地址栏输入就能进入首页中心
    // complete 就相当于res 里面的method url 等 
    // complete这个属性不管执行成功与否都会调用
    
    options.complete = function (res) {
        // console.log(options);
        // 输出的是{status: 1, message: "身份认证失败！"}  是一个对象
        // console.log(res.responseJSON);   
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 强制跳转到登录页面 不许进入主页中心
            location.href = '/login.html'
        }
    }
})