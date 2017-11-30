import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Velocity} from "../components/Velocity";
import {Position} from "../components/Position";
import {Bound} from "../components/Bound";

export class VelocitySystem extends EntitySystem {
    private positionManager: Manager;
    private velocityManager: Manager;
    private boundManager: Manager;
    private oobManager: Manager;
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
        this.oobManager = world.getComponentManager("outOfBound");
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
        if (this.oobManager.has(entity)) {
            let oob: Bound = this.oobManager.fetch(entity) as Bound;
            if (position.x < oob.x || position.x > oob.x + oob.w || position.y < oob.y || position.y > oob.y + oob.h) {
                this.world.remove(entity);
            }
        }
    }
}