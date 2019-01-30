import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {NetworkListComponent} from './network/network-list/network-list.component';
import {NetworkDetailComponent} from './network/network-detail/network-detail.component';
import {ModuleDetailComponent} from './module/module-detail/module-detail.component';
import {ModuleListComponent} from './module/module-list/module-list.component';
import {ModuleDetailEditComponent} from './module/module-detail-edit/module-detail-edit.component';
import {NetworkDetailEditComponent} from './network/network-detail-edit/network-detail-edit.component';
import {UserDetailEditComponent} from './user/user-detail-edit/user-detail-edit.component';
import {routingModule} from './app.routing';
import {UserDetailAddComponent} from './user/user-detail-add/user-detail-add.component';
import {NetworkDetailAddComponent} from './network/network-detail-add/network-detail-add.component';
import {ModuleDetailAddComponent} from './module/module-detail-add/module-detail-add.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {UsersService} from './user/users.service';
import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import {AuthService} from './auth/auth.service';
import {NetworkService} from './network/network.service';
import {StatusPipe} from './shared/pipes/status-pipe';
import {NetworkTypePipe} from './shared/pipes/network-type-pipe';
import {AutosizeModule} from 'ngx-autosize';
import {AceEditorModule} from 'ng2-ace-editor';
import {ModuleService} from './module/module.service';
import {ModuleTypePipe} from './shared/pipes/module-type-pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    NetworkListComponent,
    NetworkDetailComponent,
    ModuleDetailComponent,
    ModuleListComponent,
    ModuleDetailEditComponent,
    NetworkDetailEditComponent,
    UserDetailEditComponent,
    UserDetailAddComponent,
    NetworkDetailAddComponent,
    ModuleDetailAddComponent,
    StatusPipe,
    NetworkTypePipe,
    ModuleTypePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule, MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    AutosizeModule,
    AceEditorModule,
    routingModule,
  ],
  providers: [
    UsersService,
    NetworkService,
    ModuleService,
    HttpErrorHandler,
    MessageService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
