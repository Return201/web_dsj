$(function() {
    getUserInfo();
    let layer = layui.layer
    $("#btnloginout").on('click', function() {
        layer.confirm('确定退出登入', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = './login.html';
            //关闭询问框
            layer.close(index);
        });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvater(res.data);
        }
    });
}
//渲染用户头像
function renderAvater(user) {
    let name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp' + name);
    if (user.user_pic != null) {
        //图片头像
        $(".text-avatar").hide();
        $(".layui-nav-img").attr('src', user.user_pic).show();
    } else {
        //文本头像
        $(".layui-nav-img").hide();
        let first = name[0].toUpperCase()
        $(".text-avatar").html(first)
    }
}