import {Component} from 'ept-ecs';

export class Health extends Component {
    public amount: number;
    public initial: number;
    constructor (amount: number) {
        super();
        this.amount = amount;
        this.initial = amount;
    }
}