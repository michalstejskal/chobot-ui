import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UsersService} from '../../user/users.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  login = '';
  password = '';

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private userService: UsersService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.login || !this.password) {
      this.openSnackBar('You have to fill login and password fields', '');
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.login, this.password)
      .subscribe((response: any) => {
        localStorage.setItem('token', response.headers.get('Authorization'));

        this.getUserDetail(response.headers.get('user_id'));
        this.router.navigate(['/networks']);
      });
  }

  getUserDetail(userId) {
    this.userService.getUserMe().subscribe(user => {
      localStorage.setItem('user_detail', JSON.stringify(user));
    });
  }

  register() {
    this.openSnackBar('This is closed beta, you cannot register new account', '');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
