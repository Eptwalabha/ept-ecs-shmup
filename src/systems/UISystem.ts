import {System} from 'ept-ecs';

export class UISystem extends System {
    public score: number;
    public context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        super();
        this.score = 0;
        this.context = context;
    }

    public init(world) {
        super.init(world);
    }

    protected processSystem(): void {
        this.score += this.world.delta / 100;
        this.context.fillStyle = '#555555';
        this.context.fillRect(0, 0, this.context.canvas.width, 30);
        this.context.strokeStyle = '#ffffff';
        this.context.font = '15px bold';
        this.context.strokeText(`score: ${Math.round(this.score)}`, 10, 19);
    }

}