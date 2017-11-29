import {World} from "ept-ecs/lib";
import {Enemy} from "./components/Enemy";
import {Bullet} from "./components/Bullet";
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
import {Player} from "./components/Player";
import {Health} from "./components/Health";
import {InputSystem} from "./systems/InputSystem";
import {Bound} from "./components/Bound";

let canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext("2d");
let inputSystem: InputSystem = new InputSystem();

let world = new World();
world
    .registerComponent("enemy", new Enemy())
    .registerComponent("bullet", new Bullet())
    .registerComponent("firing rate", new FireRate())
    .registerComponent("velocity", new Velocity(-1, 0))
    .registerComponent("position", new Position(0, 0))
    .registerComponent("input", new Input())
    .registerComponent("hitbox", new HitBox(10))
    .registerComponent("dead", new Dead())
    .registerComponent("hit", new Hit(500))
    .registerComponent("player", new Player())
    .registerComponent("health", new Health(3))
    .registerComponent("bound", new Bound(-30, -30, canvas.width + 60, canvas.height + 60))
    .registerComponent("graphic", new Graphic())
    .addSystem(new EnemySpawnerSystem(1000))
    .addSystem(inputSystem)
    .addSystem(new VelocitySystem())
    .addSystem(new CollisionSystem())
    .addSystem(new GraphicSystem(context))
    .init();

let player = world.create();
world.getComponentManager("player").add(player);
world.getComponentManager("hitbox").add(player, new HitBox(5));
world.getComponentManager("bound").add(player, new Bound(10, 10, canvas.width - 20, canvas.height - 20));
world.getComponentManager("input").add(player);
world.getComponentManager("velocity").add(player, new Velocity(0, 0));
world.getComponentManager("position").add(player, new Position(50, 200));
world.getComponentManager("graphic").add(player);
world.getComponentManager("health").add(player);

let now = 0, last = Date.now();
let loop = function () {
    now = Date.now();
    world.process(now - last);
    last = now;
    window.requestAnimationFrame(loop);
};

loop();

document.onkeydown = function (event) {
    inputSystem.updateInput(event.keyCode, true);
};

document.onkeyup = function (event) {
    inputSystem.updateInput(event.keyCode, false);
};
