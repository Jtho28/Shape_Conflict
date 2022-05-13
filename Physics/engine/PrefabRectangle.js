import GameObject from "./GameObject.js"
import Rectangle from "./Rectangle.js";
import RectangleDraw from "./RectangleDraw.js";

class PrefabRectangle extends GameObject{
  constructor(name, x, y, w, h, health){
    super(name);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.health = health

    this.start();
  }
  start(){
    this.components.push(new Rectangle(this, this.x,this.y,this.w,this.h, this.health));
    this.components.push(new RectangleDraw(this, "gray", "transparent"));
  }
}

export default PrefabRectangle;