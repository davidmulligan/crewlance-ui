import { Component } from '@angular/core';
import { AuthService } from 'shared/service/auth.service';

@Component({
  selector: 'navigation-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService) {
  }
}
