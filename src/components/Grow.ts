import {Component} from 'ept-ecs';

export class Grow extends Component {
    public increasePerSecond: number;
    public decreasePerSecond: number;
    public ratio: number;
    public max: number;

    constructor () {
        super();
        this.increasePerSecond = 2;
        this.decreasePerSecond = 3;
        this.ratio = 1;
        this.max = 6;
    }
}