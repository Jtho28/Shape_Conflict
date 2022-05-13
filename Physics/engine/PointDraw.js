import Component from "./Component.js"

class PointDraw extends Component {
    constructor(parent, fillStyle, strokeStyle) {
        super(parent);
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
    }
    draw(ctx){
        let circle = this.parent.getComponent("Point");


        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;

        ctx.beginPath();
        ctx.arc(
            circle.x,
            circle.y,
            2,
            0,
            Math.PI*2
        )
        ctx.fill()
        ctx.stroke()
    }

}

export default PointDraw