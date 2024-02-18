import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Clientes } from 'src/app/shared/clientes.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  formClientes!: FormGroup;
  clientes: Clientes[] = [];
  cliente!: Clientes;
  clienteDeletado: any;
  clienteEditar!: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
    ) {

  }

  ngOnInit() {
    this.clienteEditar = false;
    this.initForms();
    this.getClientes();
  }

  getClientes() {
    this.apiService.get()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Clientes[]) => {
          console.log(res)
          this.clientes = res;
        }
      })
  }

  initForms() {
    this.formClientes = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      age: [null, Validators.required]
    })

  }

  save() {
    let data = this.formClientes.value;
    console.log(data)
    if(this.clienteEditar) {
      
      this.apiService.put(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: (res: Clientes) => {
          this.ngOnInit();
          this.cliente = res;
        }
        })
      
    } else {
      
      this.apiService.post(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: (res: Clientes) => {
          this.ngOnInit();
          this.cliente = res;
        }
        })
      
    }
  }

  editar(cliente: Clientes) {
    this.clienteEditar = true;
    this.formClientes.patchValue({
      id: cliente.id,
      name: cliente.name,
      email: cliente.email,
      age: cliente.age
    })

  }

  deletar(id: any) {
    this.apiService.delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (res: any) => {
        this.ngOnInit()
        this.clienteDeletado = res
      }
      })
  }

 

  isValidForm(): boolean {
    return this.formClientes.valid;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
