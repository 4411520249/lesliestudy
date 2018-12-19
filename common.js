// 封装a-b的随机整数
function getRandomNum(a,b){
    var res = parseInt(Math.random()*(b-a+1)+ a);
    return res;
    // parseInt([0,1)*71+30)======>parseInt([0,71)+30)======>parseInt[30,101) =>30,100
    // 100-30+1
}
// 获取随机色
function getRandomColor(){
    return 'rgb('+getRandomNum(0,255)+','+getRandomNum(0,255)+','+getRandomNum(0,255)+')';
}

// 获取元素节点
var Element = {
    /*
    ** 功能： 过滤数组，只拿到包含元素节点的数组
    ** 形参nodes ：包含文本、元素节点的一个数组
    */
    getElementNodes : function(nodes){
        var elementsNode = [];
        // 过滤只得到元素节点
        for(var i=0;i<nodes.length;i++){
            if(nodes[i].nodeType == 1){
                elementsNode.push(nodes[i]);
            }
        }
        return elementsNode;
    }, 
    /*
    ** 功能： 传入父元素节点，获取到父元素的所有元素子节点
    ** 形参parent ：父元素节点
    */
    getElementsChild: function(parent){
        var erzis = parent.childNodes; //获取到所有的节点
        return Element.getElementNodes(erzis);//直接调用
    },
    getNextElement : function(ele){
        var next = ele.nextSibling;
        if(next.nodeType != 1){
            next = next.nextSibling;
        }
        return next;
    },
    // ....
}

//  获取元素样式
function getStyle(ele,key){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele)[key];
    }else if(ele.currentStyle){
        return ele.currentStyle[key];
    }else{
        return ele.style[key];
    }
}


// 绑定事件的兼容写法：
function bind(ele,type,fn,isCapture){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,isCapture);
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,fn);
    }else{
        ele["on"+type] = fn;
    }
}


// 封装cookie的设置、获取、删除
var Cookie = {
    // 设置cookie
    //  * name cookie名
    //  * val cookie值
    //  * date 时间对象
    //  * path 路径
    setCookie : function(name,val,date,path){
        var str = name+"="+val;
        if(date){
            str += "; expires="+date.toUTCString();
        }
        if(path){
            str += "; path="+path;
        }
        document.cookie = str;
    },
    // 获取cookie
    getCookie : function(name){
        var cookie = document.cookie;//"left=300; age=17"   
        if(cookie == ""){
            return "";
        }else{
            var cookieArr = cookie.split("; ");
            // var res = "";
            // cookieArr.forEach(function(item){
            //     var arr = item.split("=");
            //     if(arr[0] == name){
            //         res =  arr[1];
            //     }
            // })
            // return res;
            for(var i=0;i<cookieArr.length;i++){
                var arr = cookieArr[i].split("=");
                if(arr[0] == name){
                    return arr[1];
                }
            }
            return "";
        }
    },
    // 删除某条cookie
    delCookie : function(name,path){
        var d = new Date();
        d.setDate(d.getDate()-1);
        Cookie.setCookie(name,"",d,path);
    }
}

