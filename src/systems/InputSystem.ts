import {Manager, EntitySystem, Aspect} from 'ept-ecs/lib';
import {Velocity} from "../components/Velocity";

enum Key {
    UP = 38,
    DOWN = 40,
    LEFT = 37,
    RIGHT =39
}

export class InputSystem extends EntitySystem {
    private velocityManager: Manager;
    public up: boolean;
    public down: boolean;
    public left: boolean;
    public right: boolean;

    constructor() {
        super(new Aspect().all("position", "velocity", "input"));
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    public init(world) {
        super.init(world);
        this.velocityManager = world.getComponentManager("velocity");
    }

    protected process(entity: number): void {
        let velocity: Velocity = this.velocityManager.fetch(entity) as Velocity;
        if (this.up === this.down) {
            velocity.y = 0;
        } else {
            velocity.y = this.up ? -200 : 200;
        }
        if (this.left === this.right) {
            velocity.x = 0;
        } else {
            velocity.x = this.left ? -200 : 200;
        }
    }

    public updateInput (keyCode: number, keyDown: boolean) {
        switch (keyCode) {
            case Key.UP:
                this.up = keyDown;
                break;
            case Key.DOWN:
                this.down = keyDown;
                break;
            case Key.LEFT:
                this.left = keyDown;
                break;
            case Key.RIGHT:
                this.right = keyDown;
                break;
        }
    }

}