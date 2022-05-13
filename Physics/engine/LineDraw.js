import Component from "./Component.js"

class LineDraw extends Component {
    constructor(parent, strokeStyle) {
        super(parent);
        this.strokeStyle = strokeStyle;
    }
    draw(ctx){
        let line = this.parent.getComponent("Line");
        ctx.strokeStyle = this.strokeStyle;

        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke()
    }

}

export default LineDraw