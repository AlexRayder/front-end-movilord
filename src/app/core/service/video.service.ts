import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'http://localhost:3000/api/videos';
  private apiUrlSubscribe = 'http://localhost:3000/api/subscriptions';

  constructor(private http: HttpClient) {}

  uploadVideo(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getVideoById(id: number | string, userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}?userId=${userId}`);
  }

  getVideosByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  private getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  addLike(videoId: string, userId: string): Observable<any> {
    if (userId) {
      return this.http.post(`${this.apiUrl}/like`, { userId, videoId });
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  addDislike(videoId: string, userId: string): Observable<any> {
    if (userId) {
      return this.http.post(`${this.apiUrl}/dislike`, { userId, videoId });
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

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

  // ✅ NUEVO MÉTODO UNIFICADO
  toggleSubscription(data: {
    subscriberId: string;
    subscribedToId: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrlSubscribe}/toggle`, data);
  }

  getSubscriptions(userId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrlSubscribe}/subscriptions/${userId}`
    );
  }
}
