import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseurl = 'http://fenw.etsisi.upm.es:5555';

  constructor(private http: HttpClient) {
  }

  registerUser(user: User) {

    return this.http.post(this.baseurl + '/users', user,
      {

        headers:
          new HttpHeaders({
            'Content-Type':
              'application/json'
          }),

        observe:
          'response'

      });

  }


  doLoginUser(name:
                string, psw:
                string) {

    this.http.get(this.baseurl + '/users/login?username=' + name + '&password=' + psw,
      {
        observe:
          'response'
      });

  }


  setUser(user): void {

    let userString = JSON.stringify(user);
    sessionStorage.setItem('currentUser', userString);

  }


  getCurrentUser() {

    let userString = sessionStorage.getItem('currentUser');
    let user = null;


    if (userString !== undefined && userString != null) {
      let user = JSON.parse(userString);
    }

    return user;
  }

  setToken(token): void {
    sessionStorage.setItem('accessToken', token);
  }

  getToken() {
    sessionStorage.getItem('accessToken');
  }

  doLogout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('accessToken');
  }
}
