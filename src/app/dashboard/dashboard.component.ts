import { IngresoEgresoService } from './../ingreso-egreso/ingreso-egreso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario: string;

  constructor(private _ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this._ingresoEgresoService.ingresoEgresoListener();
  }

}
