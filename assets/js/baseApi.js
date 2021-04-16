// 每次调用 $.get() 或者 $.ajax()的时候
// 会先调用 ajaxPrefiltewr 这个函数
//  在这个函数中，可以拿到我们给Ajax 提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前， 统一拼接请求的 根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})