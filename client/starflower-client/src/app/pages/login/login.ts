import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { NationService } from '../../services/nation';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, public nation: NationService, private router: Router) {}

  submit() {
    this.error = '';

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        //token is stored, kick off identity resolution
        this.nation.load(true);

        //navigate away from /login
        this.router.navigate(['/nation'], { replaceUrl: true });
      },
      error: () => {
        this.error = 'Invalid credentials';
      },
    });
  }
}
