$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        rpwed: function(value) {
            let pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        },
        username: [
            /^[a-zA-Z0-9]{6,12}$/, '用户名必须6到12位'
        ]
    });
    //监听注册表单
    $("#form_reg").on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return console.log(res.message);
                }
                layer.msg('注册成功，请登入');
                $('#link_login').click()
            }
        });
    })

    $("#form_login").on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            //快速获取表单值
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登入失败');
                }
                layer.msg('登入成功，请登入');
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        });
    })



})