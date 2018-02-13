import { Component } from '@angular/core';
import { IGeneratorValues } from './generator-values.interface';

@Component({
  	selector: 'random-numbers',
  	templateUrl: './random-numbers.component.html',
  	styleUrls: ['./random-numbers.component.scss']
})
export class RandomNumbersComponent {
    genValues: IGeneratorValues = {};
    randomNumbers: Array<number> = [];
    
    populateDefaultValues(): void {
        this.genValues = {
            parameterA: 5,
            parameterM: 65003,
            initialSeed: 7,
            numbersQuant: 65000
        }
    }

    resetValues(): void {
        this.genValues = {};
    }

    generateNumbers(): void {
        let zi = this.genValues.initialSeed;
        let ui: number;

        for (let i = 0; i <= this.genValues.numbersQuant; i++) {
            if (i === 0) {
                ui = this.genValues.initialSeed / this.genValues.parameterM;
            } else {
                zi = this.getPrecise( (zi * this.genValues.parameterA), this.genValues.parameterM, 10);
                ui = zi / this.genValues.parameterM;

                this.randomNumbers.push( +ui.toFixed(10) );
            }
        }
    }

    getPrecise(dividend: number, divisor: number, precision: number): number {
        let rest = +(dividend / divisor).toFixed(precision);
        let integerRest = Math.trunc(rest);
        let preciseNumber = dividend - integerRest * divisor;

        return preciseNumber;
    }
}