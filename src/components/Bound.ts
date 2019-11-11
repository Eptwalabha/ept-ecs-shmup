import {Component} from 'ept-ecs';

export class Bound extends Component {
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    constructor (x: number, y: number, w: number, h: number) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}