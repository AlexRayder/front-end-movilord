// account.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule]
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  isEditing = false;
  profileImagePreview: string | null = null;
  
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    const userId = this.authService.getUserId();

    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      phone: [''],
      profileImage: [''],
      password: ['', Validators.required]
    });

    if (userId) {
      this.authService.getUserById(userId).subscribe(
        (user) => {
          this.accountForm.patchValue({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            profileImage: user.profileImage
          });
          this.isEditing = true;
          this.accountForm.get('password')?.clearValidators();
          this.accountForm.get('password')?.updateValueAndValidity();
          if (user.profileImage) {
            this.profileImagePreview = user.profileImage;
          }
        },
        (err) => console.log('Usuario nuevo o error:', err)
      );
    }
  }

  onSubmit() {
    if (this.accountForm.invalid) return;
  
    const userData = this.accountForm.value;
    const userId = this.authService.getUserId();
  
    if (this.isEditing && userId) {
      // Llamada para actualizar el usuario
      this.authService.updateUser(userId, userData).subscribe(
        (res) => {
          console.log('Usuario actualizado:', res);
  
          // Vuelves a obtener la información actualizada del usuario
          this.authService.getUserById(userId).subscribe(
            (user) => {
              this.accountForm.patchValue({
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                profileImage: user.profileImage
              });
              if (user.profileImage) {
                this.profileImagePreview = user.profileImage;
              }
            },
            (err) => console.error('Error al obtener los datos actualizados del usuario:', err)
          );
  
          // Recargar la página para reflejar los cambios
          window.location.reload();
        },
        (err) => {
          console.error('Error actualizando usuario:', err);
        }
      );
    } else {
      // Llamada para registrar un nuevo usuario
      this.authService.register(
        userData.username,
        userData.email,
        userData.password
      ).subscribe(
        (res) => {
          console.log('Usuario creado:', res);
  
          // Recargar la página para reflejar los cambios
          window.location.reload();
        },
        (err) => {
          console.error('Error creando usuario:', err);
        }
      );
    }
  }
  
  

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.profileImagePreview = base64;  // Asignamos la imagen base64 para la vista previa
        this.accountForm.patchValue({ profileImage: base64 });  // También se asigna al formulario
      };
      reader.readAsDataURL(file); // Convertir archivo a base64
    }
  }
  
  triggerFileInput(): void {
    // Este método se llama cuando se hace clic en la imagen de vista previa
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();  // Abrir el selector de archivos
    }
  }
}