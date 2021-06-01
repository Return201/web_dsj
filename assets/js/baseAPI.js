//每次调用请求的时候，会先调用ajaxPrefilter这个函数
//在这个函数中可以拿到配置对象
$.ajaxPrefilter(function(options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //无论成功还是失败都会执行complete
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = './login.html';
        }
    }
})