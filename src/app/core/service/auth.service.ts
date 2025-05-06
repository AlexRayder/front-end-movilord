import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/api/login`, body);
  }

  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post<any>(`${this.apiUrl}/api/users`, body);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users`); // API endpoint para obtener todos los usuarios
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users/${id}`);
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/users/${id}`, data);
  }

  storeToken(token: string) {
    localStorage.setItem('auth_token', token); // Guarda el token en localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
}
