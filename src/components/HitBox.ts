import {Component} from 'ept-ecs';

export class HitBox extends Component {
    public radius: number;

    constructor (radius: number) {
        super();
        this.radius = radius;
    }
}