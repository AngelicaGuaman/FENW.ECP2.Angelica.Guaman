import {Component, OnInit} from '@angular/core';

import {AuthService} from '../shared/services/auth.service';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private toast: ToastrService) {
  }

  ngOnInit() {
  }

  isLogin() {
    return this.authService.isLogin();
  }

  doLogout() {
    this.authService.doLogout();
    this.toast.success('Se ha cerrado la sesión', 'Información');
  }

}
