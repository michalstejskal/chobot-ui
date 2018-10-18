import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UsersService} from '../users.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-detail-edit',
  templateUrl: './user-detail-edit.component.html',
  styleUrls: ['./user-detail-edit.component.css']
})
export class UserDetailEditComponent implements OnInit {
  hide = true;
  user: User;

  constructor(public snackBar: MatSnackBar, private userService: UsersService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(1).subscribe(user => this.user = user);
  }

  saveAndValidate() {
    this.userService.putUser(this.user).subscribe();
    this.openSnackBar('User saved', '');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
