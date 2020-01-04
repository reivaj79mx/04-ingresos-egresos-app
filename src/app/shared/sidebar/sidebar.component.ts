import { IngresoEgresoService } from './../../ingreso-egreso/ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  nombre: string;

  constructor(private _authService: AuthService,
    private _ingresoEgresoService: IngresoEgresoService,
    private _store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => this.nombre = auth.user.nombre)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this._authService.logout();
    this._ingresoEgresoService.unsubscribe();
  }

}
