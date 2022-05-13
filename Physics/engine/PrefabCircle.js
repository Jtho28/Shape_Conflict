import GameObject from "./GameObject.js"
import Circle from "./Circle.js";
import CircleDraw from "./CircleDraw.js";

class PrefabCircle extends GameObject{
  constructor(name, x, y, r, dx, dy, health, damage, color){
    super(name);
    this.x = x;
    this.y = y;
    this.r =r;
    this.dx = dx
    this.dy = dy
    this.health = health
    this.damage = damage
    this.color = color

    this.start();
  }
  start(){
    this.components.push(new Circle(this, this.x,this.y,this.r, this.dx, this.dy, this.health, this.damage));
    this.components.push(new CircleDraw(this, this.color, "transparent"));
  }
}

export default PrefabCircle;