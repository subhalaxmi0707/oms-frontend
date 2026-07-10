import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    role: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    this.authService.register(this.user).subscribe({

      next: (res) => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.log(err);
        alert('Registration Failed');
      }

    });

  }

}