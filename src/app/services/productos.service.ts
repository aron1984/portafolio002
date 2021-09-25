import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { General } from './general';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public url: string;

  productos: Producto[] = [];
  cargando:boolean = true;

  constructor( private http: HttpClient) {

    this.url = General.url;
    this.cargarProductos();

   }

   private cargarProductos(){
    
    this.http.get(this.url+'productos_idx.json')
      .subscribe ( 
        (res: any) => {

        console.log(res);

        this.productos = res;
        this.cargando = false;
        
        /* NOTE: usamos setTimeOut para comprobar si funciona el loading, cuando se carga la pagina por primera vez. Luego las imagenes ya estan en caché
          setTimeout(()=>{
            this.cargando = false;
          },1000);
        */
        },
        error=>{
          console.log(<any>error);
      }
      );
   }


}
