import { Injectable } from '@angular/core';
import gql from "graphql-tag";
import {GraphqlService} from "../../../shared/services/graphql/graphql.service";
import {BaseService} from "../base.service";
import {tap} from "rxjs/operators";

enum ENTITY {
  USER = 'user'
}

enum MUTATION{
  SIGN_IN = 'signIn',
  SIGN_OUT = 'signOut'
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService{

  constructor(private graphql: GraphqlService) {
    super()
  }

  public signIn(payload){
    this.mutation = gql`
          mutation signIn($email: String!, $password: String!) {
            signIn(input: { email: $email, password: $password }) {
              user {
                id
                name
                rol
                authenticationToken
              }
              success
              errors
            }
          }`;
    return this.graphql.mutate(this.mutation,payload).pipe(
      this.extractMutationResponseData(MUTATION.SIGN_IN, ENTITY.USER),
      tap(response => localStorage.setItem('AUTH_TOKEN',response['authenticationToken'])));
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
      tap(()=>{
        localStorage.removeItem('AUTH_TOKEN');
        this.graphql.clearStore();
      }));
  }

}
