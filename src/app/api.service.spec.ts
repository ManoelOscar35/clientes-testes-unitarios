import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  let url: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    url = `http://localhost:3000`;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada get para obter clientes', () => {
    const response = [
      {
        "id": 1,
        "name": "Manoel Oscar Freire de Carvalho",
        "email": "manoeloscar557@gmail.com",
        "age": "35"
      },
      {
        "id": 2,
        "name": "Tiago Freire Carvalho",
        "email": "tiagofreire@email.com",
        "age": "27"
      },
      {
        "id": 3,
        "name": "Gleide Mary Santos Freire",
        "email": "gleidemarysantos@gmail.com",
        "age": "63"
      },
      {
        "id": 4,
        "name": "Geanny Mary Santos Freire",
        "email": "geannymary@gmail.com",
        "age": "64"
      },
      {
        "id": 5,
        "name": "Gabriel de Jesus",
        "email": "gabriel@email.com",
        "age": "63"
      },
      {
        "id": 6,
        "name": "Clarissa",
        "email": "clarissa@email.com",
        "age": "24"
      }
    ]
    service.get().subscribe();
    const request = httpTestingController.expectOne(`${url}/clientes`)
    request.flush(response);
    service.get().subscribe(res => {
      expect(res).toBe(response);
    });
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/clientes`);
  });

  it('Deve realizar requisição POST para cadastrar cliente', () => {
    const cliente = {id: 7, name: 'Ricardo ', email: 'ricardo@email.com', age: '35'};
    const response = {id: 7, name: 'Ricardo ', email: 'ricardo@email.com', age: '35'};
    service.post(cliente).subscribe();
    const request = httpTestingController.expectOne(`${url}/clientes`);
    request.flush(response);
    service.post(cliente).subscribe(res => {
      expect(res).toBe(response);
    });
    expect(request.request.method).toBe('POST');
    expect(request.request.url).toBe(`${url}/clientes`);
  });

  it('Deve realizar requisição PUT para editar cliente', () => {
    const cliente = {id: 7, name: 'Ricardo Augusto ', email: 'ricardoaugusto@email.com', age: '35'};
    const response = {id: 7, name: 'Ricardo Augusto', email: 'ricardoaugusto@email.com', age: '35'};
    service.put(cliente).subscribe();
    const request = httpTestingController.expectOne(`${url}/clientes/7`);
    request.flush(response);
    service.put(cliente).subscribe(res => {
      expect(res).toBe(response);
    });
    expect(request.request.method).toBe('PUT');
    expect(request.request.url).toBe(`${url}/clientes/7`);
  });

  it('Deve realizar requisição DELETE para excluir um cliente', () => {
    const id = 7
    const response = {};
    service.delete(id).subscribe();
    const request = httpTestingController.expectOne(`${url}/clientes/7`);
    request.flush(response);
    service.delete(id).subscribe(res => {
      expect(res).toBe(response);
    });
    expect(request.request.method).toBe('DELETE');
    expect(request.request.url).toBe(`${url}/clientes/7`);
  });
});
