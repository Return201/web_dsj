//每次调用请求的时候，会先调用ajaxPrefilter这个函数
//在这个函数中可以拿到配置对象

$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
})