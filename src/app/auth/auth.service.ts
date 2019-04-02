import {Injectable} from '@angular/core';
import {User} from '../user/model/user';
import {LOGIN_ROOT_DOMAIN} from '../shared/api-util';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractHttpService} from '../shared/service/abstract-http.service';
import {Router} from '@angular/router';
import {UserLogin} from './model/UserLogin';

@Injectable({providedIn: 'root'})

export class AuthService extends AbstractHttpService {
  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  public static getLoggedUser(): User {
    const userJson = localStorage.getItem('user_detail');
    const user = JSON.parse(userJson);

    // const user = new User();
    // user.login = 'aaaa';
    // user.id = 1;
    return user;
  }

  login(userLogin: UserLogin) {

    return this.http. post<any>(LOGIN_ROOT_DOMAIN, userLogin, {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_detail');
    this.router.navigate(['/login']);
  }


}
