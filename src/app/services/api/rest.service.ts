import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from 'src/app/interfaces/Libro';
import { Pedido } from 'src/app/interfaces/Pedido';
import { Genero } from 'src/app/interfaces/Genero';
import { Usuario } from 'src/app/interfaces/Usuario';
import { DetallesPedido } from 'src/app/interfaces/DetallesPedido';

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

  // Railway hosting
  // private apiUrl = 'https://whatthebook.up.railway.app';

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
    return this.http.get<Pedido[]>(this.apiUrl + '/pedidos/obtener');
  }

  // GET que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + '/usuarios/obtener');
  }

  // GET que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getLibro(id: any): Observable<Libro> {
    const url = `${this.apiUrl}/libros/obtener1`;
    const body = { id: id };
    return this.http.post<Libro>(url, body);
  }

  // GET que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getPedidosByUser(id: any): Observable<Pedido[]> {
    const url = `${this.apiUrl}/pedidos/getByUser`;
    const body = { id: id };
    return this.http.post<Pedido[]>(url, body);
  }

  // GET que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getUser(id: any): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/obtener1`;
    const body = { id: id };
    return this.http.post<Usuario>(url, body);
  }

  // GET que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getUserByJWT(jwt: string): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/getUser`;
    const body = { token: jwt };
    return this.http.post<Usuario>(url, body);
  }

  public getLibrosByGenero(genero: number) {
    const body = { genero: genero };
    return this.http.post<Libro[]>(this.apiUrl + '/libros/getByGenero', body);
  }

  public getGeneros() {
    return this.http.get<Genero[]>(this.apiUrl + '/generos/obtener');
  }

  public getEditoriales() {
    return this.http.get<Genero[]>(this.apiUrl + '/editoriales/obtener');
  }

  // POST que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getDetallesPedido(id: any): Observable<DetallesPedido[]> {
    const url = `${this.apiUrl}/detallesPedido/getByOrder`;
    const body = { id: id };
    return this.http.post<DetallesPedido[]>(url, body);
  }

  public registerUser(user: Usuario) {
    // const body = { id: id };
    return this.http.post<Libro[]>(this.apiUrl + '/usuarios/register', user);
  }

  // POST que devuelve un observable de array de objetos del tipo Proyecto de la interface
  public getPedido(id: string | null): Observable<Pedido> {
    const url = `${this.apiUrl}/pedido/obtener1`;
    const body = { id: id };
    return this.http.post<Pedido>(url, body);
  }

  public updateLibro(libro: Libro): Observable<Libro> {
    const url = `${this.apiUrl}/libros/modificar`;
    return this.http.put<Libro>(url, libro, httpOptions);
  }

  public updateUsuario(user: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/modificar`;
    return this.http.put<Usuario>(url, user, httpOptions);
  }

  public deleteLibro(id: string | null | number | undefined): Observable<Libro> {
    const url = `${this.apiUrl}/libros/borrar`;
    const body = { id: id };
    return this.http.post<Libro>(url, body);
  }

  public deletePedido(id: string | null | number | undefined): Observable<Pedido> {
    const url = `${this.apiUrl}/pedidos/borrar`;
    const body = { id: id };
    return this.http.post<Pedido>(url, body);
  }

  public createLibro(libro: Libro): Observable<Libro> {
    const url = `${this.apiUrl}/libros/nuevo`;
    return this.http.post<Libro>(url, libro, httpOptions);
  }

  public createOrder(pedido: Pedido): Observable<any> {
    const url = `${this.apiUrl}/pedidos/nuevo`;
    return this.http.post<Pedido>(url, pedido, httpOptions);
  }

}
