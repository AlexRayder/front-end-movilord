import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';  // Importar MatDialog
import { VideoService } from '../../../service/video.service';
import { UploadContentComponent } from '../upload-content/upload-content.component';  // Asegúrate de que el componente esté importado correctamente

@Component({
  selector: 'app-upload-videos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-videos.component.html',
  styleUrls: ['./upload-videos.component.css'],
})
export class UploadVideosComponent {
  selectedFile: File | null = null;
  videoTitle: string = '';

  constructor(
    private videoService: VideoService,
    private dialogRef: MatDialogRef<UploadVideosComponent>,
    private dialog: MatDialog  // Inyectamos MatDialog
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.selectedFile || !this.videoTitle.trim()) return;

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('No estás autenticado');
      return;
    }

    const formData = new FormData();
    formData.append('video', this.selectedFile);
    formData.append('title', this.videoTitle);
    formData.append('userId', userId);

    this.videoService.uploadVideo(formData).subscribe({
      next: () => {
        alert('Video subido correctamente 🎉');
        this.dialogRef.close();  // Cierra la modal actual
        // Abre la modal de UploadContentComponent
        this.dialog.open(UploadContentComponent, {
          width: '400px',  // Tamaño de la modal
        });
      },
      error: (err) => console.error(err),
    });
  }
}
