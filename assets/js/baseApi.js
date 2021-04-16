// 每次调用 $.get() 或者 $.ajax()的时候
// 会先调用 ajaxPrefiltewr 这个函数
//  在这个函数中，可以拿到我们给Ajax 提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前， 统一拼接请求的 根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局 挂complete 回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})

// 统一为有权限的接口，设置 headers 请求头