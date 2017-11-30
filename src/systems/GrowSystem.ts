import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Grow} from "../components/Grow";

export class GrowSystem extends EntitySystem {
    private growManager: Manager;
    private growingManager: Manager;

    constructor() {
        super(new Aspect().all("grow"));
    }

    public init(world) {
        super.init(world);
        this.growManager = world.getComponentManager("grow");
        this.growingManager = world.getComponentManager("growing");
    }

    protected process(entity: number): void {
        let grow: Grow = this.growManager.fetch(entity) as Grow;
        if (this.growingManager.has(entity)) {
            grow.ratio += grow.increasePerSecond * this.world.delta / 1000;
        } else {
            grow.ratio -= grow.decreasePerSecond * this.world.delta / 1000;
        }
        if (grow.ratio > grow.max) grow.ratio = grow.max;
        if (grow.ratio < 1) grow.ratio = 1;
    }
}