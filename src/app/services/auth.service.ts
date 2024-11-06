import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

getToken(): string{
  return localStorage.getItem("token") ?? " ";
}

  Login(datosLogin: Login) {
    return fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosLogin)  
    })
    .then((r: Response) => r.json())  
    .then(data => {
      if (data.status === 'ok') {
      localStorage.setItem("token" , data.token);
      return true;
      } else {
        return false;
      }

    });
  }

  logout(): void { 
    localStorage.removeItem("token");
    }

estaLogueado():boolean {
  if (this.getToken())
    return true
  else
  return false
}
}