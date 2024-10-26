import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }

  public loginUser = {
    username: '',
    password: ''
  }

  public onLoginClicked() {
    if (this.loginUser.username === 'r' && this.loginUser.password === 'r') {
      localStorage.setItem('llama-userType', 'recruiter');
      this.router.navigate(['/recruiter']);
    } else {
      localStorage.setItem('llama-userType', 'developer');
      this.router.navigate(['/developer']);
    }
  }
}
