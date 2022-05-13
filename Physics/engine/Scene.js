import Game from "./Game.js"

class Scene {
  constructor(title, fillColor = "black") {
    this.title = title;
    this.fillColor = fillColor;
  }
  restart() {
    this.gameObjects = [];
    this.start();
  }
  update(ctx) {
    for (let gameObject of this.gameObjects) {
      gameObject.update(ctx);
    }
  }
  draw(ctx) {
    
    //Fill the canvas to the browser

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    //Fill with a generic color. If the aspect ratio does not fill the browser exactly, then this is to color of the bars that will be displayed.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //Compensate for aspect ratio
    let currentAspectRatio = ctx.canvas.width / ctx.canvas.height;

    //Variables for the new drawing space
    let newX = ctx.canvas.width;
    let newY = ctx.canvas.height;
    let marginX = 0;
    let marginY = 0;


    if(Game.aspectRatio > currentAspectRatio){
      //Shrink in Y
      newY = ctx.canvas.width / Game.aspectRatio;
      marginY = (ctx.canvas.height - newY)/2;
    }
    else //if Game.aspectRatio <= currentaspectRatio
    {
      //Shrink in X
      newX = ctx.canvas.height * Game.aspectRatio;
      marginX = (ctx.canvas.width - newX)/2;
    }

  

    //Transform to account for the margins
    ctx.save();
    ctx.translate(marginX, marginY);

    //Clear the game drawing space
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(0, 0, newX, newY);
    ctx.beginPath();
    ctx.rect(0,0,newX,newY);
    ctx.clip();

    

    //Now adjust for the camera
    ctx.save();
    let pixelSize = newX/Game.cameraWidth*Game.cameraScale; //How large a unit in the world is in pixels. In a small screen, this is a small number. On a large screen, this is a large number
    console.log(pixelSize)
    // ctx.translate(pixelSize * )
    let ulX = Game.cameraX - (Game.cameraWidth/2)/Game.cameraScale;
    let ulY = Game.cameraY - (Game.cameraWidth/2)/Game.cameraScale;
    ctx.translate(pixelSize * -ulX, pixelSize * -ulY)
    ctx.scale(pixelSize, pixelSize);
    //ctx.translate(-Game.cameraX, -Game.cameraY);
    //We know the size of the display: newX, newY

    //Draw Layers
    for (let i = -2; i <= 0; i++) {
      for (let gameObject of this.gameObjects.filter(go => go.layer == i)) {
        gameObject.draw(ctx);
      }
    }

    ctx.restore();//Remove camera transforms
    //Draw the game objects that are not affected by the camera movement
    for (let i = 1; i <= 2; i++) {
      for (let gameObject of this.gameObjects.filter(go => go.layer == i)) {
        gameObject.draw(ctx);
      }
    }
    ctx.restore();//Remove aspect ratio transforms
  }
  remove() {
    let toRemove = this.gameObjects.filter(g => g.markForDelete);
    if (toRemove.length > 0)
      console.log(toRemove.length)
    this.gameObjects = this.gameObjects.filter(g => !g.markForDelete);
  }
}

export default Scene;