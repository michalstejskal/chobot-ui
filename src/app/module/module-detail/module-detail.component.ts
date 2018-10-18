import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ModuleService} from '../module.service';
import {ChobotModule} from '../model/chobot-module';
import {MatSnackBar} from '@angular/material';

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

  constructor(public snackBar: MatSnackBar,
              private moduleService: ModuleService,
              private route: ActivatedRoute) {
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

        this.moduleService.getModuleLogs(this.idModule, this.idNetwork).subscribe(logs => {
            if (logs.value.length !== 0) {
              this.logs = atob(logs.value);
            } else {
              this.logs = 'Network did not logged yet...';
            }
          }
        );

      }
    );
  }

  deploy() {
    this.showProgress = true;
    console.log(this.module);
    this.moduleService.deployModule(this.module.id, this.idNetwork).subscribe();
    this.openSnackBar('Deploying module', '');
  }

  undeploy() {
    this.showProgress = false;
    console.log('tbd');
  }

  onChange(code) {
    console.log('new code', code);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
