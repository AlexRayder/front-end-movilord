import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../service/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-visualization',
  templateUrl: './video-visualization.component.html',
  styleUrls: ['./video-visualization.component.css'],
  imports: [CommonModule, FormsModule],
})
export class VideoVisualizationComponent implements OnInit {
  video: any;
  newComment: string = '';
  hasLiked = false;
  hasDisliked = false;
  userId: string | null = ''; // Guardar el userId

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id'); // Asegúrate de obtener el userId desde localStorage o de donde lo tengas almacenado
    const videoId = this.route.snapshot.paramMap.get('videoId');

    if (videoId && this.userId) {
      this.videoService
        .getVideoById(videoId, this.userId)
        .subscribe((video) => {
          this.video = video;

          // Usar los valores enviados por el backend
          this.hasLiked = video.userLiked;
          this.hasDisliked = video.userDisliked;
        });
    }
  }

  toggleLike(): void {
    if (this.userId) {
      this.videoService
        .addLike(this.video.id, this.userId)
        .subscribe((response) => {
          if (response.liked) {
            this.video.likes += 1;
            this.hasLiked = true;
            if (this.hasDisliked) {
              this.video.dislikes -= 1;
              this.hasDisliked = false;
            }
          } else {
            this.video.likes -= 1;
            this.hasLiked = false;
          }
        });
    }
  }

toggleDislike(): void {
  if (!this.userId) return;

  this.videoService.addDislike(this.video.id, this.userId).subscribe((response) => {
    if (response.disliked) {
      this.video.dislikes += 1;
      this.hasDisliked = true;

      if (this.hasLiked) {
        this.video.likes -= 1;
        this.hasLiked = false;
      }
    } else {
      this.video.dislikes -= 1;
      this.hasDisliked = false;
    }
  });
}


  addComment() {
    if (!this.newComment.trim() || !this.userId || !this.video?.id) return;

    this.videoService
      .addComment({
        userId: this.userId,
        videoId: this.video.id,
        content: this.newComment.trim(),
      })
      .subscribe((comment: any) => {
        this.video.comments = [comment, ...this.video.comments]; // <- aquí el cambio
        this.newComment = ''; // Limpiar input
      });
  }
}
