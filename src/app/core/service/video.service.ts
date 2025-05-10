import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'http://localhost:3000/api/videos'; // La URL base de la API

  constructor(private http: HttpClient) {}

  uploadVideo(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData); // La URL para subir videos
  }

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // La URL para obtener todos los videos
  }

  getVideoById(id: number | string, userId: string): Observable<any> {
    // Usamos la URL base apiUrl para obtener un video específico, y agregamos el userId como parámetro de consulta
    return this.http.get(`${this.apiUrl}/${id}?userId=${userId}`);
  }

  // Obtener el userId desde localStorage
  private getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  // Agregar like
  addLike(videoId: string, userId: string): Observable<any> {
    if (userId) {
      return this.http.post(`${this.apiUrl}/like`, { userId, videoId });
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  // Agregar dislike
  addDislike(videoId: string, userId: string): Observable<any> {
    if (userId) {
      return this.http.post(`${this.apiUrl}/dislike`, { userId, videoId });
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  // Agregar comentario
  addComment(commentData: any): Observable<any> {
    const userId = this.getUserId();
    if (userId) {
      return this.http.post(`${this.apiUrl}/comment`, {
        ...commentData,
        userId,
      });
    } else {
      throw new Error('Usuario no autenticado');
    }
  }
}
