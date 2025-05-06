import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit{
  isDarkMode = false;

  ngOnInit() {
    // Cargar el valor del modo oscuro desde el localStorage solo si es necesario
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
  }
  onDarkModeChanged(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}
