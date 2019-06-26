
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(yyy) //自动调整画板大小

listenToUser(yyy) //监听鼠标事件

var eraserEnabled = false

pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0, 0, yyy.width, yyy.height);
}
save.onclick = function(){
    var url = yyy.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的大作'
    a.click()
}




red.onclick = function(){
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
}

thin.onclick = function(){
    lineWidth = 5
}
thick.onclick = function(){
    lineWidth = 10
}

//  橡皮擦和画笔的存在互斥,点击实现切换,换成图标后重新写 
// var eraserEnabled = false
// eraser.onclick = function() {
//     eraserEnabled = true
//     actions.className = 'actionsx'
// }
// brush.onclick = function(){
//     eraserEnabled = false
//     actions.className = 'actions'
// }


/*****/

function autoSetCanvasSize(canvas){
    setCanvasSize()

    window.onresize = function() {
        setCanvasSize()
    }
    function setCanvasSize() {  //获取屏幕的宽高,不能自行拉伸,不适配
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

// function drawCircle(x, y, radius) {
//     context.beginPath()
//     context.fillStyle = 'red'
//     context.arc(x, y, radius, 0, Math.PI * 2);
//     context.fill()
// }

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) //起点
    context.lineWidth = lineWidth //去取当前的画笔宽度
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas){

    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    //特性检测
if('ontouchstart' in document.body){
//if(document.body.ontouchstart !== undefined){  使用这个也可以
    //触屏设备
    canvas.ontouchstart = function(aaa){
        // console.log('开始摸我了')
        // console.log(aaa)  据此调整坐标的获取
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        //console.log(x, y)
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                x: x,
                y: y
            }
        }
    },
    canvas.ontouchmove = function(aaa){
        //console.log('边摸边动')
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY

        if(!using){return}

        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                x: x,
                y: y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    },
    canvas.ontouchend = function(){
        //console.log('摸完')
        using = false
    }
}else{
    //非触屏设备
    canvas.onmousedown = function(aaa) {
        //console.log('down') 移动端测试用

        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                x: x,
                y: y
            }
        }
    }

    canvas.onmousemove = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY

        if(!using){return}

        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                x: x,
                y: y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }

    canvas.onmouseup = function(aaa) {
        using = false
    }
}   
}

