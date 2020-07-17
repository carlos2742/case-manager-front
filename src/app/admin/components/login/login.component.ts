import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as AdminStore from "../../store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private store: Store<AdminStore.AdminState>, private formBuilder: FormBuilder, private router: Router) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.store.select(AdminStore.isSignInSuccess).subscribe(success => {
      if(success){
        this.router.navigateByUrl('admin/clients');
      }
    });
  }

  private initializeForm(){
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public signIn(){
    const payload = this.form.value;
    this.store.dispatch(new AdminStore.SignIn(payload));
  }
}
