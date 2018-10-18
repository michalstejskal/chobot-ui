import {Component, OnInit} from '@angular/core';
import {NetworkService} from '../../network/network.service';
import {Router} from '@angular/router';
import {ModuleService} from '../module.service';
import {AuthService} from '../../auth/auth.service';
import {ChobotModule} from '../model/chobot-module';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {}




}
