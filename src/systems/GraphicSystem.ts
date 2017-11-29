import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Position} from "../components/Position";
import {HitBox} from "../components/HitBox";

export class GraphicSystem extends EntitySystem {
    private positionManager: Manager;
    private hitboxManager: Manager;
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        super(new Aspect().all("position", "graphic").one("enemy", "bullet"));
        this.context = context;
    }

    public init(world) {
        super.init(world);
        this.positionManager = world.getComponentManager("position");
        this.hitboxManager = world.getComponentManager("hitbox");
    }

    protected beforeProcess () {
        this.context.fillStyle = '#cccccc';
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillStyle = '#000000';
    }

    protected process(entity: number): void {
        let position: Position = this.positionManager.fetch(entity) as Position;
        this.context.beginPath();
        if (this.hitboxManager.has(entity)) {
            let hitbox: HitBox = this.hitboxManager.fetch(entity) as HitBox;
            this.context.arc(position.x, position.y, hitbox.radius, 0, Math.PI * 2, true);
        } else {
            this.context.arc(position.x, position.y, 6, 0, Math.PI * 2, true);
        }
        this.context.stroke();
    }

    protected afterProcess () {
    }
}