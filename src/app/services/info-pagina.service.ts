import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  constructor( private http: HttpClient) { 

    console.log("servicio de infoPagina listo")

    //leer json 
    // NOTE: en el método subscribe se suele usar 'resp'  o 'res' para indicar la respuesta positiva, y 'err o error' para cuando no se cumple la primera condición.
    this.http.get('assets/data/data-page.json')
      .subscribe( (resp: InfoPagina) => {

        this.cargada = true;
        this.info = resp;

        console.log(resp);

      });

   }
}
