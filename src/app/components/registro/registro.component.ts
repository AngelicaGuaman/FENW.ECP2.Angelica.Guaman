import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public form: FormGroup;

  public user: User;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
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
    const birthdate = new Date(form.value.birthdate);

    this.user = new User(form.value.username, form.value.email, form.value.password, form.value.repeatPassword, birthdate.getTime());

    this.authService.registerUser(this.user).subscribe(
      response => {
        sessionStorage.setItem('accessToken', response.headers.get('Authorization'));
        sessionStorage.setItem('currentUser', this.form.value.username);

      });
  }

  checkUser(username: string) {
    this.authService.checkUser(username).subscribe(
      response => {

      });
  }

}
