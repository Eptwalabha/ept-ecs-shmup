import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';

export class CollisionSystem extends EntitySystem {
    private positionManager: Manager;
    private velocityManager: Manager;

    constructor() {
        super(new Aspect().all("position", "hitbox").none("hit", "dead"));
    }

    public init(world) {
        super.init(world);
        this.positionManager = world.getComponentManager("position");
        this.velocityManager = world.getComponentManager("velocity");
    }

    protected process(entity: number): void {
    }
}