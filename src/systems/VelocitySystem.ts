import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Velocity} from "../components/Velocity";
import {Position} from "../components/Position";

export class VelocitySystem extends EntitySystem {
    private positionManager: Manager;
    private velocityManager: Manager;
    private delta: number;

    constructor() {
        super(new Aspect().all("position", "velocity"));
        this.delta = 0;
    }

    public init(world) {
        super.init(world);
        this.positionManager = world.getComponentManager("position");
        this.velocityManager = world.getComponentManager("velocity");
    }

    protected beforeProcess () {
        this.delta = this.world.delta / 1000;
    }

    protected process(entity: number): void {
        let velocity: Velocity = this.velocityManager.fetch(entity) as Velocity;
        let position: Position = this.positionManager.fetch(entity) as Position;
        position.x += velocity.x * this.delta;
        position.y += velocity.y * this.delta;
        if (position.x < -10) {
            this.world.remove(entity);
        }
    }
}