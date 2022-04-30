import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiproductosService {


  url: string = 'https://localhost:44336/api/Producto';

  constructor(private _http: HttpClient) { }

  getProductos(){
    return this._http.get(this.url);
  }

  add(producto: Producto){
    return this._http.post(this.url, producto);
  }

  edit(id: any, producto: Producto){
    return this._http.put(`${this.url}/${id}`, producto);
  }

  delete(id: number){
    return this._http.delete(`${this.url}/${id}`);
  }
}
