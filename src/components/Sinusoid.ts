import {Component} from 'ept-ecs/lib';

export class Sinusoid extends Component {
    public frequency: number;
    public amplitude: number;
    public offset: number;

    constructor (frequency: number, amplitude: number) {
        super();
        this.frequency = frequency;
        this.amplitude = amplitude;
        this.offset = 0;
    }
}