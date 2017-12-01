import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Cooldown} from "../components/Cooldown";

export class DeadSystem extends EntitySystem {
    private deadManager: Manager;

    constructor() {
        super(new Aspect().all("dead"));
    }

    public init(world) {
        super.init(world);
        this.deadManager = world.getComponentManager("dead");
    }

    protected process(entity: number): void {
        let dead: Cooldown = this.deadManager.fetch(entity) as Cooldown;
        dead.cooldown -= this.world.delta;
        if (dead.cooldown <= 0) {
            this.world.remove(entity);
        }
    }
}