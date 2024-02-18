import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from './shared/clientes.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(clientes: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`http://localhost:3000/clientes`, clientes)
  }

  get(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`http://localhost:3000/clientes`)
  }

  put(clientes: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`http://localhost:3000/clientes/${clientes.id}`, clientes)
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/clientes/${id}`)
  }
}
