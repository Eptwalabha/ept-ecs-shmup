import {Component} from 'ept-ecs/lib';

export class Health extends Component {
    public amount: number;
    public initial: number;
    constructor (amount: number) {
        super();
        this.amount = amount;
        this.initial = amount;
    }
}