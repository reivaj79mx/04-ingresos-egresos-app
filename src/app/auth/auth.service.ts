import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subscription: Subscription = new Subscription();

  constructor(private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private _angularFirestore: AngularFirestore,
    private _store: Store<AppState>) { }

  initUserStateListener() {
    this._angularFireAuth.authState
      .subscribe((user: firebase.User) => {
        if (user) {
          this.subscription = this._angularFirestore.doc(`${user.uid}/usuario`).valueChanges()
            .subscribe((usr: any) => {
              const newUser = new User(usr);
              this._store.dispatch(new SetUserAction(newUser));
            })
        } else {
          this.subscription.unsubscribe();
        }
      });
  }

  crearUsuario(email: string, nombre: string, password: string) {
    this._store.dispatch(new ActivarLoadingAction());

    this._angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {

        const user: User = {
          nombre: nombre,
          email: email,
          uid: response.user.uid
        }

        this._angularFirestore.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this._router.navigate(['/']);
            this._store.dispatch(new DesactivarLoadingAction());
          });
      })
      .catch(error => {
        Swal.fire('Error en el registro', error.message, 'error');
        this._store.dispatch(new DesactivarLoadingAction());
      })
  }

  login(email: string, password: string) {
    this._store.dispatch(new ActivarLoadingAction());

    this._angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this._router.navigate(['/']);
        this._store.dispatch(new DesactivarLoadingAction());
      })
      .catch(error => {
        Swal.fire('Error en el login', error.message, 'error');
        this._store.dispatch(new DesactivarLoadingAction());
      })
  }

  logout() {
    this._angularFireAuth.auth.signOut()
      .then(() => {
        this._router.navigate(['/login']);
      });
  }

  isAuth() {
    return this._angularFireAuth.authState
      .pipe(
        map(el => {
          if (!el) {
            this._router.navigate(['/login']);
          }

          return el !== null;
        })
      )
  }
}
