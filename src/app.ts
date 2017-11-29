import {World} from "ept-ecs/lib";


var world = new World();

console.log("ok");
console.log(`new entity: ${world.create()}`);
console.log(world);

let canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext("2d");

context.fillStyle = 'rgb(0, 0, 0)';
context.fillRect(10, 10, 100, 100);