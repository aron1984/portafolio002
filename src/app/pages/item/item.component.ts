import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdcutoDescripcion } from 'src/app/interfaces/producto-descripcion';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto!: ProdcutoDescripcion;
  id!: string;

  constructor( private route: ActivatedRoute,
                public ProductoService: ProductosService) { }

  ngOnInit(): void {

    this.route.params
    .subscribe( parametros => {

      //console.log(parametros['id']);
      
      this.ProductoService.getProducto(parametros['id'])
        .subscribe( (producto: any) => {         //REVIEW: No pude solucionar aplicar la interface (prodcuto : ProductoDescripción) y tuve que recurrir a : any
          this.id = parametros['id'];
          this.producto = producto;

          //console.log(producto['producto']);
        },
        error=>{
          console.log(<any>error);
      })
    });


  }

}
