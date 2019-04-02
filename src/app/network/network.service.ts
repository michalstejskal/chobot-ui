import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Network} from './model/Network';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {API_ROOT_DOMAIN} from '../shared/api-util';
import {AuthService} from '../auth/auth.service';
import {NetworkParameter} from './model/network-parameter';
import {Log} from '../shared/model/log';
import {EMPTY} from 'rxjs';
import {ChobotModule} from '../module/model/chobot-module';
import {AbstractHttpService} from '../shared/service/abstract-http.service';
import {NetworkType} from './model/network-type';


@Injectable()
export class NetworkService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }


  getNetworks(id: number): Observable<Network[]> {
    return this.http.get<Network[]>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/')
      .pipe(
        catchError(this.handleError)
      );
  }

  getNetworkModules(idNetwork: number): Observable<ChobotModule[]> {
    return this.http.get<ChobotModule[]>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/module')
      .pipe(
        catchError(this.handleError)
      );
  }

  getNetwork(idNetwork: number): Observable<Network> {
    return this.http.get<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNetworkLogs(idNetwork: number): Observable<Log> {
    return this.http.get<Log>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork + '/logs')
      .pipe(
        catchError(this.handleError)
      );
  }

  deployNetwork(idNetwork: number) {
    return this.http.put<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork, null)
      .pipe(
        catchError(this.handleError)
      );
  }

  postNetwork(network: Network): Observable<Network> {
    return this.http.post<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/', network)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNetworkHealtz(uri) {
    return this.http.get(uri)
      .pipe(
        catchError((err, caught) => {
          return EMPTY;
        })
      )
      ;
  }


  postNetworkParameterData(network: Network, file: File) {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + network.id + '/trainData', uploadData)
      .pipe(
        catchError(this.handleError)
      );
  }

  postNetworkParameter(network: Network, parameter: NetworkParameter) {
    return this.http.post<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + network.id + '/parameter', parameter)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTypes() {
    return this.http.get<NetworkType[]>(API_ROOT_DOMAIN + 'networktype/')
      .pipe(
        catchError(this.handleError)
      );
  }

  undeploy(idNetwork: number) {
    return this.http.delete<Network>(API_ROOT_DOMAIN + 'user/' + AuthService.getLoggedUser().id + '/network/' + idNetwork)
      .pipe(
        catchError(this.handleError)
      );
  }
}
