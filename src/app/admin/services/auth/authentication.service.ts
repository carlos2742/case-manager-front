import { Injectable } from '@angular/core';
import gql from "graphql-tag";
import {GraphqlService} from "../../../shared/services/graphql/graphql.service";
import {BaseService} from "../base.service";
import {tap} from "rxjs/operators";
import {IUser} from "../../models/admin.models";
import {Observable} from "rxjs";

enum ENTITY {
  USER = 'user',
  LOGGED_USER = 'loggedUser'
}

enum MUTATION{
  SIGN_IN = 'signIn',
  SIGN_OUT = 'signOut'
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService{

  private currentUser: IUser;

  constructor(private graphql: GraphqlService) {
    super();
    this.currentUser = null;
  }

  get loggedUser(){
    if(this.currentUser){
      return new Observable(observer =>{
        observer.next(this.currentUser);
        observer.complete();
      })
    }

    this.query = gql`
          {
            loggedUser{
              id
              name
              email
              rol
              authenticationToken
            }
          }`;
    return this.graphql.query(this.query).pipe(
      this.extractQueryResponseData(ENTITY.LOGGED_USER),
      tap(response => this.setData(response)));
  }

  public signIn(payload){
    this.mutation = gql`
          mutation signIn($email: String!, $password: String!) {
            signIn(input: { email: $email, password: $password }) {
              user {
                id
                name
                email
                rol
                authenticationToken
              }
              success
              errors
            }
          }`;
    return this.graphql.mutate(this.mutation,payload).pipe(
      this.extractMutationResponseData(MUTATION.SIGN_IN, ENTITY.USER),
      tap(response => this.setData(response)));
  }

  public signOut(){
    this.mutation = gql`
          mutation signOut {
            signOut(input: {}) {
              user {
                id
                authenticationToken
              }
              success
              errors
            }
          }`;
    return this.graphql.mutate(this.mutation).pipe(
      this.extractMutationResponseData(MUTATION.SIGN_OUT, ENTITY.USER),
      tap(()=> this.clearData()));
  }

  private setData(user: IUser){
    this.currentUser = user;
    localStorage.setItem('AUTH_TOKEN',this.currentUser.authenticationToken);
  }

  private clearData(){
    localStorage.removeItem('AUTH_TOKEN');
    this.currentUser = null;
    this.graphql.clearStore();
  }
}
