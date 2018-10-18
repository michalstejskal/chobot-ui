import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network-detail-edit',
  templateUrl: './network-detail-edit.component.html',
  styleUrls: ['./network-detail-edit.component.css']
})
export class NetworkDetailEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    var files = event.srcElement.files;
    console.log(files);
  }

  selectFile(files){
    console.log(files);
  }

}
