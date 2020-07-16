import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  open: boolean;
  constructor(private translate: TranslateService) {
    this.open = true;
  }

  ngOnInit(): void {
    this.initializeLanguage();
  }

  public initializeLanguage() {
    const lang = this.translate.getBrowserLang();
    if(['es','en'].indexOf(lang)!== -1){
      this.translate.use(lang);
    }
  }

  toggle(){
    this.open = !this.open;
  }

}
