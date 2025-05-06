import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'http://localhost:3000/api/videos';

  constructor(private http: HttpClient) {}

  uploadVideo(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
