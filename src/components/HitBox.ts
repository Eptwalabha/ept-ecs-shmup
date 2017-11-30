import {Component} from 'ept-ecs/lib';

export class HitBox extends Component {
    public radius: number;

    constructor (radius: number) {
        super();
        this.radius = radius;
    }
}