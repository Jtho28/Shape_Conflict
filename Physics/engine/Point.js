import Component from "./Component.js"

class Point extends Component {
    constructor(parent, x, y) {
        super(parent);
        this.x = x;
        this.y = y;
    }

}

export default Point