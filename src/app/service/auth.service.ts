import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor() { }

  login() {
    // Simplemente cambia la bandera a true para simular que el usuario ha iniciado sesión
    this.isLoggedIn = true;
    // Guarda el estado de la autenticación en el almacenamiento local
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    // Cambia la bandera a false para simular que el usuario ha cerrado sesión
    this.isLoggedIn = false;
    // Elimina el estado de la autenticación del almacenamiento local
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    // Verifica si el usuario está autenticado recuperando el estado desde el almacenamiento local
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
