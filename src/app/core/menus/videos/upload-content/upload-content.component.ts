import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-upload-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './upload-content.component.html',
  styleUrls: ['./upload-content.component.css'],
})
export class UploadContentComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'video',
    'visibility',
    'restrictions',
    'date',
    'views',
    'comments',
    'likes',
    'dislikes',
  ];

  videos: any[] = [];
  visibilityOptions: string[] = ['Borrador', 'Público', 'Privado']; // Opciones de visibilidad

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.http
        .get<any[]>(`http://localhost:3000/api/videos/user/${userId}`)
        .subscribe({
          next: (data) => {
            this.videos = data.map((video) => ({
              id: video.id,
              thumbnail: video.thumbnailUrl
                ? `http://localhost:3000${video.thumbnailUrl}`
                : 'img/AsaPerfil.jpg',
              title: video.title,
              description: video.description,
              visibility: video.visibility?.name || 'Borrador',
              restrictions: 'Ninguna',
              date: new Date(video.createdAt).toLocaleDateString('es-ES'),
              views: video.views || 0,
              comments: video.comments?.length || 0,
              likes: video.likes || 0,
              dislikes: video.dislikes || 0,
            }));
          },
          error: (err) => {
            console.error('Error al obtener los videos del usuario:', err);
          },
        });
    }
  }

  // Actualizar visibilidad (necesita endpoint en backend)
  updateVisibility(videoId: string, newVisibility: string) {
    this.http
      .put(`http://localhost:3000/api/videos/${videoId}/visibility`, {
        visibility: newVisibility,
      })
      .subscribe({
        next: () => console.log('Visibilidad actualizada'),
        error: (err) => console.error('Error al actualizar visibilidad:', err),
      });
  }
}
