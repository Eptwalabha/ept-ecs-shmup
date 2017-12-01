import {Manager, Aspect, EntitySystem} from 'ept-ecs/lib';
import {Position} from "../components/Position";
import {HitBox} from "../components/HitBox";
import {Grow} from "../components/Grow";
import {Collision} from "../components/Collision";

export class CollisionSystem extends EntitySystem {
    private positionManager: Manager;
    private collisionManager: Manager;
    private hitboxManager: Manager;
    private delay: number;
    private initialDelay: number;
    private spacePartition: Array<Array<number>>;

    constructor(delay) {
        super(new Aspect().all("position", "hitbox", "collision").none("hit", "dead"));
        this.initialDelay = delay;
        this.delay = 0;
        this.spacePartition = [];
    }

    public init(world) {
        super.init(world);
        this.positionManager = world.getComponentManager("position");
        this.hitboxManager = world.getComponentManager("hitbox");
        this.collisionManager = world.getComponentManager("collision");
    }

    public doProcessSystem() {
        this.delay -= this.world.delta;
        if (this.delay <= 0) {
            super.doProcessSystem();
            this.delay += this.initialDelay;
        }
    }

    protected beforeProcess(): void {
        this.resetSpacePartition();
    }

    protected process(entity: number): void {
        let position: Position = this.positionManager.fetch(entity) as Position;
        let hitbox: HitBox = this.hitboxManager.fetch(entity) as HitBox;
        let ratio = this.getRatio(entity);
        this.placeEntityInSP(entity, position, hitbox.radius * ratio);
    }

    protected afterProcess(): void {
        for (let entities of this.spacePartition) {
            this.checkCollisionForPartition(entities);
        }
    }

    private resetSpacePartition() {
        this.spacePartition = [];
        for (let i = 0; i < 25; ++i) {
            this.spacePartition[i] = [];
        }
    }

    private placeEntityInSP(entity: number, position: Position, r: number) {
        if (position.x < -50 || position.x > 450 || position.y < -50 || position.y > 450) {
            return;
        }
        let x = position.x + 50;
        let y = position.y + 50;
        let x2 = Math.floor((x - r) / 100);
        let y2 = Math.floor((y - r) / 100);
        let x3 = Math.floor((x + r) / 100);
        let y3 = Math.floor((y + r) / 100);
        for (let i = 0, size_i = x3 - x2 + 1; i < size_i; ++i) {
            for (let j = 0, size_j = y3 - y2 + 1; j < size_j; ++j) {
                let index = CollisionSystem.getSPIndex(x2 + i, y2 + j);
                if (index >= 0 && index < 25) {
                    this.spacePartition[index].push(entity);
                }
            }
        }
    }

    private static getSPIndex (x: number, y: number): number {
        return y * 5 + x;
    }

    private checkCollisionForPartition(entities: Array<number>) {
        for (let i = 0; i < entities.length; ++i) {
            let entityA = entities[i];
            let collisionA: Collision = this.collisionManager.fetch(entityA) as Collision;
            for (var j = i + 1; j < entities.length; ++j) {
                let entityB = entities[j];
                let collisionB: Collision = this.collisionManager.fetch(entityB) as Collision;
                if ((collisionA.groups & collisionB.groups) === 0) {
                    let hA: HitBox = this.hitboxManager.fetch(entityA) as HitBox;
                    let hB: HitBox = this.hitboxManager.fetch(entityB) as HitBox;
                    let pA: Position = this.positionManager.fetch(entityA) as Position;
                    let pB: Position = this.positionManager.fetch(entityB) as Position;
                    let rA: number = this.getRatio(entityA);
                    let rB: number = this.getRatio(entityB);
                    if (CollisionSystem.intersect(pA.x, pA.y, hA.radius * rA, pB.x, pB.y, hB.radius * rB)) {
                        this.collide(entityA, entityB);
                    }
                }
            }
        }
    }

    private getRatio(entity: number): number {
        if (this.world.getComponentManager("grow").has(entity)) {
            let grow: Grow = this.world.getComponentManager("grow").fetch(entity) as Grow;
            return grow.ratio;
        }
        return 1;
    }

    private collide(entityA: number, entityB: number) {
        this.handleCollision(entityA);
        this.handleCollision(entityB);
    }

    private handleCollision(entity: number) {
        if (this.world.getComponentManager("player").has(entity)) {
            this.world.getComponentManager("hit").add(entity);
        } else if (this.world.getComponentManager("enemy").has(entity)) {
            this.world.getComponentManager("dead").add(entity);
        } else if (this.world.getComponentManager("bullet").has(entity)) {
            this.world.remove(entity);
        }
    }

    private static intersect(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean {
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) < (r1 + r2) * (r1 + r2);
    }
}