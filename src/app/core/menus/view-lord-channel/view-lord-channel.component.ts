import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ChannelService } from '../../service/channel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-lord-channel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './view-lord-channel.component.html',
  styleUrls: ['./view-lord-channel.component.css'],
})
export class ViewLordChannelComponent implements OnInit {
  private readonly baseUrl = 'http://localhost:3000';

  channelUser: any;
  videos: any[] = [];

  constructor(
    private authService: AuthService,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {
    this.loadChannelDetails();
  }

  loadChannelDetails(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.channelService.getChannelByUserId(userId).subscribe({
        next: (data) => {
          this.channelUser = {
            ...data.channel.user,
            bannerImage: this.getFullUrl(data.channel.bannerUrl),
            totalSubscribers: data.stats.totalSubscribers,
          };
          this.videos = data.videos.map((video: any) => ({
            ...video,
            totalViews: data.stats.totalViews,
            likes: data.stats.totalLikes,
          }));
          console.log('Datos del canal:', this.channelUser);
        },
        error: (err) => console.error('Error cargando canal', err),
      });
    }
  }

  getFullUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  getFullVideoUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  onBannerSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    const userId = this.authService.getUserId();

    if (file && userId) {
      this.channelService.updateBanner(userId, file).subscribe({
        next: (res) => {
          this.channelUser.bannerImage = this.getFullUrl(res.bannerUrl);
        },
        error: (err) => console.error('Error al subir banner', err),
      });
    } else {
      console.warn('Falta el archivo o el userId es nulo');
    }
  }
}
