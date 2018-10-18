import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {User} from '../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(1).subscribe(user => this.user = user);
  }

}
