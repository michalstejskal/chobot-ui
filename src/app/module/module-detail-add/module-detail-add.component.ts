import {Component, OnInit} from '@angular/core';
import {ChobotModule} from '../model/chobot-module';
import {ModuleType} from '../model/module-type';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ModuleService} from '../module.service';
import {ActualVersion} from '../model/actual-version';

@Component({
  selector: 'app-module-detail-add',
  templateUrl: './module-detail-add.component.html',
  styleUrls: ['./module-detail-add.component.css']
})
export class ModuleDetailAddComponent implements OnInit {
  module: ChobotModule;
  options: any = {maxLines: 1000, printMargin: false};
  idNetwork: number;
  invalidName = false;
  moduleTypes: ModuleType[] = [
    {id: 0, value: 'lambda'},
    {id: 1, value: 'git repository'},
  ];

  constructor(public snackBar: MatSnackBar,
              private moduleService: ModuleService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.module = new ChobotModule();
    this.module.code = 'def handle(context_data, original_request):';
    this.module.actualVersion = new ActualVersion();
    this.route.params.subscribe((params: Params) => {
      this.idNetwork = +params['id'];
    });
  }

  onChange(code) {
    console.log('new code', code);
  }

  saveAndValidate() {
    this.invalidName = false;
    if (!this.module.name || this.module.name.includes('_')) {
      this.invalidName = true;
      this.openSnackBar('Invalid name for module ', '');
    } else if (!this.module.responseClass) {
      this.openSnackBar('Please specify response class', '');
    } else if (!this.module.actualVersion.name) {
      this.openSnackBar('Please specify version name', '');
    } else if (this.module.type == null) {
      this.openSnackBar('Please specify module type', '');
    } else {
      this.module.code = btoa(this.module.code);
      this.moduleService.postModule(this.module, this.idNetwork).subscribe(module => {
          this.openSnackBar('Module ' + this.module.name + ' saved', '');
          this.router.navigateByUrl('/networks/' + this.idNetwork + '/modules/show/' + module.id);
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}

