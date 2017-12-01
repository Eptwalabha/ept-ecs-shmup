import {Manager, World, DelayedSystem} from 'ept-ecs/lib';
import {Position} from '../components/Position';
import {Velocity} from "../components/Velocity";
import {HitBox} from "../components/HitBox";
import {Gun} from "../components/Gun";
import {Sinusoid} from "../components/Sinusoid";

export class EnemySpawnerSystem extends DelayedSystem {
    private enemyManager: Manager;

    constructor(delay: number) {
        super(delay, delay);
    }

    public init(world: World) {
        super.init(world);
        this.enemyManager = world.getComponentManager("enemy");
    }

    protected processSystem(): void {
        var enemy = this.world.create();
        this.enemyManager.add(enemy);
        this.world.getComponentManager("position").add(enemy, new Position(415, Math.random() * 360 + 40));
        this.world.getComponentManager("velocity").add(enemy, new Velocity(-30 - Math.random() * 30, 0));
        this.world.getComponentManager("hitbox").add(enemy, new HitBox(Math.floor(Math.random() * 5) + 4));
        this.world.getComponentManager("graphic").add(enemy);
        this.world.getComponentManager("collision").add(enemy);
        if (Math.random() <= 0.2) {
            let gun = new Gun(2000);
            gun.shooting = true;
            this.world.getComponentManager("gun").add(enemy, gun);
        }
        let randFreq = Math.random() * .5;
        let randAmp = Math.random() * 130 + 70;
        if (Math.random() <= 0.5) {
            let sinusoid = new Sinusoid(randFreq, randAmp);
            this.world.getComponentManager("sinusoidX").add(enemy, sinusoid);
        } else if (Math.random() <= 0.5) {
            let sinusoid = new Sinusoid(randFreq, randAmp);
            this.world.getComponentManager("sinusoidY").add(enemy, sinusoid);
        } else if (Math.random() <= 0.5) {
            let sinusoid = new Sinusoid(randFreq, randAmp);
            this.world.getComponentManager("sinusoidX").add(enemy, sinusoid);
            this.world.getComponentManager("sinusoidY").add(enemy, sinusoid);
        }
    }

}