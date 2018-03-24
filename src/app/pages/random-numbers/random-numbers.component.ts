import { Component } from '@angular/core';
import { IGeneratorValues } from './generator-values.interface';
import { MessagesService } from '../../services/messages.service';
import { RandomNumbersService } from '../../services/random-numbers.service';
import { TestUniformidadService } from "../../services/test-uniformidad.service";


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

    valores_iniciales = {};

    constructor(messagesService: MessagesService, randomNumbersService: RandomNumbersService, private testUniformidad: TestUniformidadService) { 
        this.messagesService = messagesService;
        this.randomNumbersService = randomNumbersService;
    }

    ngOnInit(): void {
        this.sequences = this.randomNumbersService.sequences.length;
    }
    
    populateDefaultValues(): void {
        this.genValues = {
            parameterA: 17364,
            parameterM: 65521,
            initialSeed: 1,
            numbersQuant: 65000,
            k: 4096
        }
    }

    resetValues(): void {
        this.genValues = {};
    }

    generateNumbers(): void {
        this.randomNumbers = [];
        let zi = this.genValues.initialSeed;
        this.valores_iniciales = this.genValues;
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

    test_uniformidad(){
        this.testingUniformity = true;
        setTimeout(() => {
            var rta_unifirmidad = this.testUniformidad.uniformityTest(this.valores_iniciales);
            console.log(rta_unifirmidad);
            this.testingUniformity = false;
        }, 1000)

    }

    

}