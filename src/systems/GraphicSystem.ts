import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Position} from "../components/Position";
import {HitBox} from "../components/HitBox";

export class GraphicSystem extends EntitySystem {
    private positionManager: Manager;
    private hitboxManager: Manager;
    private bulletManager: Manager;
    private enemyManager: Manager;
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
        if (this.hitboxManager.has(entity)) {
            let hitbox: HitBox = this.hitboxManager.fetch(entity) as HitBox;
            this.context.arc(position.x, position.y, hitbox.radius, 0, Math.PI * 2, true);
        } else {
            this.context.arc(position.x, position.y, 6, 0, Math.PI * 2, true);
        }
        this.context.fill();
        this.context.stroke();
    }

    protected afterProcess () {
    }

    private getStrokeStyle(entity: number) {
        if (this.enemyManager.has(entity)) {
            return '#ff0000';
        } else if (this.bulletManager.has(entity)) {
            return '#0000ff';
        }
        return '#00ff00';
    }
}