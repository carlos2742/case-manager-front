import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  open: boolean;
  constructor() {
    this.open = false;
  }

  ngOnInit(): void {
  }

  toggle(){
    this.open = !this.open;
  }

}
