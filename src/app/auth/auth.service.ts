import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private _angularFirestore: AngularFirestore) { }

  initUserStateListener() {
    this._angularFireAuth.authState
      .subscribe((user: firebase.User) => {
        console.log(user);
      });
  }

  crearUsuario(email: string, nombre: string, password: string) {
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
          });
      })
      .catch(error => {
        Swal.fire('Error en el registro', error.message, 'error');
      })
  }

  login(email: string, password: string) {
    this._angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this._router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire('Error en el login', error.message, 'error');
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
