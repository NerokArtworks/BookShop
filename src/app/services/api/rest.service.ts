import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from 'src/app/interfaces/Libro';
import { Pedido } from 'src/app/interfaces/Pedido';

// Cabeceras indicando el tipo de información a enviar
const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json',}),
};

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // URL de la API a consumir (archivo json)
  private apiUrl = 'http://localhost:8080';

  // Variable HTTP para poder realizar peticiones asíncronas a la API
  constructor(private http: HttpClient) { }

  // GET que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl + '/libros/obtener');
  }

  // POST que devuelve un observable de array de objetos del tipo Proyecto de la interface
  getLibrosByAutor(autor: string) {
    const body = { autor: autor };
    return this.http.post<Libro[]>(this.apiUrl + '/libros/getByAutor', body);
  }

  // GET que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl + '/pedido/obtener');
  }

  // GET que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getLibro(id: any): Observable<Libro> {
    const url = `${this.apiUrl}/libros/obtener1`;
    const body = { id: id };
    return this.http.post<Libro>(url, body);
  }

  // POST que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getPedido(id: string | null): Observable<Pedido> {
    const url = `${this.apiUrl}/pedido/obtener1`;
    const body = { id: id };
    return this.http.post<Pedido>(url, body);
  }

  public updateLibro(libro: Libro): Observable<Libro> {
    const url = `${this.apiUrl}/libros/modificar1`;
    return this.http.put<Libro>(url, libro, httpOptions);
  }

  public deleteLibro(id: string | null): Observable<Libro> {
    const url = `${this.apiUrl}/libros/borrar`;
    const body = { id: id };
    return this.http.post<Libro>(url, body);
  }

  public createLibro(libro: Libro): Observable<Libro> {
    const url = `${this.apiUrl}/libros/nuevo`;
    return this.http.post<Libro>(url, libro, httpOptions);
  }

}
