import { Component, OnInit } from '@angular/core';
import { AuthService } from '@authentication/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private status = {
    errorMessage: '',
    successMessage: ''
  };
  private errorMessage: string = '';
  private successMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  tryRegister(value: { email: string, password: string }) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.status = { errorMessage: '', successMessage: 'Your Account has been created' }
      }, err => {
        console.log(err);
        this.status = { errorMessage: err.message, successMessage: '' }
      })
  }
}
