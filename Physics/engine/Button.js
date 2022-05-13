import Component from "./Component.js"

class Button extends Component {
    constructor(parent, x, y, w, h, text, fillColor, strokeColor, font) {
        super(parent);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.font = font;
    }

}

export default Button