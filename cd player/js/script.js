var prev_button, next_button;
var contentWrap;
var disk_inner;
var pageNum = 0;
var totalNum = 0;
var album;
var pointBtnAll;
var bgArray = new Array();
bgArray[0] = ["#0272a4","#f6a564"];
bgArray[1] = ["#b6bfc8","#36595b"];
bgArray[2] = ["#e58e82","#6f569f"];

window.onload = function(){
    prev_button = document.querySelectorAll("button")[0];
    next_button = document.querySelectorAll("button")[1];
    
    contentWrap = document.querySelector(".contentWrap");
    disk_inner = document.querySelectorAll(".disk_inner");
    album = document.querySelectorAll(".album");
    pointBtnAll = document.querySelectorAll(".pointWrap li");
    totalNum = album.length;

    prev_button.addEventListener("click", function(){
        if(pageNum > 0){
            pageNum --;
        }else{
            pageNum = totalNum -1;
        }
        pageChangeFunc();
    })

    next_button.addEventListener("click", function(){
        if(pageNum < totalNum-1){
            pageNum ++;
        }else{
            pageNum = 0;
        }
        pageChangeFunc();
    })

    for( var i = 0; i < pointBtnAll.length; i++ ){
        (function(idx) {
            pointBtnAll[idx].onclick = function() {
                pageNum = idx;
                pageChangeFunc();
            }
        })(i);
    }

    if(mobileChk()){
        contentWrap.addEventListener("touchstart", touchFunc, false);
        contentWrap.addEventListener("touchend", touchFunc, false);
    }

    var start_X = 0;
    var end_X = 0;

    function touchFunc(evt){
        var type = null;
        var touch = null;
        
        switch (evt.type) {
            case "touchstart":
                type = "mousedown";
                touch = evt.changedTouches[0];
                start_X = touch.clientX;
                end_X = 0;
            break;
            case "touchend":
                type = "mouseup";
                touch = evt.changedTouches[0];
                end_X = touch.clientX;


                var chkNum = start_X - end_X;
                var chkNumAbs = Math.abs(chkNum);

                if(chkNumAbs > 100){
                    if(chkNum < 0){
                        pageNum--;
                    }else {
                        pageNum++;
                    }
                    pageChangeFunc();
                }
            break;
        }
    }
    pageChangeFunc();
}

function pageChangeFunc(){
    
    console.log(pageNum)

    contentWrap.style.background = "linear-gradient(120deg,"+ bgArray[pageNum][0] +", "+ bgArray[pageNum][1] + ")";

    for(var i=0; i<totalNum; i++){
        if(pageNum == i){
            album[i].classList.add("active");
            pointBtnAll[i].classList.add("active");
        }else{
            album[i].classList.remove("active");
            pointBtnAll[i].classList.remove("active");
        }
    }

    disk_inner[pageNum].style.background = bgArray[pageNum][0];
}


function mobileChk() {
    var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (var info in mobileKeyWords) {
        if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
            return true;
        }
    }
    return false;
}