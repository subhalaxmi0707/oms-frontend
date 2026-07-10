import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService: AuthService,
              private router: Router) {}

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({

      next: (res: any) => {

        if (res === 'Login Successful') {

          alert('Login Successful');

          this.router.navigate(['/dashboard']);

        } else {

          alert(res);

        }

      },

      error: () => {

        alert('Server Error');

      }

    });

  }

}