import {Component} from 'ept-ecs/lib';

export class Health extends Component {
    public amount: number;
    constructor (amount: number) {
        super();
        this.amount = amount;
    }
}