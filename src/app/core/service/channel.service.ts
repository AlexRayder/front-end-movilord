import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private readonly apiUrl = 'http://localhost:3000/api/channel';

  constructor(private http: HttpClient) {}

  getChannelByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/channel/${userId}`);
  }

  updateBanner(userId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('banner', file);
    return this.http.post(`${this.apiUrl}/channel/banner/${userId}`, formData);
  }
}
