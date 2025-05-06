import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';  // Importamos Router
import { MatDialog } from '@angular/material/dialog';  // Importamos MatDialog
import { CommonModule } from '@angular/common';
import { UploadContentComponent } from '../../menus/videos/upload-content/upload-content.component';  // Asegúrate de importar el componente correctamente
import { UploadVideosComponent } from '../../menus/videos/upload-videos/upload-videos.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  rediredUpload = [
    { icon: 'cloud_upload', label: 'Subir', route: '/upload' }
  ];

  constructor(private router: Router, private dialog: MatDialog) {}

  // Este método redirige y luego abre la modal
  onUploadClick() {
    this.router.navigate(['/upload']).then(() => {
      // Luego de redirigir, abrir la modal
      const dialogRef = this.dialog.open(UploadVideosComponent, {
        width: '400px',  // Ajusta el tamaño según necesites
      });
    });
  }
}
