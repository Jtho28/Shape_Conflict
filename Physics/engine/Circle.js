import Component from "./Component.js"

class Circle extends Component {
    constructor(parent, x, y,r, dx, dy, health, damage, color) {
        super(parent);
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx
        this.dy = dy
        this.health = health
        this.damage = damage
        this.color = color
    }

}

export default Circle