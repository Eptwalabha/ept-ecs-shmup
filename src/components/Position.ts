import {Component} from 'ept-ecs/lib';

export class Position extends Component {
    public x: number;
    public y: number;
    constructor (x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}