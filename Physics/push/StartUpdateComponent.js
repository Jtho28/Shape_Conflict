import Component from "../engine/Component.js"
import Game from "../engine/Game.js";
import Time from "../engine/Time.js"
//import StartGameObject from "./StartGameObject.js";

class StartUpdateComponent extends Component
{
    constructor(parent)
    {
        super(parent)
        this.time = 0
    }

    update()
    {
        this.time += Time.secondsBetweenFrame;
        if (this.time > 3 )
        {
            Game.changeScene(1)
        }
    }
}

export default StartUpdateComponent;