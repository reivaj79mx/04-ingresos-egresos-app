import { IngresoEgresoService } from './../ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from './../ingreso-egreso.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private _store: Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this._store.select('ingresoEgreso')
      .subscribe(ie => {
        console.log(ie.items);
        this.items = ie.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(uid: string) {
    this._ingresoEgresoService.borrarIngreoEgreso(uid)
      .then(() => {
        Swal.fire('Borrado', 'Se borro el item', 'success');
      });
  }

}
