import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/models/Producto';
import { ApiproductosService } from 'src/app/services/apiproductos.service';

@Component({
  selector: 'app-dialogproducto',
  templateUrl: './dialogproducto.component.html',
  styleUrls: ['./dialogproducto.component.scss']
})
export class DialogproductoComponent implements OnInit {

  form!: FormGroup;
  public descripcion: String = '';
  public precio!: number ;
  public cantidad!: number;
  public categoria!: number;

  constructor(
              private dialogRef: MatDialogRef<DialogproductoComponent>,
              private snackBar: MatSnackBar,
              private apiProductos: ApiproductosService,
              @Inject(MAT_DIALOG_DATA) public producto: Producto
              ) {
                if(this.producto !== null){
                  this.descripcion = producto.descripcion;
                  this.precio = producto.precio;
                  this.cantidad = producto.cantidad;
                  this.categoria = producto.cateogoriaId;
                }
              }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  edit(){
    const producto: Producto = { id: this.producto.id ,descripcion: this.descripcion, precio: this.precio, cantidad: this.cantidad, cateogoriaId: this.categoria };
    this.apiProductos.edit(this.producto.id, producto).subscribe((data:any) => {
      if(data.isSuccess){
        this.dialogRef.close();
        this.snackBar.open('Producto Actualizado', '', {
          duration: 3000
        });
      }
    })
  }

  add(){
    const producto : Producto = { id: 0 ,descripcion: this.descripcion, precio: this.precio, cantidad: this.cantidad, cateogoriaId: this.categoria }
    this.apiProductos.add(producto).subscribe((data:any) => {
      if(data.isSuccess){
        this.dialogRef.close();
        this.snackBar.open('Producto Agregado!', '' , {
          duration: 2000
        });
      }
    });
  }

}
