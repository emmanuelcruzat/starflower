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
        this.nation.load(true); // refresh identity
        this.router.navigate(['/nation'], { replaceUrl: true });
      },
      error: () => {
        this.error = 'Invalid credentials';
      },
    });
  }
}
