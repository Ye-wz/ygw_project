function Lunbo(objs,time,ul,fn){        //轮播图
    /**
     * objs 轮播图组
     * time 切换的时间
     * ul   装轮播图的父类元素
     * fn   每次切换完后的方法回调
     * @type {IArguments}
     */
    var fathArguments=arguments;
    var t=0;
    var runops=setInterval(run,time);
    function run() {
        var last=t;
        t<objs.length-1?t++:t=0;
        danchu(objs[last],objs[t]);
        if(fathArguments.length>=4){
            fn(t);
        }
    }
    this.backRun=function (){           //图片回切
        var last=t;
        t>0?t--:t=objs.length-1;
        console.log(objs[last]);
        danchu(objs[last],objs[t]);
        if(fathArguments.length>=4){
            fn(t);
        }
    };
    this.nexRun=function (){            //切至下一张图
        var last=t;
        t<objs.length-1?t++:t=0;
        danchu(objs[last],objs[t]);
        if(fathArguments.length>=4){
            fn(t);
        }
    };
    this.goRun=function(next){          //切至某一张图
        var last=t;
        t=next;
        danchu(objs[last],objs[t]);
    };
    ul.onmouseover=function () {
        clearInterval(runops);
    };
    ul.onmouseout=function () {
        runops=setInterval(run,time);
    };
    document.addEventListener("visibilitychange",function () {
        if(document.visibilityState==="visible"){
            runops=setInterval(run,time);
        }else{
            clearInterval(runops);
        }
    });
}
function danchu(lastElement, nowElement) {      //淡出淡入方法
    var lastOp=0.9;
    nowElement.style.opacity="0";
    nowElement.style.display="block";
    var t1=setInterval(function runOpacity() {
        if (lastOp<=0){
            clearInterval(t1);
            lastElement.style.display="none";
            lastElement.style.opacity="0";
            nowElement.style.opacity="1";
            lastOp=0.9;
            return ;
        }
        lastElement.style.opacity=lastOp;
        nowElement.style.opacity=1-lastOp;
        lastOp-=0.1;
    },30);
}
/**
 *json
 */

function xml(URL,fn){
    //创建对象
    var requst;
    if (window.XMLHttpRequest){
        requst=new XMLHttpRequest();
    }else{
        requst=new ActiveXObject("Microsoft.XMLHTTP");
    }
    //打开请求
    requst.open("GET",URL,true);
    //回调函数
    requst.onreadystatechange=function () {
        if(requst.readyState===4&&requst.status===200){
            fn(requst);
        }else{
            console.log(requst.readyState);
        }
    };
    //发送请求
    requst.send();
}

/*
    右滑动轮播
 */
function lunboYou(Elemt,box,time) {
    var width=box.offsetWidth;
    var maxWidth=Elemt.offsetWidth;
    var num=maxWidth/width-2;
    var now=0;
    var runops=setInterval(run,time);
    function run(){
        now++;
        Elemt.style.transition="all 1.5s ease";
        Elemt.style.left=-now*width+"px";
        if(now>=num){
            setTimeout(function () {
                Elemt.style.transition="none";
                now=1;
                Elemt.style.left=-now*width+"px";
            },1500);
        }
    }
    box.onmouseover=function () {
        clearInterval(runops);
    };
    box.onmouseout=function () {
        runops=setInterval(run,time);
    };
    document.addEventListener("visibilitychange",function () {
        if(document.visibilityState==="visible"){
            runops=setInterval(run,time);
        }else{
            clearInterval(runops);
        }
    });
}
/*
        放大镜
 */
function magnifier(small_box,big_box,shelter,img) {
    //获取小盒子元素
    //获取大盒子元素
    //获取遮挡框元素
    //给小盒子注册事件
    //小盒子悬浮事件:遮挡框出现于消失
    small_box.onmouseover=function (e) { //小盒子悬浮事件
        shelter.style.display="block";
        big_box.style.display="block";
        var maxX=this.clientWidth-shelter.offsetWidth;
        var maxY=this.clientHeight-shelter.offsetHeight;//最大移动距离
        var maxImgX=img.clientWidth-big_box.offsetWidth;
        var maxImgY=img.clientHeight-big_box.offsetHeight;
        small_box.onmousemove=function(e){   //移动事件
            //解决兼容问题
            e = e || window.event;
            /**
             * e.clien 鼠标相对于页面实时位置
             * this.offsetLeft 样式偏移高度
             * shelter.offsetHeight/2 设定遮挡框中心位置
             */
            var nLeft=e.pageX-this.offsetLeft-this.clientLeft-shelter.offsetWidth/2;
            //鼠标位置  //容器偏移量   //容器内部偏移量   //设置遮挡框到中间
            var nTop=e.pageY-this.offsetTop-this.clientTop-shelter.offsetHeight/2; //基础偏移量
            //设置遮挡框永远在区域内
            nLeft=Math.min(maxY,Math.max(0,nLeft));
            nTop=Math.min(maxX,Math.max(0,nTop));
            shelter.style.top=nTop+"px";
            shelter.style.left=nLeft+"px";
            img.style.left=-maxImgX*nLeft/maxX+"px";
            img.style.top=-maxImgY*nTop/maxY+"px";
        };
    };
    small_box.onmouseout=function () {
        shelter.style.display="none";
        big_box.style.display="none";
        small_box.onmousemove=null;        //清除移动事件
    }
}
/*

 */
    function hasPhone(e) {          //判断手机
    if(new RegExp("^\\d{11}$").test(e.value)){
        return e.value;
    }else if(e.value){
    }else{
    }
    return false;
}
    function hasPas(e) {          //判断密码
        console.log(e.value);
    if(new RegExp("^[A-Za-z0-9_]{6,16}$").test(e.value)){
        return e.value;
    }else if(e.value){
    }else{
    }
    return false;
}
    function hasMail(e) {          //判断邮箱
    if(new RegExp("^.+@.+(\\.([a-zA-Z]{2,4})){1,3}$").test(e.value)){
        return e.value;
    }else if(e.value){
    }else{
    }
    return false;
}