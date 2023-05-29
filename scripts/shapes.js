class Shape{
    constructor() {}

    draw() {}
}

class Line extends Shape{

    constructor(x, y, width, style){
        super()
        this.width = width
        this.style = style
        this.points = [];
        this.add(x,y)
    }

    add(x, y){
        this.points.push([x,y])
    }

    change(x,y){
        if(this.points.length != 1)
            this.points.pop()
        this.add(x,y)
    }

    draw(ctx){
        ctx.beginPath()
        ctx.strokeStyle = this.style
        ctx.lineWidth = this.width
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        for(let i = 0; i < this.points.length - 1; i++){
            ctx.moveTo(this.points[i][0], this.points[i][1])
            ctx.lineTo(this.points[i+1][0], this.points[i+1][1])
            ctx.stroke()
        }
        ctx.closePath()
    }

}

class Circle extends Shape{

    constructor(x, y, width, style){
        super()
        this.width = width
        this.style = style
        this.x = x
        this.y = y
    }

    setRadius(r){
        this.r = r
    }

    draw(ctx){
        ctx.beginPath()
        ctx.strokeStyle = this.style
        ctx.lineWidth = this.width
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.arc(this.x,this.y, this.r, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.closePath()
    }

}