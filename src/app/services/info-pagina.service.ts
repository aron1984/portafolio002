import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Equipo } from '../interfaces/equipo.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  
  info: InfoPagina = {};
  cargada = false;

  equipo: any [] = [];

  constructor( private http: HttpClient) { 

    //console.log("servicio de infoPagina listo")
    this.cargarInfo();
    this.cargarEquipo();
   
   }

   private cargarInfo () {

     //leer json 
     // NOTE: en el método subscribe se suele usar 'resp'  o 'res' para indicar la respuesta positiva, y 'err o error' para cuando no se cumple la primera condición.
      this.http.get('assets/data/data-page.json')
        .subscribe( (resp: InfoPagina) => {

          this.cargada = true;
          this.info = resp;

          console.log(resp);

      });
      
   }

   private cargarEquipo(){

    //leer peticion a base de datos firebird
    this.http.get('https://portafolio-html-afca8-default-rtdb.firebaseio.com/equipo.json')
      .subscribe ( (res: any) => {  // se agrega ( :any) para decirle que la respuesta puede ser cualquier tipo. 
        console.log(res);

        this.equipo = res;
      },
      
        error=>{
          console.log(<any>error);
      });
      
   }
}
