import {Manager, EntitySystem, Aspect} from 'ept-ecs';
import {Cooldown} from "../components/Cooldown";

export class HitSystem extends EntitySystem {
    private hitManager: Manager;

    constructor() {
        super(new Aspect().all("hit"));
    }

    public init(world) {
        super.init(world);
        this.hitManager = world.getComponentManager("hit");
    }

    protected process(entity: number): void {
        let hit: Cooldown = this.hitManager.fetch(entity) as Cooldown;
        hit.cooldown -= this.world.delta;
        if (hit.cooldown <= 0) {
            this.hitManager.remove(entity);
        }
    }
}