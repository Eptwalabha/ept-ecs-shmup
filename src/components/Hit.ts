import {Component} from 'ept-ecs/lib';

export class Hit extends Component {
    public cooldown: number;
    constructor (cooldown: number) {
        super();
        this.cooldown = cooldown;
    }
}