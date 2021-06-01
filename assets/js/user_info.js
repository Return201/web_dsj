$(function() {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '必须要在6个字符以内'
            }
        }
    });
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('forUserInfo', res.data);
            }
        });
    }
    $("#btnRset").on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                window.parent.getUserInfo()
            }
        });
    })




})