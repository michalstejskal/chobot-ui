import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {Observable} from 'rxjs';
import {User} from './model/user';
import {catchError} from 'rxjs/operators';
import {API_ROOT_DOMAIN} from '../shared/api-util';


@Injectable()
export class UsersService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UsersService');
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_ROOT_DOMAIN + 'user')
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  getUserMe(): Observable<User> {
    return this.http.get<User>(API_ROOT_DOMAIN + 'user/me')
      .pipe(
        catchError(this.handleError('getUser', null))
      );
  }

  putUser(user: User): Observable<User> {
    return this.http.put(API_ROOT_DOMAIN + 'user', user)
      .pipe(
        catchError(this.handleError('putUser', null))
      );
  }

}
