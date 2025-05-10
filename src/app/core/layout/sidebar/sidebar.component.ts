import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  @Output() darkModeChanged = new EventEmitter<boolean>();
  isDarkMode = false;
  menuOpen = false;
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';
  userImage: string = '';

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.menuOpen = localStorage.getItem('menuOpen') === 'true';

    const userId = this.authService.getUserId();

    if (userId) {
      this.authService.getUserById(userId).subscribe(
        (user) => {
          this.userName = user.username;
          this.userEmail = user.email;
          this.userRole = user.Role.name;
          this.userImage = user.profileImage;
        },
        (error) => {
          console.error('Error al obtener usuario:', error);
        }
      );
    }
  }

  openMenu() {
    this.menuOpen = !this.menuOpen;
    localStorage.setItem('menuOpen', this.menuOpen.toString());
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeChanged.emit(this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  mainButton = { icon: 'add', label: 'Create new' };

  navigationItems = [
    { icon: 'home', label: 'Home', route: 'dashboard' },
    { icon: 'rocket_launch', label: 'Rocket', route: 'video' },
    { icon: 'shop', label: 'Shop', route: 'improve' },
    { icon: 'play_for_work', label: 'Play Work', route: 'improve' },
    { icon: 'sports_esports', label: 'Sport', route: 'improve' },
  ];

  navigationMenuAccount = [
    { icon: 'mail', label: 'Inbox', route: 'improve' },
    { icon: 'person', label: 'Perfil', route: 'account' },
    { icon: 'settings', label: 'Configuración', route: 'improve' },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('cerró sesión');
  }
}
