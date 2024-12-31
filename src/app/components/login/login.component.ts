import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AuthRequestModel } from '../../model/auth/authRequest.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  faChevronRight = faChevronRight;

  authRequest: AuthRequestModel = new AuthRequestModel('', '');
  authService = inject(AuthService);

  login() {
    this.authService.login(this.authRequest);
  }
}
