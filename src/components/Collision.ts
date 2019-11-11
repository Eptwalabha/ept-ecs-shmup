import {Component} from 'ept-ecs';

export enum Group {
    ENEMY = 0b1,
    PLAYER = 0b10,
}

export class Collision extends Component {
    public groups: number;

    public constructor(...groups: Array<number>) {
        super();
        this.groups = 0;
        for (let group of groups) {
            this.groups += group;
        }
    }
}