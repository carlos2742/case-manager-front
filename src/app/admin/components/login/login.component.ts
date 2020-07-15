import { Component, OnInit } from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/auth/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  private initializeForm(){
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public signIn(){
    const payload = this.form.value;
    this.auth.signIn(payload).subscribe(response =>{
      localStorage.setItem('AUTH_TOKEN',response['authenticationToken']);
    });
  }

  public signOut(){
    this.auth.signOut().subscribe(response => {
      localStorage.removeItem('AUTH_TOKEN');
    })
  }
}
