/**
 * cookie
 */
function setCookie(key, value, day) {
    var settime="";
    if (day!==undefined){
        var d=new Date();
        d.setDate(d.getDate()+day);
        settime=";expires="+d;
    }
    key=encodeURI(key);
    value=encodeURI(value);
    document.cookie=key+"="+value+settime;
}
function getCookie(key) {
    key=encodeURI(key);
    var stu=document.cookie;
    stu=stu.split("; ");
    for (var i = 0; i < stu.length; i++) {
        var arr=stu[i].split("=");
        if (arr[0]===key){
            return decodeURI(arr[1]);
        }
    }
    return null;
}
function removeCookie(key) {
    setCookie(key,"1",-1);
}

/**
 * 购物车cookie方法封装
 *
 */
function allCookie() {  //获取购物车总的数据,返回集合数组
    var stu=getCookie("shopping");
    if (stu==null){
        return null
    }
    return JSON.parse(stu);

}
function addCookie(obj) {  //加入cookie
    var stu=getCookie("shopping");
    var objs;
    if (stu==null){
        objs=[];
        objs.push(obj);
    }else{
        objs=JSON.parse(stu);
        var flag=true;
        for (var j = 0; j < objs.length; j++) {
            if(obj.on===objs[j].on){
                objs[j].num+=obj.num;
                flag=false;
                break;
            }
        }
        if (flag){
            objs.push(obj);
        }
    }
    stu=JSON.stringify(objs);
    setCookie("shopping",stu,3);
}
function removeshop(on) {   //删除商品
    var stu=getCookie("shopping");
    var objs;
    if (stu==null){
        return null;
    }else{
        objs=JSON.parse(stu);
        for (var j = 0; j < objs.length; j++) {
            if(on===objs[j].on){
                objs.splice(j,1);
                stu=JSON.stringify(objs);
                setCookie("shopping",stu,3);
                return true;
            }
        }
    }
    stu=JSON.stringify(objs);
    setCookie("shopping",stu,3);
}
function changeCookie(on,num) { //改变商品数量
    var stu=getCookie("shopping");
    var objs;
    if (stu==null){
        return null;
    }else{
        objs=JSON.parse(stu);
        for (var j = 0; j < objs.length; j++) {
            if(on===objs[j].on){
                objs[j].num=num;
                break;
            }
        }
    }
    stu=JSON.stringify(objs);
    setCookie("shopping",stu,3);
}
function allNumber() {
    var stu=getCookie("shopping");
    var number=0;
    var objs;
    if (stu==null){
        return 0;
    }else{
        objs=JSON.parse(stu);
        for (var j = 0; j < objs.length; j++) {
            number+=parseInt(objs[j].num);
        }
    }
    return number;
}
/**
 * 用户cookie(user)
 */
function userAddCookie(name,pwd,time) {
    var stu=getCookie(name);
    var objs;
    var obj={
        name:name,
        pwd:pwd
    };
    if (stu==null){
        objs=[];
        objs.push(obj);
    }else{
        objs=JSON.parse(stu);
        for (var j = 0; j < objs.length; j++) {
            if(obj.name===objs[j].name){
                return false;
            }
        }
        objs.push(obj);
    }
    stu=JSON.stringify(objs);
    if(time===undefined){
        time=3;
    }
    setCookie(name,stu,time);
    return true;
}
function userGetCookie(name) {
    var stu=getCookie(name);
    var objs;
    if (stu==null){
        return null
    }else{
        objs=JSON.parse(stu);
        for (var j = 0; j < objs.length; j++) {
            if(name===objs[j].name){
                return [objs[j].pwd,objs[j].val];
            }
        }
    }
    return null;
}
function userChangeCookie(name, type, val) {
    var stu=getCookie(name);
    var objs;
    if (stu==null){
        return null;
    }else{
        objs=JSON.parse(stu);
        for (var j = 0; j < objs.length; j++) {
            if(name===objs[j].name){
                if(type==="pwd"){objs[j].pwd=pwd;}
                else if(type==="val"){objs[j].val=val}
                break;
            }
        }
    }
    stu=JSON.stringify(objs);
    setCookie(name,stu,3);
}