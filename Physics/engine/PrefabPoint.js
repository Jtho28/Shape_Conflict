import GameObject from "./GameObject.js"
import Point from "./Point.js";
import PointDraw from "./PointDraw.js";

class PrefabPoint extends GameObject{
  constructor(name, x, y, r){
    super(name);
    this.x = x;
    this.y = y;
    this.r =r;

    this.start();
  }
  start(){
    this.components.push(new Point(this, this.x,this.y));
    this.components.push(new PointDraw(this, "gray", "transparent"));
  }
}

export default PrefabPoint;