import {Component} from 'ept-ecs';

export class Velocity extends Component {
    public x: number;
    public y: number;
    constructor (x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}