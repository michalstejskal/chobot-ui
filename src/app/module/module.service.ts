import {Injectable} from '@angular/core';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_ROOT_DOMAIN} from '../shared/api-util';
import {AuthService} from '../auth/auth.service';
import {catchError} from 'rxjs/operators';
import {ChobotModule} from './model/chobot-module';
import {Network} from '../network/model/Network';
import {Log} from '../shared/model/log';

@Injectable()
export class ModuleService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ModuleService');
  }


  postModule(module: ChobotModule, idNetwork: number): Observable<ChobotModule> {
    return this.http.post<ChobotModule>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/module', module)
      .pipe(
        catchError(this.handleError('postModule', null))
      );
  }

  getModule(idModule: number, idNetwork: number): Observable<ChobotModule> {
    return this.http.get<ChobotModule>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/module/' + idModule)
      .pipe(
        catchError(this.handleError('postModule', null))
      );
  }

  getUserModule(): Observable<ChobotModule> {
    return this.http.get<ChobotModule>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/module/')
      .pipe(
        catchError(this.handleError('postModule', null))
      );
  }

  deployModule(idModule: number, idNetwork: number) {
    console.log(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/module/' + idModule + '/deployment');
    return this.http.put<ChobotModule>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/module/' + idModule + '/deployment', null)
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }

  getModuleLogs(idModule: number, idNetwork: number): Observable<Log> {
    return this.http.get<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/module/' + idModule + '/logs')
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }

  undeploy(idNetwork: number, idModule: number){
    return this.http.delete<ChobotModule>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/module/' + idModule)
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }
}
