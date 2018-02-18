import { Component } from '@angular/core';
import { IGeneratorValues } from './generator-values.interface';
import { MessagesService } from '../../services/messages.service';
import { RandomNumbersService } from '../../services/random-numbers.service';
import { setTimeout } from 'timers';

@Component({
  	selector: 'random-numbers',
  	templateUrl: './random-numbers.component.html',
  	styleUrls: ['./random-numbers.component.scss']
})
export class RandomNumbersComponent {
    genValues: IGeneratorValues = {};
    randomNumbers: Array<number> = [];
    sequences: number;
    messagesService: MessagesService;
    randomNumbersService: RandomNumbersService;
    testingUniformity: boolean;

    constructor(messagesService: MessagesService, randomNumbersService: RandomNumbersService) { 
        this.messagesService = messagesService;
        this.randomNumbersService = randomNumbersService;
    }

    ngOnInit(): void {
        this.sequences = this.randomNumbersService.sequences.length;
    }
    
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
        this.randomNumbers = [];
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

        this.randomNumbersService.sequences.push(this.randomNumbers);
        this.sequences = this.randomNumbersService.sequences.length;
        this.callAlert();
        this.genValues = {};
    }

    getPrecise(dividend: number, divisor: number, precision: number): number {
        const rest = +(dividend / divisor).toFixed(precision);
        const integerRest = Math.trunc(rest);
        const preciseNumber = dividend - integerRest * divisor;

        return preciseNumber;
    }

    callAlert(): void {
        let type: string;
        let title: string;
        let message: string;

        if (this.randomNumbers.length === +this.genValues.numbersQuant) {
            type = 'success';
            title = '¡Bien Hecho!';
            message = `Se han generado con éxito ${this.randomNumbers.length} números aleatorios.`
        } else {
            type = 'error';
            title = '¡Ups!';
            message = 'Ocurrió un error inesperado.';
        }

        this.messagesService.showNotification(type, title, message, 5000);
    }

    uniformityTest(): void {
        this.testingUniformity = true;

        setTimeout(() => {
            let a = 0;
            let k = 4096;
            let randomNumber = 0;
            let subInterval = 1 / k;
            let subIntervalTemp = 0 - subInterval;
            let subIntervals: Array<any> = [
                [0 , 1, 'frecuencia']
            ];
            
            for(a = 0 ; a < k; a++) {
                subIntervalTemp = subIntervalTemp + subInterval;
                subIntervals[a] = [subIntervalTemp, subIntervalTemp + subInterval, 0 ];
            }
            
            for(let i = 0 ; i < this.randomNumbersService.sequences[0].length; i++) {
                randomNumber = this.randomNumbersService.sequences[0][i];
                subIntervals.forEach((element) => {
                    if (randomNumber >= element[0] && randomNumber < element[1]) {
                        element[2]++;
                    }
                });
            } 

            this.testingUniformity = false; 
        }, 1000);

        /*subIntervals.forEach((element) => {
            document.write('Intervalo: ' + element[0] + ' - ' + element[1] + '/////// FRECUENCIA :' + element[2] + '<br>');
        }); */
    }
}