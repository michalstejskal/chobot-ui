import {Component, OnInit} from '@angular/core';
import {Network} from '../model/Network';
import {User} from '../../user/model/user';
import {AuthService} from '../../auth/auth.service';
import {NetworkService} from '../network.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-network-list',
  templateUrl: './network-list.component.html',
  styleUrls: ['./network-list.component.css']
})
export class NetworkListComponent implements OnInit {
  networks: Network[];
  user: User;
  displayedColumns: string[] = ['name', 'type', 'status'];

  constructor(private networkService: NetworkService,
              private router: Router) {}

  ngOnInit() {
    this.user = AuthService.getLoggedUser();
    this.loadUserNetworks();
  }

  loadUserNetworks() {
    this.networkService.getNetworks(this.user.id).subscribe(networks => this.networks = networks);
  }

  addNetwork() {
    this.router.navigateByUrl('/networks/add');
  }

  editNetwork(network) {
    this.router.navigateByUrl('/networks/' + network.id);
  }



}
