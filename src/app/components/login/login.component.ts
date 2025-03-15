import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AuthRequestModel } from '../../model/auth/authRequest.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

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
  toastService = inject(ToastService);
  router = inject(Router);
  
  login() {
    this.authService.login(this.authRequest).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.toastService.error('Erro', 'Erro ao realizar login');
        console.log(error);
        console.error('Login failed:', error.message);
      }
    });
  }
}
