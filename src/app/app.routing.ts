import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserDetailEditComponent} from './user/user-detail-edit/user-detail-edit.component';
import {UserDetailAddComponent} from './user/user-detail-add/user-detail-add.component';
import {NetworkDetailComponent} from './network/network-detail/network-detail.component';
import {NetworkListComponent} from './network/network-list/network-list.component';
import {NetworkDetailEditComponent} from './network/network-detail-edit/network-detail-edit.component';
import {NetworkDetailAddComponent} from './network/network-detail-add/network-detail-add.component';
import {ModuleListComponent} from './module/module-list/module-list.component';
import {ModuleDetailComponent} from './module/module-detail/module-detail.component';
import {ModuleDetailEditComponent} from './module/module-detail-edit/module-detail-edit.component';
import {ModuleDetailAddComponent} from './module/module-detail-add/module-detail-add.component';

const routes: Routes = [
  {path: '', component: NetworkListComponent},
  {path: 'users/:id', component: UserDetailEditComponent},
  {path: 'users/:id/edit', component: UserDetailEditComponent},
  {path: 'users/:id/add', component: UserDetailAddComponent}, // TODO BUDE REGISTRACE

  {path: 'networks', component: NetworkListComponent},
  {path: 'networks/add', component: NetworkDetailAddComponent},
  {path: 'networks/:id', component: NetworkDetailComponent},
  {path: 'networks/:id/edit', component: NetworkDetailEditComponent},


  {path: 'modules', component: ModuleListComponent},
  {path: 'networks/:idNetwork/modules/show/:id', component: ModuleDetailComponent},
  {path: 'modules/:id/edit', component: ModuleDetailEditComponent},
  {path: 'networks/:id/modules/add', component: ModuleDetailAddComponent},
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
