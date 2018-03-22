/*author:yulihua*/
/*qq:179526027*/
/*Email:179526027@qq.com*/
(function () {
    Function.prototype.bind = function () {
        var _args = arguments,
            _object = arguments[0],
            _function = this;
        return function () {
            // not use slice for chrome 10 beta and Array.apply for android
            var _argc = [].slice.call(_args, 1);
            [].push.apply(_argc, arguments);
            return _function.apply(_object || window, _argc);
        };
    }
    var page = {
        init: function () {
           this.initlist();
           this.inittab();
        },
        //end init
         initlist:function(){
        var time;
           var h=$(".g-bd .list ul").height(),bd=$(".g-bd .list ul").html(),btn=$(".g-bd .list"),ulbox=$(".g-bd .list ul");
           $(".g-bd .list ul").height(h*2).append(bd);
           btn.hover(function(){
          clearInterval(time);
            },function(){
            time=setInterval(lunbo,50);
            }).trigger("mouseleave");
              function lunbo(){
                  if(parseInt(ulbox.css("margin-top"))<-ulbox.height()/2){
                    ulbox.css("margin-top","0px");
                  };
                  ulbox.css("margin-top",parseInt(ulbox.css("margin-top"))-1+"px")
                };
       },
       inittab:function(){
         var btn=$(".g-bd .pear .bg .btn"),box=$(".showbox"),xx=$(".showbox .btn");
         btn.on("click",function(){
            box.removeClass("up").show().addClass("down");
         });
          xx.on("click",function(){
            if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
            box.hide();
            }else{
            box.addClass("up");
            }
         });
       }

    }
    page.init();
}())
