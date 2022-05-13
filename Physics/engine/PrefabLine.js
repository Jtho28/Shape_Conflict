import GameObject from "./GameObject.js"
import Line from "./Line.js";
import LineDraw from "./LineDraw.js";

class PrefabLine extends GameObject{
  constructor(name, x, y, x2, y2){
    super(name);
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;

    this.start();
  }
  start(){
    this.components.push(new Line(this, this.x,this.y,this.x2,this.y2));
    this.components.push(new LineDraw(this, "gray", "transparent"));
  }
}

export default PrefabLine;