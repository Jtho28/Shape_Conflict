import Component from "../engine/Component.js"
import Game from "../engine/Game.js"
import Input from "../engine/Input.js"
import Collisions from "../engine/Collisions.js"
import {getCanvas, ease, bounce, randomNumber} from "../engine/scripts.js"

import Time from "../engine/Time.js"

import PrefabCircle from "../engine/PrefabCircle.js"
import Point from "../engine/Point.js"
import mathPoint from "../engine/math/Point.js"
import GameObjectList from "../push/GameObjectList.js"

class ControllerComponent extends Component
{
    constructor(parent)
    {
        super(parent)
        this.playerSpeed = 400
        this.circleEnemySpeed = 150
        this.lineBombSpeed = 10
        this.timeSinceLastEnemy = 1
        this.fireRate = 0
        this.score = 0
        this.multiplier = 1

        this.timeBetweenEnemies = 1
        this.playerHalfRange = 400

        this.playing = 0
        this.dying = 1
        this.state = this.playing

        this.dyingTime = 0
        this.spawnTime = 0
    }
    update()
    {
        if (this.state == this.playing)
        {
            
            
            //Import Moving Game Objects
            let playerGameObject = Game.findByNameOne("Player")
            let playerRec = playerGameObject.getComponent("Rectangle")

            
            //Player Movement
            let diffX = 0
            let diffY = 0
            if (Input.getKey("a"))
            {
                diffX -= this.playerSpeed * Time.secondsBetweenFrame
                //console.log("success!")
            }
            if (Input.getKey("d"))
            {
                diffX += this.playerSpeed * Time.secondsBetweenFrame
            }
            if (Input.getKey("w"))
            {
                diffY -= this.playerSpeed * Time.secondsBetweenFrame
            }
            if (Input.getKey("s"))
            {
                diffY += this.playerSpeed * Time.secondsBetweenFrame
            }


            //can the player move
            if (playerRec.x + diffX > -this.playerHalfRange && playerRec.x + diffX + playerRec.w < this.playerHalfRange)
            {
                playerRec.x += diffX
            }
            
            if (playerRec.y + diffY > -this.playerHalfRange && playerRec.y + diffY + playerRec.h < this.playerHalfRange)
            {
                playerRec.y += diffY
            }

            //player camera
            

            //Circle enemy movement and update and collisions
            diffX = 0
            diffY = 0
            let circleEnemyObjects = Game.findByName("CircleEnemy")
            for (let circleEnemy of circleEnemyObjects)
            {
                //check for collision with fellow circles
                for (let circleEnemy2 of circleEnemyObjects)
                {
                    if (Collisions.inCollision(circleEnemy.getComponent("Circle"), circleEnemy2.getComponent("Circle")))
                    {
                        console.log("COLLIDEC")
                        circleEnemy.health += circleEnemy2.health * 5
                        circleEnemy2.health += circleEnemy2.health * 5
                    }
                }
                //end game conditoin
                if (Collisions.inCollision(playerRec, circleEnemy.getComponent("Circle")))
                {
                    console.log("COLLIDE")
                    playerRec.health -= circleEnemy.getComponent("Circle").damage
                    
                    //cheack player health
                    if (playerRec.health <= 0)
                    {
                        this.state = this.dying
                    }
                    //playerGameObject.markForDelete = true
                }
                else
                {
                    let circleEnemyComponent = circleEnemy.getComponent("Circle")
                    let offsetToPlayer = new mathPoint(playerRec.x - circleEnemyComponent.x, playerRec.y - circleEnemyComponent.y)
                    offsetToPlayer = offsetToPlayer.normalized()
                    diffX = offsetToPlayer.x * Time.secondsBetweenFrame * this.circleEnemySpeed
                    diffY = offsetToPlayer.y * Time.secondsBetweenFrame * this.circleEnemySpeed

                    circleEnemyComponent.x += diffX
                    circleEnemyComponent.y += diffY
                }

                
            }
            //add more circles every given seconds
            this.spawnTime += Time.secondsBetweenFrame
            
            if (this.spawnTime >= 5)
            {
                for (let i = 0; i < randomNumber(15, 50); i++)
                {
                    let cX = randomNumber(-800, 800)
                    let cY = randomNumber(-800, 800)
                    if ((cX < -this.playerHalfRange || cX > this.playerHalfRange) && (cY < -this.playerHalfRange || cY > this.playerHalfRange))
                    {
                        let circleEnemy = new PrefabCircle("CircleEnemy", cX, randomNumber(-800, 800), 15, 0, 0, 50, 5, "darkorange")
                        circleEnemy.layer = 0
                        Game.scene().gameObjects.push(circleEnemy)
                    }
                }
                this.spawnTime = 0
            }
            

            //Bullets
            diffX = 0
            diffY = 0
            this.fireRate += Time.secondsBetweenFrame
            if (Input.getKey("ArrowLeft"))
            {
                diffX = -10
                
            }
            if (Input.getKey("ArrowRight"))
            {
                diffX = 10
            }
            if (Input.getKey("ArrowDown"))
            {
                diffY = 10
            }
            if (Input.getKey("ArrowUp"))
            {
                diffY = -10
            }
            if (diffX != 0 || diffY != 0)
            {
                let bullet = new PrefabCircle("Bullet", playerRec.x + playerRec.w / 2, playerRec.y + playerRec.h / 2,
                                                5, diffX, diffY, 0, 1, "ivory")
                bullet.layer = -1
                Game.scene().gameObjects.push(bullet)
            }

            let bullets = Game.findByName("Bullet")
            for (let bullet of bullets)
            {
                let bulletComponent = bullet.getComponent("Circle")
                bulletComponent.x += bulletComponent.dx
                bulletComponent.y += bulletComponent.dy

                if (bulletComponent.x < -this.playerHalfRange || bulletComponent.x > this.playerHalfRange
                    || bulletComponent.y < -this.playerHalfRange || bulletComponent.y > this.playerHalfRange)
                {
                    bullet.markForDelete = true;
                    //console.log(bulletComponent.markForDelete)
                }
                
                let circleEnemyObjects = Game.findByName("CircleEnemy")
                for (let circleEnemy of circleEnemyObjects)
                {
                    let circleEnemyComponent = circleEnemy.getComponent("Circle")
                    if (Collisions.inCollision(bulletComponent, circleEnemyComponent))
                    {
                        //console.log("BULLET HAS COLLIDED WITH CIRCLE")
                        circleEnemyComponent.health -= bulletComponent.damage
                        bullet.markForDelete = true;
                        
                        
                        //console.log(circleEnemyComponent.health)
                        if (circleEnemyComponent.health <= 0)
                        {
                            //Particle Spawn
                            for (let i = 0; i < randomNumber(10, 15); i++)
                            {
                                let particle = new PrefabCircle("Particle", randomNumber(circleEnemyComponent.x - circleEnemyComponent.r, circleEnemyComponent.x + circleEnemyComponent.r), 
                                                                randomNumber(circleEnemyComponent.y - circleEnemyComponent.r, circleEnemyComponent.y + circleEnemyComponent.r), 5, 
                                                                randomNumber(-10, 10), randomNumber(-10, 10), 0, 0, "darkorange")
                                Game.scene().gameObjects.push(particle)
                            }
                            //Particle movement
                            
                            circleEnemy.markForDelete = true
                            this.score += 1
                            //this.spawnTime += 1
                        }
                        
                    }
                    


                }
            }
            //Particle movement and deletion
            let particleObjects = Game.findByName("Particle")
            for (let particle of particleObjects)
            {
                let particleComponent = particle.getComponent("Circle")
                particleComponent.x += particleComponent.dx
                particleComponent.y += particleComponent.dy

                if (particleComponent.x < -this.playerHalfRange || particleComponent.x > this.playerHalfRange
                    || particleComponent.y < -this.playerHalfRange || particleComponent.y > this.playerHalfRange)
                {
                    particle.markForDelete = true
                }
                if (Collisions.inCollision(playerRec, particleComponent))
                {
                    this.multiplier += .1
                    playerRec.health += 1
                    if (this.circleEnemySpeed <= 399)
                    {
                        this.circleEnemySpeed += 1
                    }
                    particle.markForDelete = true
                }
            }

            //update score
            let scoreText = Game.findByNameOne("Score Text")
            scoreText.getComponent("Text").text = "SCORE: " + Math.ceil(this.score * this.multiplier)

            //update health
            let healthText = Game.findByNameOne("Health Text")
            healthText.getComponent("Text").text = "HEALTH: " + playerRec.health



        }
        else if (this.state = this.dying)
        {
            this.dyingTime += Time.secondsBetweenFrame
            let playerGameObject = Game.findByNameOne("Player")
            let playerRec = playerGameObject.getComponent("Rectangle")
            let circleEnemyObjects = Game.findByName("CircleEnemy")
            if (this.dyingTime >= 1 && this.dyingTime < 2)
            {
                for (let circleEnemy of circleEnemyObjects)
                {
                    circleEnemy.markForDelete = true
                }
            }
            if (this.dyingTime >= 3)
            {
                playerRec.w -= 1
                playerRec.h -= 1
                if (playerRec.w == 0 || playerRec.h == 0)
                {
                    playerGameObject.markForDelete = true
                    Game.changeScene(0)
                }
            }
            
        }
    }
}

export default ControllerComponent;
