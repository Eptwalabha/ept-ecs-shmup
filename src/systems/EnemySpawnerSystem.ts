import {Manager, World, DelayedSystem} from 'ept-ecs/lib';
import {Position} from '../components/Position';
import {Velocity} from "../components/Velocity";
import {HitBox} from "../components/HitBox";

export class EnemySpawnerSystem extends DelayedSystem {
    private positionManager: Manager;
    private velocityManager: Manager;
    private enemyManager: Manager;
    private hitboxManager: Manager;
    private graphicManager: Manager;

    constructor(delay: number) {
        super(delay, delay);
    }

    public init(world: World) {
        super.init(world);
        this.positionManager = world.getComponentManager("position");
        this.velocityManager = world.getComponentManager("velocity");
        this.enemyManager = world.getComponentManager("enemy");
        this.hitboxManager = world.getComponentManager("hitbox");
        this.graphicManager = world.getComponentManager("graphic");
    }

    protected processSystem(): void {
        var enemy = this.world.create();
        this.enemyManager.add(enemy);
        this.positionManager.add(enemy, new Position(450, Math.random() * 400));
        this.velocityManager.add(enemy, new Velocity(-30 - Math.random() * 30, 0));
        this.hitboxManager.add(enemy, new HitBox(Math.floor(Math.random() * 5) + 4));
        this.graphicManager.add(enemy);
    }

}