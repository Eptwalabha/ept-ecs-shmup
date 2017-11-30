import {Component} from 'ept-ecs/lib';

export class Gun extends Component {
    public shooting: boolean;
    public cooldown: number;
    public initialCooldown: number;

    constructor(cooldown: number) {
        super();
        this.shooting = false;
        this.cooldown = 0;
        this.initialCooldown = cooldown;
    }
}