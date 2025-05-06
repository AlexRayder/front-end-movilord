import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, FormsModule, CommonModule, MatCheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoginActive = true;
  viewPassword = false;

  // Datos para login
  loginData = {
    username: '',
    password: '',
  };

  // Datos para registro
  registerData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  toggleForm() {
    this.isLoginActive = !this.isLoginActive;
  }

  togglePassword() {
    this.viewPassword = !this.viewPassword;
  }

  // Método para el login
  onLogin() {
    this.authService
      .login(this.loginData.username, this.loginData.password)
      .subscribe(
        (response) => {
          this.authService.storeToken(response.token);
          localStorage.setItem('user_id', response.user.id);
          console.log('Login exitoso', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error en login', error);
          alert('Error en login: ' + error.message);
        }
      );
  }

  // Método para el Register
  onRegister() {
    // Verificar que las contraseñas coinciden
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Realizar el registro
    this.authService
      .register(
        this.registerData.username,
        this.registerData.email,
        this.registerData.password
      )
      .subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          this.toggleForm(); // Cambiar de formulario (si es necesario)

          // Vaciar los campos del formulario
          this.registerData = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          };
        },
        (error) => {
          console.error('Error en registro', error);
        }
      );
  }
}
