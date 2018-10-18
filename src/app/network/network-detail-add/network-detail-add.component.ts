import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Network} from '../model/Network';
import {MatSnackBar} from '@angular/material';
import {NetworkType} from '../model/network-type';
import {NetworkService} from '../network.service';
import {t} from '@angular/core/src/render3';
import {Router} from '@angular/router';

@Component({
  selector: 'app-network-detail-add',
  templateUrl: './network-detail-add.component.html',
  styleUrls: ['./network-detail-add.component.css']
})
export class NetworkDetailAddComponent implements OnInit {
  network: Network;
  types: NetworkType[];
  hidden: string;
  trainingData = '';
  files: File[];


  constructor(public snackBar: MatSnackBar,
              private networkService: NetworkService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.network = new Network();
    this.networkService.getTypes().subscribe(types => this.types = types);
  }

  saveAndValidate() {
    this.networkService.postNetwork(this.network).subscribe(
      network => {
        this.network = network;

        if (this.files) {
          this.networkService.postNetworkParameter(this.network, this.files[0]).subscribe();
        } else if (this.trainingData.length) {
          this.networkService.postNetworkParameterString(this.network, this.trainingData).subscribe();
        }
        this.openSnackBar('Network ' + this.network.name + ' saved', '');
        this.router.navigateByUrl('/networks/' + this.network.id);
      }
    );
  }


  onChange(event) {
    this.files = event.srcElement.files;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
