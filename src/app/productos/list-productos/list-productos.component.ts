import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { _MatTableDataSource } from '@angular/material/table';
import { DeleteproductoComponent } from 'src/app/dialog/deleteproducto/deleteproducto.component';
import { DialogproductoComponent } from 'src/app/dialog/dialogproducto/dialogproducto.component';
import { Producto } from 'src/app/models/Producto';
import { ApiproductosService } from 'src/app/services/apiproductos.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.scss']
})
export class ListProductosComponent implements OnInit {

  public lista: any;
  public products: any = [];
  public columnas: string[] = ['id','Descripción', 'Precio', 'Cantidad', 'Categoria', 'Acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private apiProductos: ApiproductosService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.apiProductos.getProductos().subscribe((data:any) => {
      this.products = new _MatTableDataSource<Producto>(data.result as Producto[]);
      this.products.paginator = this.paginator;
    })
  }

  openAdd(){
    const dialogRef = this.dialog.open(DialogproductoComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.getProductos();
    })
  }

  edit(producto: Producto){
    const dialogRef = this.dialog.open(DialogproductoComponent, {
      width: '300px',
      data: producto
    });
    dialogRef.afterClosed().subscribe(data => {
      this.getProductos();
    })
  }

  delete(producto: Producto){
    const dialogRef = this.dialog.open(DeleteproductoComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.apiProductos.delete(producto.id).subscribe((data:any) => {
          if(data.isSuccess){
            this.snackBar.open('Producto Eliminado con éxito!', '', {
              duration: 2000
            });
            this.getProductos();
          }
        })
      }
    });
  }

  aplicarFiltro(filtro: any){
    this.products.filter = filtro.target.value.trim().toLowerCase();
  }
}
