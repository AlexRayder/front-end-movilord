import { Component } from '@angular/core';
import { VideoService } from '../service/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent {
  videos: any[] = [];
  selectedQuality: { [videoId: number]: string } = {};

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit() {
    this.videoService.getVideos().subscribe((data: any[]) => {
      this.videos = data.filter(
        (video) => video.visibility?.name === 'Público'
      );
    });
  }

  playPreview(video: HTMLVideoElement) {
    video.currentTime = 0;
    video.play();
  }

  resetPreview(video: HTMLVideoElement) {
    video.pause();
    video.currentTime = 0;
  }

  goToVideo(videoId: number) {
    // Navegamos directamente con el videoId (sin codificar)
    this.router.navigate(['/video', videoId]);
  }
}
