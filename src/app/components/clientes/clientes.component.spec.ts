import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesComponent } from './clientes.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { of } from 'rxjs';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;
  let apiService: ApiService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ ClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve fazer request para obter lista de clientes', () => {
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
      },
      {
        "id": 7,
        "name": "Ricardo ",
        "email": "ricardo@email.com",
        "age": "35"
      }
    ];

    spyOn(apiService, 'get').and.returnValue(of(response));

    component.getClientes();

    expect(component.clientes).toEqual(response);
  }); 

  it('Deve realizar request para obter cliente criado', () => {
    const response = {
      "id": 7,
      "name": "Ricardo ",
      "email": "ricardo@email.com",
      "age": "35"
    };

    spyOn(apiService, 'post').and.returnValue(of(response));

    component.save();

    expect(component.cliente).toEqual(response);

  });

  it('Deve realizar request para obter cliente editado', () => {
    const response = {
      "id": 7,
      "name": "Ricardo Freire",
      "email": "ricardofreire@email.com",
      "age": "35"
    };

    spyOn(apiService, 'put').and.returnValue(of(response));

    component.clienteEditar = true;
    component.save();

    expect(component.cliente).toEqual(response);

  });

  it('Deve realizar request para obter lista com cliente removido', () => {
    const response = {}

    spyOn(apiService, 'delete').and.returnValue(of(response));

    component.deletar(7);

    expect(component.clienteDeletado).toEqual(response);

  });
});
