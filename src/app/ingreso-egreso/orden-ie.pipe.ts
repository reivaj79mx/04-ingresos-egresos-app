import { IngresoEgreso } from './ingreso-egreso.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenIe'
})
export class OrdenIePipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    })
  }

}
