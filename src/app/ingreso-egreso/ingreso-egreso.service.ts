import { AuthService } from './../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  subscription: Subscription = new Subscription();

  constructor(private _firestore: AngularFirestore,
    private _authService: AuthService,
    private _store: Store<AppState>) { }

  crearIngresoEgreso(ie: IngresoEgreso) {

    const user = this._authService.getUsuario();

    return this._firestore.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...ie });
  }

  borrarIngreoEgreso(uid: string) {
    const user = this._authService.getUsuario();

    return this._firestore.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
      .delete();
  }

  unsubscribe() {
    this.subscription.unsubscribe();
    this._store.dispatch(new UnsetItemsAction());
  }

  ingresoEgresoListener() {
    this.subscription.add(this._store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => {
        this._getItems(auth.user.uid);
      }))
  }

  private _getItems(uid: string) {
    this.subscription.add(this._firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            }
          })
        })
      )
      .subscribe(data => {
        this._store.dispatch(new SetItemsAction(data));
      }))
  }
}