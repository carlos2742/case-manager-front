import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as AdminStore from "../../store";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {NotificationComponent} from "../../../shared/components/notification/notification.component";
import {NotificationService} from "../../../shared/services/notification/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  public form: FormGroup;
  public hidePassword:boolean;

  public processing$: Observable<boolean>;

  private _subscriptions: Array<Subscription>;

  constructor(private _store: Store<AdminStore.AdminState>, private _formBuilder: FormBuilder, private _router: Router) {
    this.hidePassword = true;
    this._subscriptions = new Array<Subscription>();

    this.processing$ = _store.select(AdminStore.isSignInProcessing);

    this._initializeForm();
  }

  ngOnInit(): void {
    let successSubs = this._store.select(AdminStore.isSignInSuccess).subscribe(success => {
      if(success) this._router.navigateByUrl('admin/clients');
    });
    this._subscriptions.push(successSubs);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscrition => {
      subscrition.unsubscribe();
    })
  }

  private _initializeForm(){
    this.form = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public signIn(){
    const payload = this.form.value;
    this._store.dispatch(new AdminStore.SignIn(payload));
  }
}
