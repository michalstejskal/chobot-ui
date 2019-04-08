import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ModuleService} from '../module.service';
import {ChobotModule} from '../model/chobot-module';
import {MatSnackBar} from '@angular/material';
import {NetworkService} from '../../network/network.service';
import {ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {
  idModule: number;
  idNetwork: number;
  module: ChobotModule;
  showProgress: boolean;
  options: any = {maxLines: 1000, printMargin: false};
  logs: string;
  healtz = 'not running, please wait or deploy... ';
  is_running = false;
  swagger_url = '';

  constructor(public snackBar: MatSnackBar,
              private moduleService: ModuleService,
              private route: ActivatedRoute,
              private networkService: NetworkService,
              private clipboardService: ClipboardService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idModule = +params['id'];
      this.idNetwork = +params['idNetwork'];
      this.getModule();
    });
  }


  getModule() {
    this.moduleService.getModule(this.idModule, this.idNetwork).subscribe(module => {
        this.module = module;
        if (this.module.code) {
          this.module.code = atob(this.module.code);
        }

        if (this.module.status === 4) {
          this.checkHealtz();
          this.swagger_url = 'http://' + this.module.connectionUri + '?url=swagger2.json&docExpansion=full';
          this.moduleService.getModuleLogs(this.idModule, this.idNetwork).subscribe(logs => {
              if (logs.value.length !== 0) {
                this.logs = atob(logs.value);
              } else {
                this.logs = 'The selected network has not logged any messages yet ...';
              }
            }
          );
        }
      }
    );
  }

  loadLogsAndStatus() {
    this.checkHealtz();
    this.getModuleLogs();
  }

  loadLogs() {
    this.getModuleLogs();
  }

  getModuleLogs() {
    this.moduleService.getModuleLogs(this.idModule, this.idNetwork).subscribe(logs => {
        if (logs.value.length !== 0) {
          this.logs = atob(logs.value);
        } else {
          this.logs = 'The selected network has not logged any messages yet ...';
        }
      }
    );
  }

  deploy() {
    this.showProgress = true;
    this.moduleService.deployModule(this.module.id, this.idNetwork).subscribe(module => {
      this.getModule();
      this.openSnackBar('Deploying module', '');
    });
  }

  undeploy() {
    this.moduleService.undeploy(this.idNetwork, this.module.id).subscribe(module => {
      this.getModule();
      this.openSnackBar('Module undeploying', '');
    });

  }

  onChange(code) {
    console.log('new code', code);
  }

  checkHealtz() {
    this.networkService.getNetworkHealtz('http://' + this.module.connectionUri + 'healtz').subscribe(value => {
      this.healtz = 'running';
      this.is_running = true;
      if (this.healtz !== 'running') {
        this.module.status = 3;
      }
    });
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
    this.clipboardService.copyFromContent(this.module.apiKey);
    this.openSnackBar('Api key copied to clipboard', '');
  }

}
