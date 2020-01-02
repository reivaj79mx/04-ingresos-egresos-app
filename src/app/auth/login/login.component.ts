import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor(private _authService: AuthService,
    private _store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('ui')
      .subscribe(state => this.cargando = state.isLoading);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login(data: any) {
    this._authService.login(data.email, data.password);
  }

}
