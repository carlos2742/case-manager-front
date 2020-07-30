import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import * as AdminStore from "./store";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {IUser, USER_ROLES} from "./models/admin.models";
import {filter} from "rxjs/operators";

interface IOption{
  header: string;
  elements: Array<IElement>;
  allowed: Array<USER_ROLES>;
}
interface IElement{
  icon: string;
  name: string;
  url: string;
  disabled: boolean;
  selected: boolean;
  allowed: Array<USER_ROLES>;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  public open: boolean;
  public options: Array<IOption>;

  private _loggedUser: IUser;
  private _subscriptions: Array<Subscription>;

  constructor(private _store: Store<AdminStore.AdminState>, private _translate: TranslateService, public _router: Router) {
    this._subscriptions = new Array<Subscription>();

    const navigationEnd = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) =>{
      this._createMenu();
    });

    this._subscriptions.push(navigationEnd);
  }

  ngOnInit(): void {
    this.initializeLanguage();
    const signOut = this._store.select(AdminStore.isSignOutSuccess).subscribe(success => {
      if(success){
        this._router.navigateByUrl('admin/login');
      }
    });

    const loggedUser = this._store.select(AdminStore.loggedUser).subscribe(loggedUser => {
      this.open = loggedUser ? true : false;
    });

    this._subscriptions.push(loggedUser);

    this._subscriptions.push(signOut);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public initializeLanguage() {
    const lang = this._translate.getBrowserLang();
    if(['es','en'].indexOf(lang)!== -1){
      this._translate.use(lang);
    }
  }

  public signOut(){
    this._store.dispatch(new AdminStore.SignOut());
  }

  private _isSelected(url){
    return this._router.url === `/admin/${url}`;
  }

  private _createMenu(){
    this.options = [
      {
        header: 'Administrator',
        allowed:[
          USER_ROLES.ADMIN,
          USER_ROLES.DEVELOPER
        ],
        elements: [
          {
            icon: 'attach_money',
            name: 'BILLING.LABEL.SINGULAR',
            url: 'billing',
            disabled: true,
            selected: this._isSelected('billing'),
            allowed:[
              USER_ROLES.ADMIN,
              USER_ROLES.DEVELOPER
            ]
          },
          {
            icon: 'insert_drive_file',
            name: 'DOCUMENT.LABEL.PLURAL',
            url: 'documents',
            disabled: true,
            selected: this._isSelected('documents'),
            allowed:[
              USER_ROLES.ADMIN,
              USER_ROLES.DEVELOPER
            ]
          },
          {
            icon: 'supervisor_account',
            name: 'USER.LABEL.PLURAL',
            url: 'users',
            disabled: false,
            selected: this._isSelected('users'),
            allowed:[
              USER_ROLES.ADMIN,
              USER_ROLES.DEVELOPER
            ]
          }
        ]
      },
      {
        header: 'Collaborator',
        allowed:[
          USER_ROLES.COLLABORATOR,
          USER_ROLES.ADMIN,
          USER_ROLES.DEVELOPER
        ],
        elements: [
          {
            icon: 'group',
            name: 'CLIENT.LABEL.PLURAL',
            url: 'clients',
            disabled: false,
            selected: this._isSelected('clients'),
            allowed:[
              USER_ROLES.COLLABORATOR,
              USER_ROLES.ADMIN,
              USER_ROLES.DEVELOPER
            ]
          }
        ]
      },
    ];
  }
}
