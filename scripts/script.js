var picker, canvas, ghost, range, select, ctx, gtx, startX, startY, figure,
posx = 0,
posy = 0,
draw = false,
figures = [];

window.onload=function(){

    let wrapper = document.getElementById("wrapper")

    picker = document.getElementById("picker")
    canvas = document.getElementById("canvas")
    ghost = document.getElementById("ghost")
    range = document.getElementById("range")
    select = document.getElementById("mode")

    canvas.width = wrapper.clientWidth
    canvas.height = wrapper.clientHeight
    ghost.width = wrapper.clientWidth
    ghost.height = wrapper.clientHeight
    
    ctx = canvas.getContext("2d")
    gtx = ghost.getContext("2d")

    ghost.addEventListener("mousedown", (e) => {
        let x = e.clientX
        let y = e.clientY        
        drawStart(x, y)

    })

    ghost.addEventListener("touchstart", (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        drawStart(x, y)
    })

    ghost.addEventListener("mousemove", (e) => {
        if(!draw)
            return
        let x = e.clientX
        let y = e.clientY
        let mode = select.value
        if(mode == "rysuj")
            freeDraw(x, y)        
        else if(mode == "linia")
            lineDraw(x, y)    
        else
            circleDraw(x, y)
    })

    ghost.addEventListener("touchmove", (e) => {
        if(!draw)
            return
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        let mode = select.value
        if(mode == "rysuj")
            freeDraw(x, y)        
        else if(mode == "linia")
            lineDraw(x, y)    
        else
            circleDraw(x, y)
        
    })

    ghost.addEventListener("touchend", (e) => {
        drawEnd()
    })

    ghost.addEventListener("mouseup", (e) => {
        drawEnd()
    })

    ghost.addEventListener("mouseout", (e) => {
        drawEnd()
    })

}

function setPosition(x, y){
    var rect = ghost.getBoundingClientRect();
    scaleX = ghost.width / rect.width
    scaleY = ghost.height / rect.height
    posx = (x - rect.left) * scaleX
    posy = (y - rect.top) * scaleY
}

function drawStart(x,y){
    setPosition(x, y)
    startX = posx
    startY = posy
    gtx.beginPath()
    gtx.strokeStyle = picker.value
    gtx.lineWidth = range.value
    gtx.lineJoin = 'round'
    gtx.lineCap = 'round'
    draw=true
    if(select.value == "kolo"){
        figure = new Circle(posx, posy, range.value, picker.value)
    }else{
        figure = new Line(posx, posy, range.value, picker.value)
    }
}

function freeDraw(x, y){
    gtx.moveTo(posx, posy)
    setPosition(x, y)
    gtx.lineTo(posx, posy)
    gtx.stroke()   
    figure.add(posx, posy) 
}

function lineDraw(x, y){
    gtx.closePath()
    gtx.clearRect(0, 0, ghost.width, ghost.height)
    gtx.beginPath()
    gtx.moveTo(startX, startY)
    setPosition(x,y)
    gtx.lineTo(posx,posy)
    gtx.stroke()
    figure.change(posx, posy)
}

function circleDraw(x, y){
    gtx.closePath()
    gtx.clearRect(0, 0, ghost.width, ghost.height)
    gtx.closePath()
    gtx.beginPath()
    setPosition(x,y)
    let radius = Math.sqrt((startX-posx)**2 + (startY-posy)**2)
    gtx.arc(startX,startY, radius, 0, 2 * Math.PI)
    gtx.stroke()
    figure.setRadius(radius)
}

function drawEnd(){
    figures.push(figure)
    gtx.closePath()
    gtx.clearRect(0, 0, ghost.width, ghost.height)
    figure.draw(ctx)
    draw=false
}


function undo(){
    figures.pop()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    figures.forEach(e => {
        e.draw(ctx)
    });
}
function clea(){
    figures = []
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gtx.clearRect(0, 0, canvas.width, canvas.height)
}













































/*


window.onload=function(){
    getData();
}

function getData(){
    let ajax = new XMLHttpRequest;
    ajax.open("Get", 'file.php?L='+Math.random());
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
           // let wyn = ajax.
        }
    }
}

*/