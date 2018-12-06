import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';

import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)]))
    });
  }

  onLogin(form: FormGroup) {
    const username = form.value.username;
    const password = form.value.password;

    this.authService.doLogin(username, password).subscribe(
      response => {
        sessionStorage.setItem('accessToken', response.headers.get('Authorization'));
        sessionStorage.setItem('currentUser', username);
        this.toast.success('Bienvenido ' + username, 'Información');
        this.router.navigate(['/']);

      },
      error => {
        this.toast.error('Usuario y/o contraseña incorrectos', 'Error', {
          timeOut: 3000
        });
      });
  }
}
