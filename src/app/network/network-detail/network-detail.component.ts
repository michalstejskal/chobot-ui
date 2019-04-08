import {Component, OnInit} from '@angular/core';
import {Network} from '../model/Network';
import {NetworkService} from '../network.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ChobotModule} from '../../module/model/chobot-module';
import {ClipboardService} from 'ngx-clipboard';


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
  healtz = 'not running, please wait or deploy... ';
  showProgress: boolean;
  curl: string;
  displayedColumns: string[] = ['name', 'type', 'status'];
  options: any = {maxLines: 10, printMargin: false, showPrintMargin: false, showLineNumbers: false, showGutter: false, wrap: 150};
  swagger_url = '';
  is_running = false;
  data: any;

  constructor(public snackBar: MatSnackBar,
              private networkService: NetworkService,
              private route: ActivatedRoute,
              private router: Router,
              private clipboardService: ClipboardService
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
          this.swagger_url = 'http://' + this.network.connectionUri + '?url=swagger2.json&docExpansion=full';
        }
        this.getModules();
      }
    );
    this.getNetworkLogs();

  }

  getNetworkLogs() {
    this.networkService.getNetworkLogs(this.id).subscribe(logs => {
        // this.logs = atob(logs.value);
        if (logs.value.length !== 0) {
          this.logs = atob(logs.value);
        } else {
          this.logs = 'The selected network has not logged any messages yet ...';
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
      this.openSnackBar('Undeploying network, please wait', '');
    });
  }

  adviseCurl() {
    if (this.network.type.name === 'chatbot') {
      return 'curl  -X POST -H "Authorization: ' + this.network.apiKey +
        '" --data \'{"message":"hello world"}\' \'' + this.network.connectionUri + 'network/predict\' -H "Content-Type: application/json"';
    }

    // http://localhost/stejskys-d/?url=http://localhost/stejskys-d/swagger2.json

    return 'curl  -X POST -H "Authorization: ' + this.network.apiKey +
      '" -H "Secret: $USER_SECRET" -F input=@FILE.jpg \'' + this.network.connectionUri + 'network/predict\'';
  }

  deploy() {
    // this.showProgress = true;
    this.networkService.deployNetwork(this.id).subscribe(
      response => {
        this.getNetwork();
      }
    );
    this.openSnackBar('Deploying network, please wait', '');
  }

  checkHealtz() {
    this.networkService.getNetworkHealtz('http://' + this.network.connectionUri + 'healtz').subscribe(value => {
      this.healtz = 'running';
      this.is_running = true;
      if (this.healtz !== 'running') {
        this.network.status = 3;
      }
    });
  }

  loadLogsAndStatus() {
    this.checkHealtz();
    this.getNetworkLogs();
  }

  loadLogs() {
    this.getNetworkLogs();
  }

  addModule() {
    this.router.navigateByUrl('/networks/' + this.id + '/modules/add');
  }

  editModule(module) {
    this.router.navigateByUrl('/networks/' + this.id + '/modules/show/' + module.id);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  openSwagger() {
    window.open(this.swagger_url, '_blank');
  }


  copyToken() {
    this.clipboardService.copyFromContent(this.network.apiKey);
    this.openSnackBar('Api key copied to clipboard', '');
  }
}
