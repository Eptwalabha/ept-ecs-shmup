import {World} from "ept-ecs/lib";
import {Enemy} from "./components/Enemy";
import {FireRate} from "./components/FireRate";
import {Position} from "./components/Position";
import {Input} from "./components/Input";
import {HitBox} from "./components/HitBox";
import {Velocity} from "./components/Velocity";
import {EnemySpawnerSystem} from "./systems/EnemySpawnerSystem";
import {VelocitySystem} from "./systems/VelocitySystem";
import {Dead} from "./components/Dead";
import {Hit} from "./components/Hit";
import {CollisionSystem} from "./systems/CollisionSystem";
import {GraphicSystem} from "./systems/GraphicSystem";
import {Graphic} from "./components/Graphic";

let canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext("2d");

let world = new World();
world
    .registerComponent("enemy", new Enemy())
    .registerComponent("firing rate", new FireRate())
    .registerComponent("velocity", new Velocity(-1, 0))
    .registerComponent("position", new Position(0, 0))
    .registerComponent("input", new Input())
    .registerComponent("hitbox", new HitBox(10))
    .registerComponent("dead", new Dead())
    .registerComponent("hit", new Hit(500))
    .registerComponent("graphic", new Graphic())
    .addSystem(new EnemySpawnerSystem(1000))
    .addSystem(new VelocitySystem())
    .addSystem(new CollisionSystem())
    .addSystem(new GraphicSystem(context))
    .init();

let now = 0, last = Date.now();
let loop = function () {
    now = Date.now();
    world.process(now - last);
    last = now;
    window.requestAnimationFrame(loop);
};

loop();
