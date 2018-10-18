import {Injectable} from '@angular/core';
import {User} from '../user/model/user';

@Injectable()
export class AuthService {
  public static getLoggedUser(): User {
    const user = new User();
    user.login = 'aaaa';
    user.id  = 1;
    return user;
  }
}
