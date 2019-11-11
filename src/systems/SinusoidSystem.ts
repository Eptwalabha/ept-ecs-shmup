import {Manager, EntitySystem, Aspect} from 'ept-ecs';
import {Sinusoid} from "../components/Sinusoid";
import {Position} from "../components/Position";

export class SinusoidSystem extends EntitySystem {
    private positionManager: Manager;
    private sinusoidXManager: Manager;
    private sinusoidYManager: Manager;

    constructor() {
        super(new Aspect().all("position").one("sinusoidX", "sinusoidY").none("dead"));
    }

    public init(world) {
        super.init(world);
        this.positionManager = world.getComponentManager("position");
        this.sinusoidXManager = world.getComponentManager("sinusoidX");
        this.sinusoidYManager = world.getComponentManager("sinusoidY");
    }

    protected process(entity: number): void {
        let position: Position = this.positionManager.fetch(entity) as Position;
        if (this.sinusoidXManager.has(entity)) {
            let sinusoid = this.sinusoidXManager.fetch(entity) as Sinusoid;
            sinusoid.offset += this.world.delta;
            position.x += this.calcSin(sinusoid);
        }
        if (this.sinusoidYManager.has(entity)) {
            let sinusoid = this.sinusoidYManager.fetch(entity) as Sinusoid;
            sinusoid.offset += this.world.delta;
            position.y += this.calcCos(sinusoid)
        }
    }

    private calcSin (sinusoid: Sinusoid): number {
        return Math.sin((sinusoid.offset * 2 * Math.PI / 1000) * sinusoid.frequency) * sinusoid.amplitude * this.world.delta / 1000;
    }
    private calcCos (sinusoid: Sinusoid): number {
        return Math.cos((sinusoid.offset * 2 * Math.PI / 1000) * sinusoid.frequency) * sinusoid.amplitude * this.world.delta / 1000;
    }
}