import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  invalidCredentials: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: [''],
      contraseña: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const usuario = this.loginForm.value.usuario;
    const contraseña = this.loginForm.value.contraseña;
    
    // Aquí deberías hacer la verificación de las credenciales,
    // por ejemplo, comparándolas con una lista de usuarios autorizados.
    // Por ahora, vamos a simular que el login es correcto si se ingresan datos.
    if (usuario && contraseña) {
      this.authService.login();
      this.router.navigate(['/create-data']);
    } else {
      this.invalidCredentials = true;
    }
  }
}