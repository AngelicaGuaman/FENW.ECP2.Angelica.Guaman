import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';

import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public showError = false;

  public form: FormGroup;

  public user: User;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toast: ToastrService) {
    this.user = new User('', '', '', '', 0);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required])),
      repeatPassword: new FormControl('', Validators.compose([Validators.required])),
      birthdate: new FormControl(0)
    });
  }

  onSignIn(form: FormGroup) {

    if (form.get('username').hasError('required') ||
      form.get('email').hasError('required') ||
      form.get('password').hasError('required') ||
      form.get('repeatPassword').hasError('required') ||
      form.value.password !== form.value.repeatPassword) {
      this.showError = true;
    } else {
      const birthdate = new Date(form.value.birthdate);

      this.user.username = form.value.username;
      this.user.email = form.value.email;
      this.user.password = form.value.password;
      this.user.repeatPassword = form.value.repeatPassword;
      this.user.birthdate = birthdate.getTime();

      this.authService.registerUser(this.user).subscribe(
        response => {
          this.toast.success('Se ha creado correctamente el usuario ' + this.user.username, 'Información');
          this.router.navigate(['/login']);
        },
        error => {
          this.toast.error('No se ha podido realizar la petición', 'Error', {
            timeOut: 3000
          });
        });
    }
  }

  checkUser(username: string) {
    this.authService.checkUser(username).subscribe(
      response => {
        this.toast.error('El usuario ya está registrado', 'Error', {
          timeOut: 3000
        });
      });
  }

}
