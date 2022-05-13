import GameObject from "./GameObject.js"
import Text from "./Text.js";
import TextDraw from "./TextDraw.js";

class PrefabTextLarge extends GameObject{
  constructor(name, x, y, text, font){
    super(name);
    this.x = x;
    this.y = y;
    this.text = text;
    this.font = font;

    this.start();
  }
  start(){
    this.components.push(new Text(this, this.x,this.y,this.text, this.font));
    this.components.push(new TextDraw(this, "white", "transparent"));
  }
}

export default PrefabTextLarge;