import PrefabTextLarge from "../engine/PrefabTextLarge.js";
import Scene from "../engine/Scene.js"
import StartGameObject from "./StartGameObject.js"

class StartScene extends Scene
{
    constructor()
    {
        super("Main Scene");

    }

    start()
    {
        this.gameObjects.push(new StartGameObject(-390,0));
        //this.gameObjects.push(new PrefabTextLarge("ShapeConflict", -390, 0, "SHAPE CONFLICT", "90px arial"))
    }
}

export default StartScene;