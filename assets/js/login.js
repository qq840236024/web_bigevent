$(function() {
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    // 从 layui 中获取 form 对象
    var form = layui.form;
    var layer = layui.layer
        // 通过 form.verify() 函数 自定义效验规则
    form.verify({
            // 自定义了一个叫做 pwd 效验规则
            pwd: [
                // 自定义了一个叫做 pwd 效验规则
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 自定义 验证两次密码是否一致的规则
            repwd: function(value) {
                // 通过 value形参 拿到的是确认密码框中的内容
                // 然后拿到密码框中的内容，然后进行判断，如果验证失败，则return 字符串
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }

            }
        })
        // http://api-breakingnews-web.itheima.net
        // 监听 注册表单的 提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止表单默认行为
        e.preventDefault();
        // 2. 发起 ajax 的post 请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }

        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // layui 里的 弹窗方法
                return layer.msg(res.message)
            }
            layer.msg('注册成功！')
                // 模拟点击行为
            $('#link_login').click()
        })
    });
    // 监听登录事件
    $('#form_login').submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html';
            }
        })
    })

})