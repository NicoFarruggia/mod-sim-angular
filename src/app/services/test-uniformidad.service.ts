import { Injectable } from '@angular/core';
import { RandomNumbersService } from '../services/random-numbers.service';

@Injectable()
export class TestUniformidadService {

  	constructor(private randomNumbersService: RandomNumbersService) {
		
   	}
	
	uniformityTest(valores_iniciales): void {

            let a = 0;
            let k = valores_iniciales['k'];
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
            
            // Obtengo N.
            let n = valores_iniciales['numbersQuant'];

            var sumatoria_1 = 0;

            // Recorro los subintervalos.
            subIntervals.forEach((element) => {

                console.log(element);
                
                // Obtengo la frecuencia.
                let frecuencia = element[2];
                
                let resultado_1 =  frecuencia - (n/k);

                let resultado_2 = resultado_1 * resultado_1;

                sumatoria_1 = sumatoria_1 + resultado_2;

            });

            let chi_cuadrado_calculado = sumatoria_1 * (k/n);
            
            console.log("CHI CUADRADO: ");
            console.log(chi_cuadrado_calculado);

			let rta:any = {
				'Estado': true,
				'Respuesta': chi_cuadrado_calculado
			}

            return rta 
        
        /*subIntervals.forEach((element) => {
            document.write('Intervalo: ' + element[0] + ' - ' + element[1] + '/////// FRECUENCIA :' + element[2] + '<br>');
        }); */
    }

}
