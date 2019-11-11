import {Component} from 'ept-ecs';

export class Cooldown extends Component {
    public cooldown: number;
    constructor (cooldown: number) {
        super();
        this.cooldown = cooldown;
    }
}