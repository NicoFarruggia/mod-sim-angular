import { Component } from '@angular/core';
import { IGeneratorValues } from './generator-values.interface';
import { MessagesService } from '../../services/messages.service';

@Component({
  	selector: 'random-numbers',
  	templateUrl: './random-numbers.component.html',
  	styleUrls: ['./random-numbers.component.scss']
})
export class RandomNumbersComponent {
    genValues: IGeneratorValues = {};
    randomNumbers: Array<number> = [];
    messagesService: MessagesService;

    constructor(messagesService: MessagesService) { 
        this.messagesService = messagesService;
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

    getPrecise(dividend: number, divisor: number, precision: number): number {
        const rest = +(dividend / divisor).toFixed(precision);
        const integerRest = Math.trunc(rest);
        const preciseNumber = dividend - integerRest * divisor;

        return preciseNumber;
    }
}