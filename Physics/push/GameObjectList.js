import Scene from "../engine/Scene.js"
import PrefabCircle from "../engine/PrefabCircle.js";
import PrefabRectangle from "../engine/PrefabRectangle.js";
import PrefabLine from "../engine/PrefabLine.js";
import PrefabTextLarge from "../engine/PrefabTextLarge.js";
import PrefabTextSmall from "../engine/PrefabTextSmall.js";
import PrefabEmpty from "../engine/PrefabEmpty.js";
import ControllerComponent from "./ControllerComponent.js"

import Point from "../engine/Point.js";
import PointDraw from "../engine/PointDraw.js";

//draw playing area
let playingAreaRectangle = new PrefabRectangle("PlayingAreaRectangle", -400, -400, 800, 800)
playingAreaRectangle.getComponent("RectangleDraw").fillStyle = "black"
playingAreaRectangle.layer = -2;

export default 
[
    playingAreaRectangle
]