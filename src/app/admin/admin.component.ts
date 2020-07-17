import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import * as AdminStore from "./store";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  open$: Observable<boolean>;
  constructor(private store: Store<AdminStore.AdminState>, private translate: TranslateService, private router: Router) {}

  ngOnInit(): void {
    this.initializeLanguage();
    this.open$ = this.store.select(AdminStore.isAuthenticate);
    this.store.select(AdminStore.isSignOutSuccess).subscribe(success => {
      if(success){
        this.router.navigateByUrl('admin/login');
      }
    });
  }

  public initializeLanguage() {
    const lang = this.translate.getBrowserLang();
    if(['es','en'].indexOf(lang)!== -1){
      this.translate.use(lang);
    }
  }

  public signOut(){
    this.store.dispatch(new AdminStore.SignOut());
  }
}
