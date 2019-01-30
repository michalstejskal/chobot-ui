import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Network} from './model/Network';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {API_ROOT_DOMAIN} from '../shared/api-util';
import {AuthService} from '../auth/auth.service';
import {NetworkParameter} from './model/network-parameter';
import {Log} from '../shared/model/log';
import {EMPTY} from 'rxjs';
import {ChobotModule} from '../module/model/chobot-module';


@Injectable()
export class NetworkService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UsersService');
  }


  getNetworks(id: number): Observable<Network[]> {
    return this.http.get<Network[]>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/')
      .pipe(
        catchError(this.handleError('getNetworks', []))
      );
  }

  getNetworkModules(idNetwork: number): Observable<ChobotModule[]> {
    return this.http.get<ChobotModule[]>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/module')
      .pipe(
        catchError(this.handleError('getNetworks', []))
      );
  }

  getNetwork(idNetwork: number): Observable<Network> {
    return this.http.get<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork)
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }

  getNetworkLogs(idNetwork: number): Observable<Log> {
    return this.http.get<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/logs')
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }

  deployNetwork(idNetwork: number) {
    return this.http.put<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork, null)
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }

  postNetwork(network: Network): Observable<Network> {
    return this.http.post<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/', network)
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }

  getNetworkHealtz(uri) {
    console.log(uri);
    return this.http.get(uri)
      .pipe(
        catchError((err, caught) => {
          return EMPTY;
        })
      )
      ;
  }


  postNetworkParameter(network: Network, file: File) {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + network.id + '/trainData', uploadData)
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }

  postNetworkParameterString(network: Network, trainData: string) {
    return this.http.post<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + network.id + '/encodedTrainData', trainData)
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }

  getTypes() {
    return this.http.get<Network[]>(API_ROOT_DOMAIN + 'networktype/')
      .pipe(
        catchError(this.handleError('getNetworkTypes', []))
      );
  }

  undeploy(idNetwork: number){
    return this.http.delete<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork)
      .pipe(
        catchError(this.handleError('getNetwork', null))
      );
  }

}
