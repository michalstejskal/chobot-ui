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
  moduleTypes: ModuleType[] = [
    {id: 0, value: 'lambda'},
    {id: 1, value: 'git repository'},
    {id: 2, value: 'docker image'}
  ];

  constructor(public snackBar: MatSnackBar,
              private moduleService: ModuleService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.module = new ChobotModule();
    this.module.actualVersion = new ActualVersion();
    this.route.params.subscribe((params: Params) => {
      this.idNetwork = +params['id'];
    });
  }

  onChange(code) {
    console.log('new code', code);
  }

  saveAndValidate() {
    this.module.code = btoa(this.module.code);
    console.log(this.module);
    this.moduleService.postModule(this.module, this.idNetwork).subscribe(module => {
        this.openSnackBar('Module ' + this.module.name + ' saved', '');
        this.router.navigateByUrl('/networks/' + this.idNetwork + '/modules/show/' + module.id);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}

