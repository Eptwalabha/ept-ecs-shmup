import {World} from "ept-ecs";
import {Position} from "./components/Position";
import {HitBox} from "./components/HitBox";
import {Velocity} from "./components/Velocity";
import {EnemySpawnerSystem} from "./systems/EnemySpawnerSystem";
import {VelocitySystem} from "./systems/VelocitySystem";
import {Tag} from "./components/Tag";
import {CollisionSystem} from "./systems/CollisionSystem";
import {GraphicSystem} from "./systems/GraphicSystem";
import {Health} from "./components/Health";
import {InputSystem} from "./systems/InputSystem";
import {Bound} from "./components/Bound";
import {UISystem} from "./systems/UISystem";
import {Gun} from "./components/Gun";
import {ShootingSystem} from "./systems/ShootingSystem";
import {GrowSystem} from "./systems/GrowSystem";
import {Grow} from "./components/Grow";
import {Sinusoid} from "./components/Sinusoid";
import {SinusoidSystem} from "./systems/SinusoidSystem";
import {Collision, Group} from "./components/Collision";
import {HitSystem} from "./systems/HitSystem";
import {Cooldown} from "./components/Cooldown";
import {DeadSystem} from "./systems/DeadSystem";

let canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext("2d");
let inputSystem: InputSystem = new InputSystem();

let world = new World();
world
    .registerComponent("bound", new Bound(-30, -30, canvas.width + 60, canvas.height + 60))
    .registerComponent("bullet", new Tag())
    .registerComponent("collision", new Collision(Group.PLAYER))
    .registerComponent("dead", new Cooldown(500))
    .registerComponent("outOfBound", new Bound(-20, -50, canvas.width + 150, canvas.height + 100))
    .registerComponent("enemy", new Tag())
    .registerComponent("graphic", new Tag())
    .registerComponent("grow", new Grow())
    .registerComponent("growing", new Tag())
    .registerComponent("gun", new Gun(500))
    .registerComponent("health", new Health(3))
    .registerComponent("hit", new Cooldown(1000))
    .registerComponent("hitbox", new HitBox(10))
    .registerComponent("input", new Tag())
    .registerComponent("player", new Tag())
    .registerComponent("position", new Position(0, 0))
    .registerComponent("sinusoidX", new Sinusoid(1, 200))
    .registerComponent("sinusoidY", new Sinusoid(1, 200))
    .registerComponent("velocity", new Velocity(-1, 0))
    .addSystem(new EnemySpawnerSystem(1500))
    .addSystem(inputSystem)
    .addSystem(new GrowSystem())
    .addSystem(new ShootingSystem())
    .addSystem(new SinusoidSystem())
    .addSystem(new HitSystem())
    .addSystem(new DeadSystem())
    .addSystem(new VelocitySystem())
    .addSystem(new CollisionSystem(70))
    .addSystem(new GraphicSystem(context))
    .addSystem(new UISystem(context))
    .init();

let player = world.create();
world.getComponentManager("player").add(player);
world.getComponentManager("hitbox").add(player, new HitBox(5));
world.getComponentManager("bound").add(player, new Bound(10, 40, canvas.width - 20, canvas.height - 50));
world.getComponentManager("input").add(player);
world.getComponentManager("velocity").add(player, new Velocity(0, 0));
world.getComponentManager("position").add(player, new Position(50, 200));
world.getComponentManager("graphic").add(player);
world.getComponentManager("health").add(player);
world.getComponentManager("gun").add(player, new Gun(100));
world.getComponentManager("grow").add(player);
world.getComponentManager("collision").add(player, new Collision(Group.ENEMY));

let now = 0, last = Date.now();
let active = true;
let loop = function () {
    now = Date.now();
    if (active) {
        world.process(now - last);
    }
    last = now;
    window.requestAnimationFrame(loop);
};

loop();

document.onkeydown = function (event) {
    if (event.keyCode === 13) {
        active = !active;
    }
    inputSystem.updateInput(event.keyCode, true);
};


document.onkeyup = function (event) {
    inputSystem.updateInput(event.keyCode, false);
};
