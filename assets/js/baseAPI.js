$.ajaxPrefilter(function(option){
    option.url = 'http://ajax.frontend.itheima.net'+option.url
    option.headers ={
        Authorization:localStorage.getItem('token')
       }

})