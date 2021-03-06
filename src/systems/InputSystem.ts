import {Manager, EntitySystem, Aspect} from 'ept-ecs';
import {Velocity} from "../components/Velocity";
import {Gun} from "../components/Gun";

enum Key {
    SPACE = 32,
    UP = 38,
    DOWN = 40,
    LEFT = 37,
    RIGHT =39
}

export class InputSystem extends EntitySystem {
    private velocityManager: Manager;
    private gunManager: Manager;
    public up: boolean;
    public down: boolean;
    public left: boolean;
    public right: boolean;
    public space: boolean;

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
        this.gunManager = world.getComponentManager("gun");
    }

    protected process(entity: number): void {
        let velocity: Velocity = this.velocityManager.fetch(entity) as Velocity;
        if (this.up === this.down) {
            velocity.y = 0;
        } else {
            velocity.y = this.up ? -150 : 150;
        }
        if (this.left === this.right) {
            velocity.x = 0;
        } else {
            velocity.x = this.left ? -150 : 150;
        }
        if (this.gunManager.has(entity)) {
            let gun = this.gunManager.fetch(entity) as Gun;
            gun.shooting = this.space;
        }
        if (this.world.getComponentManager("grow").has(entity)) {
            if (this.space) {
                this.world.getComponentManager("growing").add(entity);
            } else {
                this.world.getComponentManager("growing").remove(entity);
            }
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
            case Key.SPACE:
                this.space = keyDown;
                break;
        }
    }

}
