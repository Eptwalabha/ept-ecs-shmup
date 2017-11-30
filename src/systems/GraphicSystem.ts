import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Position} from "../components/Position";
import {HitBox} from "../components/HitBox";
import {Grow} from "../components/Grow";

export class GraphicSystem extends EntitySystem {
    private positionManager: Manager;
    private hitboxManager: Manager;
    private bulletManager: Manager;
    private enemyManager: Manager;
    private growManager: Manager;
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        super(new Aspect().all("position", "graphic"));
        this.context = context;
    }

    public init(world) {
        super.init(world);
        this.positionManager = world.getComponentManager("position");
        this.hitboxManager = world.getComponentManager("hitbox");
        this.enemyManager = world.getComponentManager("enemy");
        this.bulletManager = world.getComponentManager("bullet");
        this.growManager = world.getComponentManager("grow");
    }

    protected beforeProcess () {
        this.context.fillStyle = '#cccccc';
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.strokeStyle = '#000000';
    }

    protected process(entity: number): void {
        let position: Position = this.positionManager.fetch(entity) as Position;
        this.context.beginPath();
        this.context.fillStyle = this.getStrokeStyle(entity);
        let radius = this.getRadius(entity);
        this.context.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
        this.context.fill();
        this.context.stroke();
    }

    private getStrokeStyle(entity: number) {
        if (this.enemyManager.has(entity)) {
            return '#ff0000';
        } else if (this.bulletManager.has(entity)) {
            return '#0000ff';
        }
        return '#00ff00';
    }

    private getRadius(entity: number): number {
        if (this.hitboxManager.has(entity)) {
            let hitbox: HitBox = this.hitboxManager.fetch(entity) as HitBox;
            if (this.growManager.has(entity)) {
                let grow: Grow = this.growManager.fetch(entity) as Grow;
                return hitbox.radius * grow.ratio;
            } else {
                return hitbox.radius;
            }
        }
        return 6;
    }
}