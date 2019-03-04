import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UsersService} from '../users.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail-edit',
  templateUrl: './user-detail-edit.component.html',
  styleUrls: ['./user-detail-edit.component.css']
})
export class UserDetailEditComponent implements OnInit {
  hide = true;
  user: User;

  constructor(public snackBar: MatSnackBar, private userService: UsersService, private router: Router) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUserMe().subscribe(user => {
      this.user = user;
    });
  }

  saveAndValidate() {
    this.userService.putUser(this.user).subscribe();
    this.openSnackBar('User saved', '');
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
