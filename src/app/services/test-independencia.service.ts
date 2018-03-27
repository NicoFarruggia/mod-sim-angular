import { Injectable } from '@angular/core';
import {SesionService} from "./sesion.service";

@Injectable()
export class TestIndependenciaService {

  constructor(
    private __sesion: SesionService
  ) { }

  test_corridas(){
    var numeros_aleatorios = this.__sesion.datos['secuencia'];
    var numero_anterior = numeros_aleatorios[0];
    var n = this.__sesion.datos['numbersQuant'];

		var contador = 1;
		var contador_anterior = 1;
		var r = [0, 0, 0, 0, 0, 0];


    for(var indice=0; indice < numeros_aleatorios.length; indice++) {

    var numero_aleatorio = numeros_aleatorios[indice];

    if(numero_aleatorio > numero_anterior) {
      contador++;
      contador_anterior++;
    } else {
      if(indice != 0) {
        if(contador == 2) {
          r[1] = r[1] +1;
        }
        if(contador == 3) {
          r[2] = r[2] + 1;
        }
        if(contador == 4) {
          r[3] = r[3] + 1;
        }
        if(contador == 5) {
          r[4] = r[4] + 1;
        }
        if(contador >= 6) {
          r[5] = r[5] + 1;
        }

        contador_anterior = contador;
        contador = 1;

        if(contador == 1 && contador_anterior == 1) {
          r[0] = r[0] + 1;
  
        }
      }
    }

    if(indice == n - 1) {
      r[contador - 1] = r[contador - 1] + 1;
    }

    numero_anterior = numero_aleatorio;
  }

  var a = [];
  a[0] = [4529.4, 9044.9, 13568, 18091, 22615, 27892];
	a[1] = [9044.9, 18097, 27139, 36187, 45234, 55789];
	a[2] = [13568, 27139, 40721, 54281, 67852, 83685];
	a[3] = [18091, 36187, 54281, 72414, 90470, 111580];
	a[4] = [22615, 45234, 67852, 90470, 113262, 139476];
	a[5] = [27892, 55789, 83685, 111580, 139476, 172860];

	var b = [1/6, 5/24, 11/120, 19/720, 29/5040, 1/840];
		
	var acumulador = 0;
	var r_total = 0;


		//$r = [808, 1026, 448, 139, 43, 4];

		for(var i = 0; i <= 5; i++) {
			for(var j = 0; j <= 5; j++) {
				acumulador = acumulador + ((a[i][j]) * (r[i] - n * b[i]) * (r[j] - n * b[j]));
			}
		}
		
		var r_total = (1/n) * acumulador;

    var chi_cuadrado_de_tabla = 12.5916;

    var rta = {};
    rta['Datos'] = {
      'chi_cuadrado_de_tabla': chi_cuadrado_de_tabla,
      'r': r_total.toFixed(2)
    };

    if(r_total <= chi_cuadrado_de_tabla){
      rta['Estado'] = true;
      rta['Respuesta'] = 'La frecuencia generada es independiente.'
    }
    else{
      rta['Estado'] = false;
      rta['Respuesta'] = 'La frecuencia generada NO es independiente.'
    }

    return rta;
  }
  
}
