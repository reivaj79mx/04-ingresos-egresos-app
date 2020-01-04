import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscription: Subscription = new Subscription();

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('auth')
      .pipe(
        filter(el => el.user !== null)
      )
      .subscribe(auth => this.nombre = auth.user.nombre);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
