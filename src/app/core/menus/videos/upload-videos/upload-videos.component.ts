import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { VideoService } from '../../../service/video.service'; // Asegúrate de que el servicio esté bien importado

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
  selectedThumbnail: File | null = null;
  videoVisibility: string = ''; 

  constructor(
    private videoService: VideoService,
    private dialogRef: MatDialogRef<UploadVideosComponent>,
    private dialog: MatDialog
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onThumbnailSelected(event: any) {
    this.selectedThumbnail = event.target.files[0];
  }

  onUpload() {
    if (
      !this.selectedFile ||
      !this.videoTitle.trim() ||
      !this.videoVisibility
    ) {
      alert('Completa todos los campos');
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('No estás autenticado');
      return;
    }

    const formData = new FormData();
    formData.append('video', this.selectedFile);
    formData.append('title', this.videoTitle);
    formData.append('userId', userId);
    formData.append('visibility', this.videoVisibility); // <--- NUEVO

    if (this.selectedThumbnail) {
      formData.append('thumbnail', this.selectedThumbnail);
    }

    this.videoService.uploadVideo(formData).subscribe({
      next: () => {
        alert('Video subido correctamente 🎉');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error al subir el video:', err);
        alert('Hubo un error al subir el video. Intenta nuevamente.');
      },
    });
  }
}
