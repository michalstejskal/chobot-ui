import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Network} from '../model/Network';
import {MatSnackBar} from '@angular/material';
import {NetworkType} from '../model/network-type';
import {NetworkService} from '../network.service';
import {t} from '@angular/core/src/render3';
import {Router} from '@angular/router';
import {NetworkParameter} from '../model/network-parameter';

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
  networkParameter = '';
  invalidName = false;
  displayedColumns: string[] = ['name', 'description', 'classes'];


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
    this.invalidName = false;
    if (!this.network.name || this.network.name.includes('_')) {
      this.invalidName = true;
      this.openSnackBar('Invalid name for network ' + this.network.name, '');
    }else if (!this.network.type) {
      this.openSnackBar('Please selct type of network', '');
    } else if (!this.files && this.network.type.name !== 'image_classification') {
      this.openSnackBar('No train files provided', '');
    } else {

      this.networkService.postNetwork(this.network).subscribe(
        network => {
          this.network = network;

          if (this.files) {
            this.networkService.postNetworkParameterData(this.network, this.files[0]).subscribe();
          }

          if (this.network.type.name === 'log_classification' && this.networkParameter) {
            const networkParam = new NetworkParameter();
            networkParam.name = 'DATA_PATTERN';
            networkParam.abbreviation = 'DATA_PATTERN';
            networkParam.value = this.networkParameter;

            this.networkService.postNetworkParameter(this.network, networkParam).subscribe();
          }

          this.openSnackBar('Network ' + this.network.name + ' saved', '');
          this.router.navigateByUrl('/networks/' + this.network.id);
        },
        error => {
          this.openSnackBar('Error occurred while saving network ' + this.network.name, '');
        },
      );
    }
  }


  onChange(event) {
    this.files = event.srcElement.files;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }


}
