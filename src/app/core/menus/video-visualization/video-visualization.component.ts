import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../service/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-visualization',
  standalone: true,
  templateUrl: './video-visualization.component.html',
  styleUrls: ['./video-visualization.component.css'],
  imports: [CommonModule, FormsModule],
})
export class VideoVisualizationComponent implements OnInit {
  video: any;
  newComment: string = '';
  hasLiked = false;
  hasDisliked = false;
  userId: string | null = '';
  relatedVideos: any[] = [];
  isSubscribed = false;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');
    const videoId = this.route.snapshot.paramMap.get('videoId');

    if (videoId && this.userId) {
      this.videoService
        .getVideoById(videoId, this.userId)
        .subscribe((video) => {
          this.video = video;
          this.hasLiked = video.userLiked;
          this.hasDisliked = video.userDisliked;
          this.loadRelatedVideos(video.id);

          if (video.user?.id) {
            this.checkSubscription();
          } else {
            console.warn('El video no tiene un usuario asociado');
          }
        });
    }
  }

  loadRelatedVideos(currentVideoId: string) {
    this.videoService.getVideos().subscribe((videos) => {
      const filtered = videos.filter((v) => v.id != currentVideoId);
      this.relatedVideos = this.shuffleArray(filtered);
    });
  }

  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  toggleLike(): void {
    if (!this.userId) return;
    this.videoService.addLike(this.video.id, this.userId).subscribe((res) => {
      if (res.liked) {
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

  toggleDislike(): void {
    if (!this.userId) return;
    this.videoService
      .addDislike(this.video.id, this.userId)
      .subscribe((res) => {
        if (res.disliked) {
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
        this.video.comments = [comment, ...this.video.comments];
        this.newComment = '';
      });
  }

  checkSubscription() {
    if (!this.userId || !this.video?.user || !this.video.user.id) {
      console.warn('Faltan datos para verificar suscripción:', {
        userId: this.userId,
        videoUser: this.video?.user,
      });
      return;
    }

    this.videoService
      .getSubscriptions(this.userId)
      .subscribe((subscriptions) => {
        this.isSubscribed = subscriptions.some(
          (user: any) => user.id == this.video.user.id
        );
      });
  }

  toggleSubscription() {
    if (!this.userId || !this.video?.user?.id) {
      console.warn('Faltan datos para suscribirse o desuscribirse');
      return;
    }

    const data = {
      subscriberId: this.userId,
      subscribedToId: this.video.user.id,
    };

    this.videoService.toggleSubscription(data).subscribe((res) => {
      this.isSubscribed = res.subscribed;

      // Actualizar el número de suscriptores
      if (this.isSubscribed) {
        this.video.totalSubscribers += 1;
      } else {
        this.video.totalSubscribers -= 1;
      }

      console.log(this.isSubscribed ? 'Suscrito' : 'Desuscrito');
    });
  }
}
