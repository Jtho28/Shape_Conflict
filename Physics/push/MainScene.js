import Scene from "../engine/Scene.js"
import PrefabCircle from "../engine/PrefabCircle.js"
import PrefabRectangle from "../engine/PrefabRectangle.js"
import PrefabTextLarge from "../engine/PrefabTextLarge.js"
import PrefabTextSmall from "../engine/PrefabTextSmall.js"
import PrefabEmpty from "../engine/PrefabEmpty.js"
import ControllerComponent from "./ControllerComponent.js"
import Game from "../engine/Game.js"

import GameObjectList from "../push/GameObjectList.js"
import { randomNumber } from "../engine/scripts.js"
import Time from "../engine/Time.js"

class MainScene extends Scene
{
    constructor()
    {
        super("push");

    }

    start()
    {
        let spawnTime = 0
        this.fillColor = "black"

        for (let gameObject of GameObjectList)
        {
            this.gameObjects.push(gameObject)
        }

        //Push the player
        let player = new PrefabRectangle("Player", -250, -250, 25, 25, 250)
        player.layer = 0;
        this.gameObjects.push(player)

        //Push enemy circles
        for (let i = 0; i < randomNumber(15, 20); i++)
        {
            let circleEnemy = new PrefabCircle("CircleEnemy", Math.random() * (400), Math.random() * (400), 15, 0, 0, 50, 5, "darkorange")
            circleEnemy.layer = 0
            this.gameObjects.push(circleEnemy)
        }

        //Push score text
        let scoreText = new PrefabTextSmall("Score Text", 50, 80, "SCORE: ")
        scoreText.layer = 2
        this.gameObjects.push(scoreText)

        //Push health text
        let healthText = new PrefabTextSmall("Health Text", 50, 50, "HEALTH: ")
        healthText.layer = 2
        this.gameObjects.push(healthText)
        

        

        //push the update component
        this.gameObjects.push(new PrefabEmpty("ControllerGameObject").addComponent(new ControllerComponent()))
    }
}

export default MainScene