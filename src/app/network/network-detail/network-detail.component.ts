import {Component, OnInit} from '@angular/core';
import {Network} from '../model/Network';
import {NetworkService} from '../network.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Log} from '../../shared/model/log';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {interval} from 'rxjs';
import {ChobotModule} from '../../module/model/chobot-module';

@Component({
  selector: 'app-network-detail',
  templateUrl: './network-detail.component.html',
  styleUrls: ['./network-detail.component.css']
})
export class NetworkDetailComponent implements OnInit {
  hide = true;
  network: Network;
  modules: ChobotModule[];
  logs: string;
  id: number;
  healtz = 'not running';
  showProgress: boolean;
  curl: string;
  displayedColumns: string[] = ['name', 'type', 'status'];
  options: any = {maxLines: 10, printMargin: false, showPrintMargin: false, showLineNumbers: false, showGutter: false, wrap: 100};

  constructor(public snackBar: MatSnackBar,
              private networkService: NetworkService,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.getNetwork();
    });
  }


  getNetwork(): void {
    this.networkService.getNetwork(this.id).subscribe(network => {
        this.network = network;
        if (this.network.status === 4) {
          this.checkHealtz();
          this.curl = this.adviseCurl();
        }
        this.getModules();
      }
    );
    this.networkService.getNetworkLogs(this.id).subscribe(logs => {
        // this.logs = atob(logs.value);
        if (logs.value.length !== 0) {
          this.logs = atob(logs.value);
        } else {
          this.logs = 'Network did not logged yet...';
        }
      }
    );
  }

  getModules() {
    this.networkService.getNetworkModules(this.id).subscribe(modules => this.modules = modules);
  }

  undeploy() {
    this.networkService.undeploy(this.id).subscribe(network => {
      this.network = network;
      this.checkHealtz();
      this.curl = '';
      this.openSnackBar('Network undeploying', '');
    });
  }

  adviseCurl() {
    if (this.network.type.name === 'chatbot') {
      return 'curl  -X POST -H "Authorization: ' + this.network.apiKey +
        '" -H "Secret: $USER_SECRET"  --data \'{"message":"hello world"}\' \'' + this.network.connectionUri + 'network/predict\' -H "Content-Type: application/json"';
    }

    return 'curl  -X POST -H "Authorization: ' + this.network.apiKey +
      '" -H "Secret: $USER_SECRET" -F input=@FILE.jpg \'' + this.network.connectionUri + 'network/predict\'';
  }

  deploy() {
    this.showProgress = true;
    this.networkService.deployNetwork(this.id).subscribe();
    this.openSnackBar('Deploying network', '');
  }

  checkHealtz() {
    this.networkService.getNetworkHealtz('http://' + this.network.connectionUri + 'healtz').subscribe(value => {
      this.healtz = 'running';
      if (this.healtz !== 'running'){
        this.network.status = 3;
      }
    });
  }


  addModule() {
    this.router.navigateByUrl('/networks/' + this.id + '/modules/add');
  }

  editModule(module) {
    this.router.navigateByUrl('/networks/' + this.id + '/modules/show/' + module.id);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
