import { Component } from '@angular/core';
import { VideoService } from '../service/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent {
  selectedFile: File | null = null;  // Permitir null como valor válido
  videoTitle: string = '';  // Variable para el título del video
  videos: any[] = [];

  // Al iniciar el componente, obtenemos los videos
  ngOnInit() {
    this.videoService.getVideos().subscribe((data: any[]) => {
      this.videos = data;
    });
  }

  constructor(private videoService: VideoService) {}



}
