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
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {

    this.url = General.url;
    this.cargarProductos();

   }

   private cargarProductos(){

    return new Promise<void>( (resolve, reject) =>{

      this.http.get(this.url+'productos_idx.json')
      .subscribe ( 
        (res: any) => {

        this.productos = res;
        this.cargando = false;
        
        /* NOTE: usamos setTimeOut para comprobar si funciona el loading, cuando se carga la pagina por primera vez. Luego las imagenes ya estan en caché
          setTimeout(()=>{
            this.cargando = false;
          },1000);
        */

          resolve();
        },
        error=>{
          console.log(<any>error);
        });

       
    });
    
    
   }

   getProducto( id: string){
     return this.http.get(this.url+`productos/${ id }.json`)
   }

   buscarProducto( termino:string){

    if (this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then(()=>{
        //ejecutardespues de tener los prodccutos
        //aplicar filtro
        this.filtrarProductos( termino );
      });

    }else {
      //aplicar el filtro
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos ( termino:string){

    console.log(this.productos);

    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach ( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }

      
    });

  }

}
