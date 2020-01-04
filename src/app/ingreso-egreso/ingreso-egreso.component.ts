import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.actions';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ieForm: FormGroup;
  tipo: string = 'ingreso';
  subscripction: Subscription = new Subscription();
  cargando: boolean;

  constructor(private _ieService: IngresoEgresoService,
    private _store: Store<AppState>) { }

  ngOnInit() {

    this.subscripction = this._store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);

    this.ieForm = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    })
  }

  ngOnDestroy() {
    this.subscripction.unsubscribe();
  }

  crearIngresoEgreso() {
    this._store.dispatch(new ActivarLoadingAction());

    const ie = new IngresoEgreso({ ...this.ieForm.value, tipo: this.tipo });
    this._ieService.crearIngresoEgreso(ie)
      .then(() => {
        this._store.dispatch(new DesactivarLoadingAction())
        Swal.fire('Guardado', ie.descripcion, 'success');
        this.ieForm.reset({ monto: 0 });
      });
  }

}
