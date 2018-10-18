import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {Observable} from 'rxjs';
import {User} from './model/user';
import {catchError} from 'rxjs/operators';


@Injectable()
export class UsersService {
  usersUrl = 'http://localhost:8090/api/v1/user/';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UsersService');
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + id)
      .pipe(
        catchError(this.handleError('getUser', null))
      );
  }

  putUser(user: User): Observable<User> {
    return this.http.put(this.usersUrl, user)
      .pipe(
        catchError(this.handleError('putUser', null))
      );
  }

}
