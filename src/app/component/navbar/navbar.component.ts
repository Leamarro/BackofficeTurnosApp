import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component'; // Importa LoginComponent si loggedIn() está definida allí

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    // Implementa la lógica para determinar si el usuario está autenticado
    // Esto podría ser accediendo a datos en el servicio de autenticación
    return true; // Solo para fines de ejemplo, devuelve true si el usuario está autenticado
  }
}
