import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UsersService} from '../../user/users.service';
import {MatSnackBar} from '@angular/material';
import {UserLogin} from '../model/UserLogin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();

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
    if (!this.userLogin.username || !this.userLogin.password) {
      this.openSnackBar('You have to fill loagin and password fields', '');
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.userLogin)
      .subscribe((response: any) => {
        localStorage.setItem('token', response.headers.get('Authorization'));

        this.userService.getUserMe().subscribe(user => {
          localStorage.setItem('user_detail', JSON.stringify(user));
          this.router.navigate(['/networks']);
        });
      });
  }

  register(){
    // this.router.navigate(['/register']);
    this.openSnackBar('This is closed beta. Unfortunately you can not create new account.', '');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
