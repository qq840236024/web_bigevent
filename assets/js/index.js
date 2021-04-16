$(function() {
    getUserInfo()

    // 获取用户数据的函数
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败!')
                }
                renderAvatar(res.data);
            }

        })
    }

    // 渲染用户头像的函数
    function renderAvatar(user) {
        var name = user.nickname || user.username;

        $('.welcome').html('欢迎&nbsp&nbsp' + name);

        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
    var layer = layui.layer;
    // 退出事件
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function(index) {
                layer.msg('退出成功')
                localStorage.removeItem('token')
                location.href = '/login.html';

                layer.close(index);
            });
    })
})