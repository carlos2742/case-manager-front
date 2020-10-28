import { Injectable } from '@angular/core';
import gql from "graphql-tag";
import {GraphqlService} from "../../../shared/services/graphql/graphql.service";
import {BaseService} from "../base.service";
import {tap} from "rxjs/operators";
import {IUser} from "../../models/admin.models";
import {Observable} from "rxjs";
import {DocumentNode} from "graphql";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService{

  private _currentUser: IUser;

  private readonly _entityLoggedName: string;
  private readonly _mutationSignInName: string;
  private readonly _mutationSignOutName: string;

  private _currentUserQuery: DocumentNode;
  private _signInMutation: DocumentNode;
  private _signOutMutation: DocumentNode;

  constructor(private graphql: GraphqlService) {
    super();
    this._currentUser = null;

    this._entityName = 'user';
    this._entityLoggedName = 'loggedUser';
    this._mutationSignInName = 'signIn';
    this._mutationSignOutName = 'signOut';
  }

  protected _initializeQM(){
    super._initializeQM();
    this._currentUserQuery = gql`
          {
            loggedUser{
              id
              name
              email
              rol
              authenticationToken
            }
          }`;
    this._signInMutation = gql`
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
    this._signOutMutation = gql`
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
  }

  get loggedUser(){
    if(this._currentUser){
      return new Observable(observer =>{
        observer.next(this._currentUser);
        observer.complete();
      })
    }

    return this.graphql.query(this._currentUserQuery).pipe(
      this._extractQueryResponseData(this._entityLoggedName),
      tap(response => this._setData(response)));
  }

  public signIn(payload){
    return this.graphql.mutate(this._signInMutation,payload).pipe(
      this._extractMutationResponseData(this._mutationSignInName, this._entityName),
      tap(response => this._setData(response)));
  }

  public signOut(){
    return this.graphql.mutate(this._signOutMutation).pipe(
      this._extractMutationResponseData(this._mutationSignOutName, this._entityName),
      tap(()=> this._clearData()));
  }

  private _setData(user: IUser){
    this._currentUser = user;
    localStorage.setItem('AUTH_TOKEN',this._currentUser.authenticationToken);
  }

  private _clearData(){
    localStorage.removeItem('AUTH_TOKEN');
    this._currentUser = null;
    this.graphql.clearStore();
  }
}
