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

  doLogin(name: string, psw: string) {

    return this.http.get(this.baseurl + '/users/login?username=' + name + '&password=' + psw,
      {
        observe:
          'response'
      });

  }

  checkUser(username: string) {
    return this.http.get(this.baseurl + '/users/' + username);
  }

  doLogout() {
    /*sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('accessToken');*/
  }
}
