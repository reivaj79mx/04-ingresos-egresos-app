export class User {
  public nombre: string;
  public email: string;
  public uid: string;

  /* constructor(nombre: string, email: string, uid: string) {
    this.nombre = nombre;
    this.email = email;
    this.uid = uid;
  }*/
  constructor(user: UserObj) {
    this.nombre = user && user.nombre || null;
    this.email = user && user.email || null;
    this.uid = user && user.uid || null;
  }
}

interface UserObj {
  nombre: string,
  email: string,
  uid: string
}