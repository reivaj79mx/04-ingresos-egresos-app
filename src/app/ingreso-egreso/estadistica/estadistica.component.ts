import { IngresoEgreso } from './../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  subscription: Subscription = new Subscription();
  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('ingresoEgreso')
      .subscribe(ie => this.calcularIE(ie.items))
  }

  calcularIE(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.ingresos += item.monto;
        this.cuantosIngresos++;
      } else {
        this.egresos += item.monto;
        this.cuantosEgresos++;
      }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];
  }

}
