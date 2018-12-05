import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]))
    });
  }

  onLogin(form: FormGroup) {
    const username = this.form.value.username;
    const password = this.form.value.password;

    this.authService.doLogin(username, password).subscribe(
      response => {
        sessionStorage.setItem('accessToken', response.headers.get('Authorization'));
        sessionStorage.setItem('currentUser', username);

      });
  }

}
