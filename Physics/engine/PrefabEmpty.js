import GameObject from "./GameObject.js"

class PrefabEmpty extends GameObject{
  constructor(name){
    super(name);
    
    this.start();
  }
  start(){
    
  }
}

export default PrefabEmpty;