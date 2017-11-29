import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Velocity} from "../components/Velocity";
import {Position} from "../components/Position";
import {Bound} from "../components/Bound";

export class VelocitySystem extends EntitySystem {
    private positionManager: Manager;
    private velocityManager: Manager;
    private boundManager: Manager;
    private delta: number;

    constructor() {
        super(new Aspect().all("position", "velocity"));
        this.delta = 0;
    }

    public init(world) {
        super.init(world);
        this.positionManager = world.getComponentManager("position");
        this.velocityManager = world.getComponentManager("velocity");
        this.boundManager = world.getComponentManager("bound");
    }

    protected beforeProcess () {
        this.delta = this.world.delta / 1000;
    }

    protected process(entity: number): void {
        let velocity: Velocity = this.velocityManager.fetch(entity) as Velocity;
        let position: Position = this.positionManager.fetch(entity) as Position;
        position.x += velocity.x * this.delta;
        position.y += velocity.y * this.delta;
        if (this.boundManager.has(entity)) {
            let bound: Bound = this.boundManager.fetch(entity) as Bound;
            if (position.x < bound.x) position.x = bound.x;
            if (position.x > bound.x + bound.w) position.x = bound.x + bound.w;
            if (position.y < bound.y) position.y = bound.y;
            if (position.y > bound.y + bound.h) position.y = bound.y + bound.h;
        }
        if (position.x < -10) {
            this.world.remove(entity);
        }
    }
}