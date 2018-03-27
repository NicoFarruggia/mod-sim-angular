import {Injectable} from '@angular/core';
import {RandomNumbersService} from '../services/random-numbers.service';
import { IGeneratorValues } from '../pages/random-numbers/generator-values.interface';
import {SesionService} from "./sesion.service";

@Injectable()
export class TestUniformidadService {

  genValues: IGeneratorValues = {};

  constructor(
    private randomNumbersService: RandomNumbersService,
    private __sesion: SesionService,
  ) {

  }

  uniformityTest(): void {
    let a = 0;
    let k = this.__sesion.datos['k'];
    var chi_cuadrado_de_tabla = this.__sesion.datos['chi_cuadrado_de_tabla'];
    let randomNumber = 0;
    let subInterval = 1 / k;
    let subIntervalTemp = 0 - subInterval;
    let subIntervals: Array<any> = [
      [0, 1, 'frecuencia']
    ];

    for (a = 0; a < k; a++) {
      subIntervalTemp = subIntervalTemp + subInterval;
      subIntervals[a] = [subIntervalTemp, subIntervalTemp + subInterval, 0];
    }

    for (let i = 0; i < this.__sesion.datos['secuencia'].length; i++) {
      randomNumber = this.__sesion.datos['secuencia'][i];
      subIntervals.forEach((element) => {
        if (randomNumber >= element[0] && randomNumber < element[1]) {
          element[2]++;
        }
      });
    }

    // Obtengo N.
    let n =  this.__sesion.datos['numbersQuant'];

    var sumatoria_1 = 0;

    // Recorro los subintervalos.
    subIntervals.forEach((element) => {

      // Obtengo la frecuencia.
      let frecuencia = element[2];

      let resultado_1 = frecuencia - (n / k);

      let resultado_2 = resultado_1 * resultado_1;

      sumatoria_1 = sumatoria_1 + resultado_2;

    });

    let chi_cuadrado_calculado = sumatoria_1 * (k / n);

    let datos: any = {
      'chi_cuadrado_calculado': chi_cuadrado_calculado.toFixed(2),
      'chi_cuadrado_de_tabla': chi_cuadrado_de_tabla
    };

    //Declaro el diccionario de respuesta.
    let rta: any = {
      'Datos': datos
    };

    if(chi_cuadrado_calculado < chi_cuadrado_de_tabla){
      rta['Estado'] = true;
      rta['Respuesta'] = 'La frecuencia generada es uniforme.';
    }
    else {
      rta['Estado'] = false;
      rta['Respuesta'] = 'La frecuencia generada NO es uniforme.';
    }

    return rta

    /*subIntervals.forEach((element) => {
     document.write('Intervalo: ' + element[0] + ' - ' + element[1] + '/////// FRECUENCIA :' + element[2] + '<br>');
     }); */
  }

}
