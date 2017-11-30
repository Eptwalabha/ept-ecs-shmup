import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Gun} from "../components/Gun";
import {Velocity} from "../components/Velocity";
import {Position} from "../components/Position";
import {HitBox} from "../components/HitBox";

export class ShootingSystem extends EntitySystem {
    private positionManager: Manager;
    private gunManager: Manager;

    constructor() {
        super(new Aspect().all("position", "gun").none("dead"));
    }

    public init(world) {
        super.init(world);
        this.positionManager = world.getComponentManager("position");
        this.gunManager = world.getComponentManager("gun");
    }

    protected process(entity: number): void {
        let gun: Gun = this.gunManager.fetch(entity) as Gun;
        let position: Position = this.positionManager.fetch(entity) as Position;

        if (gun.shooting && gun.cooldown <= 0) {
            gun.cooldown += gun.initialCooldown;
            let bullet: number = this.world.create();
            let bulletV: number = this.world.getComponentManager("player").has(entity) ? 150 : -100;
            this.world.getComponentManager("velocity").add(bullet, new Velocity(bulletV, 0));
            this.world.getComponentManager("bullet").add(bullet);
            this.world.getComponentManager("position").add(bullet, new Position(position.x, position.y));
            this.world.getComponentManager("hitbox").add(bullet, new HitBox(1));
            this.world.getComponentManager("graphic").add(bullet);
            this.world.getComponentManager("outOfBound").add(bullet);
        } else if (!gun.shooting) {
            gun.cooldown = 0;
        } else {
            gun.cooldown -= this.world.delta;
            if (gun.cooldown < 0) {
                gun.cooldown = 0;
            }
        }
    }
}