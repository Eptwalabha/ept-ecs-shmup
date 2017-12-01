import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Gun} from "../components/Gun";
import {Velocity} from "../components/Velocity";
import {Position} from "../components/Position";
import {HitBox} from "../components/HitBox";
import {Group, Collision} from "../components/Collision";

export class ShootingSystem extends EntitySystem {
    private positionManager: Manager;
    private gunManager: Manager;

    constructor() {
        super(new Aspect().all("position", "gun").none("dead", "hit"));
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
            let isPlayer: boolean = this.world.getComponentManager("player").has(entity);
            let bullet: number = this.world.create();
            let bulletV: number = isPlayer ? 200 : -150;
            let collision: Collision = isPlayer ? new Collision(Group.ENEMY) : new Collision(Group.PLAYER);
            this.world.getComponentManager("velocity").add(bullet, new Velocity(bulletV, 0));
            this.world.getComponentManager("bullet").add(bullet);
            this.world.getComponentManager("position").add(bullet, new Position(position.x, position.y));
            this.world.getComponentManager("hitbox").add(bullet, new HitBox(2));
            this.world.getComponentManager("graphic").add(bullet);
            this.world.getComponentManager("outOfBound").add(bullet);
            this.world.getComponentManager("collision").add(bullet, collision);
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